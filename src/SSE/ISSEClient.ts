import type { SSEConnectionState } from './SSEConnectionState.js';
import type { SSEConnectionStateChangedEventArgs } from './SSEConnectionStateChangedEventArgs.js';
import type { RawEventReceivedEventArgs } from './RawEventReceivedEventArgs.js';

/**
 * Event handler type for SSE connection state changes.
 */
export type SSEConnectionStateChangedHandler = (args: SSEConnectionStateChangedEventArgs) => void;

/**
 * Event handler type for raw event received from SSE stream.
 */
export type RawEventReceivedHandler = (args: RawEventReceivedEventArgs) => void;

/**
 * Configuration options for the SSE client.
 */
export interface SSEClientOptions {
  /** Base URL for the SSE endpoint */
  baseUrl: string;
  
  /** Headers to include in the SSE request */
  headers?: Record<string, string>;
  
  /** Delay between reconnection attempts in milliseconds */
  reconnectDelay?: number;
  
  /** Whether to automatically reconnect on connection loss */
  autoReconnect?: boolean;
  
  /** Maximum number of reconnection attempts (0 = unlimited) */
  maxReconnectAttempts?: number;
}

/**
 * Interface for the Server-Sent Events client.
 */
export interface ISSEClient {
  /** Whether the client is currently connected */
  readonly isConnected: boolean;
  
  /** Current connection state */
  readonly connectionState: SSEConnectionState;
  
  /** Delay between reconnection attempts in milliseconds */
  reconnectDelay: number;
  
  /** Whether to automatically reconnect on connection loss */
  autoReconnect: boolean;
  
  /** Maximum number of reconnection attempts (0 = unlimited) */
  maxReconnectAttempts: number;
  
  /**
   * Starts the SSE connection.
   * @returns Promise that resolves when the connection attempt is initiated
   */
  startAsync(): Promise<void>;
  
  /**
   * Stops the SSE connection.
   * @returns Promise that resolves when the connection is stopped
   */
  stopAsync(): Promise<void>;
  
  /**
   * Adds an event listener for connection state changes.
   * @param handler The event handler
   */
  onConnectionStateChanged(handler: SSEConnectionStateChangedHandler): void;
  
  /**
   * Removes an event listener for connection state changes.
   * @param handler The event handler to remove
   */
  offConnectionStateChanged(handler: SSEConnectionStateChangedHandler): void;
  
  /**
   * Adds an event listener for raw events.
   * @param handler The event handler
   */
  onRawEventReceived(handler: RawEventReceivedHandler): void;
  
  /**
   * Removes an event listener for raw events.
   * @param handler The event handler to remove
   */
  offRawEventReceived(handler: RawEventReceivedHandler): void;
  
  /**
   * Disposes the SSE client and cleans up resources.
   */
  dispose(): void;
}
