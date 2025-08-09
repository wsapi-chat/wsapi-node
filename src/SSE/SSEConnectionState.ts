/**
 * Represents the current connection state of the SSE client.
 */
export enum SSEConnectionState {
  /** The client is attempting to connect */
  Connecting = 'connecting',
  
  /** The client is connected and receiving events */
  Connected = 'connected',
  
  /** The client is disconnected */
  Disconnected = 'disconnected',
  
  /** An error occurred with the connection */
  Error = 'error',
  
  /** The client is attempting to reconnect after an error */
  Reconnecting = 'reconnecting'
}
