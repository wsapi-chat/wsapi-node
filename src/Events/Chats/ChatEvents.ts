import { BaseEvent } from '../BaseEvent';

/**
 * Event fired when chat presence changes (online, offline, typing, etc.)
 */
export interface ChatPresenceEvent extends BaseEvent {
  /** Chat ID where presence changed */
  chatId: string;
  
  /** User ID whose presence changed */
  userId: string;
  
  /** Presence status (online, offline, typing, recording, etc.) */
  status: string;
  
  /** When the presence status was last updated */
  lastUpdated: Date;
}

/**
 * Event fired when chat settings change
 */
export interface ChatSettingEvent extends BaseEvent {
  /** Chat ID where settings changed */
  chatId: string;
  
  /** Setting that was changed */
  setting: string;
  
  /** New value of the setting */
  value: any;
  
  /** User who changed the setting */
  changedBy: string;
  
  /** When the setting was changed */
  changedAt: Date;
}
