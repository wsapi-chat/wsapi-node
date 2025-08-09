import { IAccountClient } from '../ApiClient/IAccountClient';
import { ICallsClient } from '../ApiClient/ICallsClient';
import { IChatsClient } from '../ApiClient/IChatsClient';
import { IContactsClient } from '../ApiClient/IContactsClient';
import { IGroupsClient } from '../ApiClient/IGroupsClient';
import { IInstanceClient } from '../ApiClient/IInstanceClient';
import { IMediaClient } from '../ApiClient/IMediaClient';
import { IMessagesClient } from '../ApiClient/IMessagesClient';
import { ISessionClient } from '../ApiClient/ISessionClient';
import { IUsersClient } from '../ApiClient/IUsersClient';
import { ISSEClient, SSEClientOptions } from '../SSE/ISSEClient';
import { WSApiEvent } from '../Events/EventFactory';

/**
 * Configuration options for the WSApiClient
 */
export interface WSApiClientOptions {
  /** Base URL for the WhatsApp Business API */
  baseUrl: string;
  
  /** API key for authentication */
  apiKey: string;
  
  /** WhatsApp instance ID */
  instanceId: string;
  
  /** Optional HTTP client options */
  httpOptions?: {
    /** Request timeout in milliseconds (default: 30000) */
    timeout?: number;
    
    /** Custom headers to include with all requests */
    defaultHeaders?: Record<string, string>;
    
    /** Whether to include credentials (default: false) */
    withCredentials?: boolean;
  };
  
  /** Optional SSE client options */
  sseOptions?: {
    /** Enable automatic SSE connection (default: false) */
    autoConnect?: boolean;
    
    /** SSE-specific configuration */
    sseConfig?: Partial<SSEClientOptions>;
    
    /** Enable automatic event parsing (default: true) */
    autoParseEvents?: boolean;
  };
}

/**
 * Event handler function type for parsed WhatsApp events
 */
export type EventHandler<T extends WSApiEvent = WSApiEvent> = (event: T) => void | Promise<void>;

/**
 * Event handler registration interface
 */
export interface EventHandlerRegistration {
  /** Remove this event handler */
  remove(): void;
}

/**
 * Main WhatsApp Business API client interface
 * Provides unified access to all API clients, SSE functionality, and event handling
 */
export interface IWSApiClient {
  // === API Clients ===
  /** Instance management operations */
  readonly instance: IInstanceClient;
  
  /** Account information operations */
  readonly account: IAccountClient;
  
  /** Chat management operations */
  readonly chats: IChatsClient;
  
  /** Contact management operations */
  readonly contacts: IContactsClient;
  
  /** Group management operations */
  readonly groups: IGroupsClient;
  
  /** Media upload/download operations */
  readonly media: IMediaClient;
  
  /** Message sending/management operations */
  readonly messages: IMessagesClient;
  
  /** Session management operations */
  readonly session: ISessionClient;
  
  /** User information operations */
  readonly users: IUsersClient;
  
  /** Call management operations */
  readonly calls: ICallsClient;
  
  // === SSE Client ===
  /** Real-time event streaming client */
  readonly sse: ISSEClient;
  
  // === Event Handling ===
  /**
   * Register an event handler for all events
   * @param handler Function to handle events
   * @returns Registration object to remove the handler
   */
  onEvent(handler: EventHandler): EventHandlerRegistration;
  
  /**
   * Register an event handler for specific event type
   * @param eventType Event type to listen for
   * @param handler Function to handle events of this type
   * @returns Registration object to remove the handler
   */
  onEvent<T extends WSApiEvent>(
    eventType: T['eventType'], 
    handler: EventHandler<T>
  ): EventHandlerRegistration;
  
  /**
   * Register an event handler for message events
   * @param handler Function to handle message events
   * @returns Registration object to remove the handler
   */
  onMessage(handler: EventHandler<Extract<WSApiEvent, { eventType: 'message' }>>): EventHandlerRegistration;
  
  /**
   * Register an event handler for user presence events  
   * @param handler Function to handle user presence events
   * @returns Registration object to remove the handler
   */
  onUserPresence(handler: EventHandler<Extract<WSApiEvent, { eventType: 'user_presence' }>>): EventHandlerRegistration;
  
  /**
   * Register an event handler for call events
   * @param handler Function to handle call events
   * @returns Registration object to remove the handler
   */
  onCall(handler: EventHandler<Extract<WSApiEvent, { eventType: 'call_offer' | 'call_accept' | 'call_terminate' }>>): EventHandlerRegistration;
  
  // === Lifecycle Management ===
  /**
   * Connect to real-time events (starts SSE connection)
   * @returns Promise that resolves when connection is established
   */
  connect(): Promise<void>;
  
  /**
   * Disconnect from real-time events (stops SSE connection)
   * @returns Promise that resolves when disconnected
   */
  disconnect(): Promise<void>;
  
  /**
   * Check if currently connected to real-time events
   * @returns True if connected to SSE
   */
  isConnected(): boolean;
  
  /**
   * Dispose of all resources and connections
   * @returns Promise that resolves when disposed
   */
  dispose(): Promise<void>;
}
