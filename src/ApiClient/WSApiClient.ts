import { AccountClient } from './AccountClient';
import { CallsClient } from './CallsClient';
import { ChatsClient } from './ChatsClient';
import { ContactsClient } from './ContactsClient';
import { GroupsClient } from './GroupsClient';
import { InstanceClient } from './InstanceClient';
import { MediaClient } from './MediaClient';
import { MessagesClient } from './MessagesClient';
import { SessionClient } from './SessionClient';
import { UsersClient } from './UsersClient';
import { HttpClient } from './HttpClient';
import { SSEClient } from '../SSE/SSEClient';
import { EventFactory, WSApiEvent } from '../Events/EventFactory';
import { EventTypes } from '../Models/Constants/EventTypes';
import { SSEConnectionState } from '../SSE/SSEConnectionState';
import { 
  IWSApiClient, 
  WSApiClientOptions, 
  EventHandler, 
  EventHandlerRegistration 
} from './IWSApiClient';

/**
 * Internal event handler registration implementation
 */
class EventHandlerRegistrationImpl implements EventHandlerRegistration {
  constructor(
    private client: WSApiClient,
    private eventType: string | null,
    private handler: EventHandler,
    private id: string
  ) {}

  remove(): void {
    this.client['removeEventHandler'](this.id);
  }
}

/**
 * Main WhatsApp Business API client
 * Provides unified access to all API clients, SSE functionality, and event handling
 */
export class WSApiClient implements IWSApiClient {
  // API Clients
  public readonly instance: InstanceClient;
  public readonly account: AccountClient;
  public readonly chats: ChatsClient;
  public readonly contacts: ContactsClient;
  public readonly groups: GroupsClient;
  public readonly media: MediaClient;
  public readonly messages: MessagesClient;
  public readonly session: SessionClient;
  public readonly users: UsersClient;
  public readonly calls: CallsClient;
  
  // SSE Client
  public readonly sse: SSEClient;
  
  // Private members
  private readonly httpClient: HttpClient;
  private readonly options: WSApiClientOptions;
  private readonly eventHandlers = new Map<string, { eventType: string | null; handler: EventHandler }>();
  private handlerIdCounter = 0;
  private disposed = false;

  constructor(options: WSApiClientOptions) {
    this.options = { ...options };
    
    // Validate required options
    if (!options.baseUrl) {
      throw new Error('baseUrl is required');
    }
    if (!options.apiKey) {
      throw new Error('apiKey is required');
    }
    if (!options.instanceId) {
      throw new Error('instanceId is required');
    }

    // Create HTTP client
    this.httpClient = new HttpClient({
      baseUrl: options.baseUrl,
      timeout: options.httpOptions?.timeout || 30000,
      headers: {
        'Authorization': `Bearer ${options.apiKey}`,
        'X-Instance-Id': options.instanceId,
        ...options.httpOptions?.defaultHeaders
      }
    });

    // Initialize API clients
    this.instance = new InstanceClient(this.httpClient);
    this.account = new AccountClient(this.httpClient);
    this.chats = new ChatsClient(this.httpClient);
    this.contacts = new ContactsClient(this.httpClient);
    this.groups = new GroupsClient(this.httpClient);
    this.media = new MediaClient(this.httpClient);
    this.messages = new MessagesClient(this.httpClient);
    this.session = new SessionClient(this.httpClient);
    this.users = new UsersClient(this.httpClient);
    this.calls = new CallsClient(this.httpClient);

    // Initialize SSE client
    const sseOptions = {
      baseUrl: options.baseUrl,
      headers: {
        'Authorization': `Bearer ${options.apiKey}`,
        'X-Instance-Id': options.instanceId
      },
      ...options.sseOptions?.sseConfig
    };
    
    this.sse = new SSEClient(sseOptions);
    
    // Set up automatic event parsing if enabled
    if (options.sseOptions?.autoParseEvents !== false) {
      this.setupEventParsing();
    }
    
    // Auto-connect if enabled
    if (options.sseOptions?.autoConnect) {
      this.connect().catch(error => {
        console.warn('Auto-connect failed:', error);
      });
    }
  }

  // === Event Handling ===
  
  onEvent(handlerOrEventType: EventHandler | string, handler?: EventHandler): EventHandlerRegistration {
    this.throwIfDisposed();
    
    if (typeof handlerOrEventType === 'function') {
      // onEvent(handler) - listen to all events
      return this.registerEventHandler(null, handlerOrEventType);
    } else if (typeof handlerOrEventType === 'string' && handler) {
      // onEvent(eventType, handler) - listen to specific event type
      return this.registerEventHandler(handlerOrEventType, handler);
    } else {
      throw new Error('Invalid arguments. Use onEvent(handler) or onEvent(eventType, handler)');
    }
  }

  onMessage(handler: EventHandler<Extract<WSApiEvent, { eventType: 'message' }>>): EventHandlerRegistration {
    return this.registerEventHandler(EventTypes.MESSAGE, handler as EventHandler);
  }

  onUserPresence(handler: EventHandler<Extract<WSApiEvent, { eventType: 'user_presence' }>>): EventHandlerRegistration {
    return this.registerEventHandler(EventTypes.USER_PRESENCE, handler as EventHandler);
  }

  onCall(handler: EventHandler<Extract<WSApiEvent, { eventType: 'call_offer' | 'call_accept' | 'call_terminate' }>>): EventHandlerRegistration {
    const registration1 = this.registerEventHandler(EventTypes.CALL_OFFER, handler as EventHandler);
    const registration2 = this.registerEventHandler(EventTypes.CALL_ACCEPT, handler as EventHandler);
    const registration3 = this.registerEventHandler(EventTypes.CALL_TERMINATE, handler as EventHandler);
    
    // Return a combined registration that removes all three handlers
    return {
      remove: () => {
        registration1.remove();
        registration2.remove();
        registration3.remove();
      }
    };
  }

  // === Lifecycle Management ===
  
  async connect(): Promise<void> {
    this.throwIfDisposed();
    
    if (this.sse.connectionState === SSEConnectionState.Connected || 
        this.sse.connectionState === SSEConnectionState.Connecting) {
      return;
    }
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('Connection timeout'));
      }, 30000); // 30 second timeout
      
      const handleStateChange = (args: any) => {
        if (args.state === SSEConnectionState.Connected) {
          cleanup();
          resolve();
        } else if (args.state === SSEConnectionState.Error) {
          cleanup();
          reject(new Error('Failed to connect to SSE'));
        }
      };
      
      const cleanup = () => {
        clearTimeout(timeout);
        this.sse.offConnectionStateChanged(handleStateChange);
      };
      
      this.sse.onConnectionStateChanged(handleStateChange);
      this.sse.startAsync();
    });
  }

  async disconnect(): Promise<void> {
    if (this.disposed) return;
    
    this.sse.stopAsync();
    
    // Wait for disconnection
    return new Promise((resolve) => {
      if (this.sse.connectionState === SSEConnectionState.Disconnected) {
        resolve();
        return;
      }
      
      const handleStateChange = (args: any) => {
        if (args.state === SSEConnectionState.Disconnected) {
          this.sse.offConnectionStateChanged(handleStateChange);
          resolve();
        }
      };
      
      this.sse.onConnectionStateChanged(handleStateChange);
    });
  }

  isConnected(): boolean {
    return this.sse.connectionState === SSEConnectionState.Connected;
  }

  async dispose(): Promise<void> {
    if (this.disposed) return;
    
    this.disposed = true;
    
    // Clear all event handlers
    this.eventHandlers.clear();
    
    // Disconnect and dispose SSE client
    await this.disconnect();
    this.sse.dispose();
    
    // Note: HttpClient doesn't need explicit disposal in our implementation
  }

  // === Private Methods ===
  
  private setupEventParsing(): void {
    this.sse.onRawEventReceived((args) => {
      try {
        const event = EventFactory.parseEvent(args.rawJson);
        this.emitEvent(event);
      } catch (error) {
        console.warn('Failed to parse event:', error, 'Raw data:', args.rawJson);
      }
    });
  }
  
  private registerEventHandler(eventType: string | null, handler: EventHandler): EventHandlerRegistration {
    const id = `handler_${++this.handlerIdCounter}`;
    this.eventHandlers.set(id, { eventType, handler });
    return new EventHandlerRegistrationImpl(this, eventType, handler, id);
  }
  
  private removeEventHandler(id: string): void {
    this.eventHandlers.delete(id);
  }
  
  private emitEvent(event: WSApiEvent): void {
    for (const { eventType, handler } of this.eventHandlers.values()) {
      try {
        // Call handler if it's for all events (eventType is null) or matches the specific event type
        if (eventType === null || eventType === event.eventType) {
          const result = handler(event);
          // Handle async handlers
          if (result && typeof result.catch === 'function') {
            result.catch((error: any) => {
              console.error('Error in event handler:', error);
            });
          }
        }
      } catch (error) {
        console.error('Error in event handler:', error);
      }
    }
  }
  
  private throwIfDisposed(): void {
    if (this.disposed) {
      throw new Error('WSApiClient has been disposed');
    }
  }
}
