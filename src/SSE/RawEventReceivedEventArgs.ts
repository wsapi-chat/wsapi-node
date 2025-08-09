/**
 * Event arguments for when a raw event is received from the SSE stream.
 */
export interface RawEventReceivedEventArgs {
  /** The raw JSON string received from the SSE stream */
  rawJson: string;
  
  /** Timestamp when the event was received */
  receivedAt: Date;
}
