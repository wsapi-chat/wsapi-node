import { BaseEvent } from '../BaseEvent';

/**
 * Event fired when a session successfully logs in
 */
export interface SessionLoggedInEvent extends BaseEvent {
  eventType: 'logged_in';

  /** The device ID of the logged in session */
  deviceId?: string;
}

/**
 * Event fired when a session logs out
 */
export interface SessionLoggedOutEvent extends BaseEvent {
  eventType: 'logged_out';

  /** The reason for being logged out */
  reason?: string;
}

/**
 * Event fired when a session encounters a login error
 */
export interface SessionLoggedErrorEvent extends BaseEvent {
  eventType: 'logged_error';

  /** Error message describing what went wrong */
  error?: string;

  /** The device ID */
  id?: string;
}

/**
 * Event fired when the initial sync is finished
 */
export interface InitialSyncFinishedEvent extends BaseEvent {
  eventType: 'initial_sync_finished';
  // Empty payload - event signals sync completion
}
