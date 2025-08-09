import { BaseEvent } from '../BaseEvent';

/**
 * Event fired when a user's push name changes
 */
export interface UserPushNameEvent extends BaseEvent {
  /** User ID */
  id: string;
  
  /** New push name */
  pushName: string;
  
  /** Previous push name */
  previousPushName?: string;
  
  /** When the push name was changed */
  changedAt: Date;
}

/**
 * Event fired when a user's profile picture changes
 */
export interface UserPictureEvent extends BaseEvent {
  /** User ID */
  id: string;
  
  /** URL of the new profile picture */
  pictureUrl?: string;
  
  /** Whether the picture was removed */
  isRemoved: boolean;
  
  /** When the picture was changed */
  changedAt: Date;
}

/**
 * Event fired when a user's presence changes
 */
export interface UserPresenceEvent extends BaseEvent {
  /** User ID */
  id: string;
  
  /** Presence status (online, offline, typing, etc.) */
  status: string;
  
  /** When the user was last seen */
  lastSeen: Date;
}

/**
 * Event fired when a user's status/about changes
 */
export interface UserStatusEvent extends BaseEvent {
  /** User ID */
  id: string;
  
  /** New status/about text */
  status: string;
  
  /** Previous status/about text */
  previousStatus?: string;
  
  /** When the status was changed */
  changedAt: Date;
}
