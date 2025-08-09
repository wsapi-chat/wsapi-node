import type {
  ISSEClient,
  SSEClientOptions,
  SSEConnectionStateChangedHandler,
  RawEventReceivedHandler
} from './ISSEClient.js';
import { SSEConnectionState } from './SSEConnectionState.js';
import type { SSEConnectionStateChangedEventArgs } from './SSEConnectionStateChangedEventArgs.js';
import type { RawEventReceivedEventArgs } from './RawEventReceivedEventArgs.js';

/**
 * Server-Sent Events client for real-time WhatsApp event streaming.
 * Provides automatic reconnection and robust error handling.
 */
export class SSEClient implements ISSEClient {
  private readonly options: Required<SSEClientOptions>;
  // Use a flexible type to support both browser EventSource and the 'eventsource' Node polyfill
  private eventSource: any | null = null;
  private currentState: SSEConnectionState = SSEConnectionState.Disconnected;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isDisposed = false;
  private isManualStop = false;

  // Event handlers
  private connectionStateHandlers: Set<SSEConnectionStateChangedHandler> = new Set();
  private rawEventHandlers: Set<RawEventReceivedHandler> = new Set();

  constructor(options: SSEClientOptions) {
    this.options = {
      baseUrl: options.baseUrl,
      headers: options.headers || {},
      reconnectDelay: options.reconnectDelay || 5000,
      autoReconnect: options.autoReconnect ?? true,
      maxReconnectAttempts: options.maxReconnectAttempts || 0
    };
  }

  /** Whether the client is currently connected */
  get isConnected(): boolean {
    return this.currentState === SSEConnectionState.Connected;
  }

  /** Current connection state */
  get connectionState(): SSEConnectionState {
    return this.currentState;
  }

  /** Delay between reconnection attempts in milliseconds */
  get reconnectDelay(): number {
    return this.options.reconnectDelay;
  }

  set reconnectDelay(value: number) {
    this.options.reconnectDelay = value;
  }

  /** Whether to automatically reconnect on connection loss */
  get autoReconnect(): boolean {
    return this.options.autoReconnect;
  }

  set autoReconnect(value: boolean) {
    this.options.autoReconnect = value;
  }

  /** Maximum number of reconnection attempts (0 = unlimited) */
  get maxReconnectAttempts(): number {
    return this.options.maxReconnectAttempts;
  }

  set maxReconnectAttempts(value: number) {
    this.options.maxReconnectAttempts = value;
  }

  /**
   * Starts the SSE connection.
   */
  async startAsync(): Promise<void> {
    if (this.isDisposed) {
      throw new Error('SSE client has been disposed');
    }

    // 1 is the OPEN readyState for both browser EventSource and the 'eventsource' polyfill
    if (this.eventSource?.readyState === 1) {
      console.warn('SSE client is already running');
      return;
    }

    this.isManualStop = false;
    await this.connectAsync();
  }

  /**
   * Stops the SSE connection.
   */
  async stopAsync(): Promise<void> {
    this.isManualStop = true;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.setConnectionState(SSEConnectionState.Disconnected);
  }

  /**
   * Adds an event listener for connection state changes.
   */
  onConnectionStateChanged(handler: SSEConnectionStateChangedHandler): void {
    this.connectionStateHandlers.add(handler);
  }

  /**
   * Removes an event listener for connection state changes.
   */
  offConnectionStateChanged(handler: SSEConnectionStateChangedHandler): void {
    this.connectionStateHandlers.delete(handler);
  }

  /**
   * Adds an event listener for raw events.
   */
  onRawEventReceived(handler: RawEventReceivedHandler): void {
    this.rawEventHandlers.add(handler);
  }

  /**
   * Removes an event listener for raw events.
   */
  offRawEventReceived(handler: RawEventReceivedHandler): void {
    this.rawEventHandlers.delete(handler);
  }

  /**
   * Disposes the SSE client and cleans up resources.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }

    this.isDisposed = true;
    this.stopAsync();
    this.connectionStateHandlers.clear();
    this.rawEventHandlers.clear();
  }

  private async connectAsync(): Promise<void> {
    if (this.isDisposed || this.isManualStop) {
      return;
    }

    this.setConnectionState(SSEConnectionState.Connecting);

    try {
      const url = new URL('/events/stream', this.options.baseUrl);

      // Create EventSource with headers (if browser supports it)
      // Note: Standard EventSource doesn't support custom headers, 
      // but we can add them to the URL as query parameters for auth
      if (this.options.headers['Authorization']) {
        url.searchParams.set('authorization', this.options.headers['Authorization']);
      }

      const ES = await this.getEventSourceCtor();
      this.eventSource = new ES(url.toString());

      this.eventSource.onopen = () => {
        this.reconnectAttempts = 0;
        this.setConnectionState(SSEConnectionState.Connected);
        console.log('Connected to SSE stream');
      };

      this.eventSource.onmessage = (event: any) => {
        this.handleRawEvent(event.data);
      };

      this.eventSource.onerror = (event: any) => {
        console.error('SSE connection error:', event);
        this.handleConnectionError(new Error('SSE connection error'));
      };

    } catch (error) {
      this.handleConnectionError(error as Error);
    }
  }

  /**
   * Resolves the appropriate EventSource constructor depending on the runtime (browser vs Node).
   */
  private async getEventSourceCtor(): Promise<any> {
    if (typeof (globalThis as any).EventSource !== 'undefined') {
      return (globalThis as any).EventSource;
    }
    // Lazy-load the polyfill only in Node.js environments
    const mod: any = await import('eventsource');
    return mod?.default ?? mod?.EventSource ?? mod;
  }

  private handleRawEvent(data: string): void {
    if (!data || data.trim() === '') {
      return;
    }

    try {
      const args: RawEventReceivedEventArgs = {
        rawJson: data,
        receivedAt: new Date()
      };

      for (const handler of this.rawEventHandlers) {
        try {
          handler(args);
        } catch (error) {
          console.error('Error in RawEventReceived handler:', error);
        }
      }
    } catch (error) {
      console.error('Error processing raw event:', error);
    }
  }

  private handleConnectionError(error: Error): void {
    this.setConnectionState(SSEConnectionState.Error, error);

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (!this.autoReconnect || this.isManualStop || this.isDisposed) {
      this.setConnectionState(SSEConnectionState.Disconnected);
      return;
    }

    // Check reconnection limits
    if (this.maxReconnectAttempts > 0 && this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`Max reconnection attempts (${this.maxReconnectAttempts}) reached`);
      this.setConnectionState(SSEConnectionState.Disconnected);
      return;
    }

    this.reconnectAttempts++;
    this.setConnectionState(SSEConnectionState.Reconnecting);

    console.log(`Reconnecting in ${this.reconnectDelay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connectAsync();
    }, this.reconnectDelay);
  }

  private setConnectionState(state: SSEConnectionState, error?: Error): void {
    if (this.currentState === state) {
      return;
    }

    this.currentState = state;

    const args: SSEConnectionStateChangedEventArgs = {
      state,
      error,
      timestamp: new Date()
    };

    for (const handler of this.connectionStateHandlers) {
      try {
        handler(args);
      } catch (handlerError) {
        console.error('Error in ConnectionStateChanged handler:', handlerError);
      }
    }
  }
}
