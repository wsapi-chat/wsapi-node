import { BaseEvent } from '../BaseEvent';

/**
 * User presence status
 */
export type UserPresenceStatus = 'available' | 'unavailable';

/**
 * Event fired when a user's presence changes
 */
export interface UserPresenceEvent extends BaseEvent {
  eventType: 'user_presence';

  /** User chat ID */
  id: string;

  /** Presence status */
  status: UserPresenceStatus;

  /** When the user was last seen */
  lastSeen?: string;
}
