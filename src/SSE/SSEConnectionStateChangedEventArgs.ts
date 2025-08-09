/**
 * Event arguments for when the SSE connection state changes.
 */
export interface SSEConnectionStateChangedEventArgs {
  /** The new connection state */
  state: import('./SSEConnectionState.js').SSEConnectionState;
  
  /** The error that caused the state change, if any */
  error?: Error | undefined;
  
  /** Timestamp when the state change occurred */
  timestamp: Date;
}
