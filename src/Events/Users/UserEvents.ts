import { BaseEvent } from '../BaseEvent';
import { Identity } from '../../Models/Entities/Users/Identity.js';

/**
 * User presence status
 */
export type UserPresenceStatus = 'available' | 'unavailable';

/**
 * Event fired when a user's presence changes
 */
export interface UserPresenceEvent extends BaseEvent {
  eventType: 'user_presence';

  /** User identity */
  user: Identity;

  /** Presence status */
  status: UserPresenceStatus;

  /** When the user was last seen */
  lastSeen?: string;
}
