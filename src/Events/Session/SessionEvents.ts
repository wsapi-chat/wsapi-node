import { BaseEvent } from '../BaseEvent';

/**
 * Event fired when a session successfully logs in
 */
export interface SessionLoggedInEvent extends BaseEvent {
  /** The device ID of the logged in session */
  deviceId: string;
}

/**
 * Event fired when a session logs out
 */
export interface SessionLoggedOutEvent extends BaseEvent {
  // No additional properties for logout event
}

/**
 * Event fired when a session encounters a login error
 */
export interface SessionLoggedErrorEvent extends BaseEvent {
  /** Error message describing what went wrong */
  error?: string;
  
  /** Error code if available */
  errorCode?: string;
}
