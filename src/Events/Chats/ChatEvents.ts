import { BaseEvent } from '../BaseEvent';
import { Sender } from '../../Models/Entities/Users/Sender';

/**
 * Chat presence state type
 */
export type ChatPresenceState = 'typing' | 'recording' | 'paused';

/**
 * Chat setting type
 */
export type ChatSettingType = 'mute' | 'pin' | 'read' | 'archive' | 'ephemeral';

/**
 * Ephemeral expiration values
 */
export type EphemeralExpiration = 'off' | '24h' | '7d' | '90d';

/**
 * Event fired when chat presence changes (typing, recording, paused)
 */
export interface ChatPresenceEvent extends BaseEvent {
  eventType: 'chat_presence';

  /** Chat ID where presence changed */
  id: string;

  /** Sender information */
  sender: Sender;

  /** Presence state */
  state: ChatPresenceState;
}

/**
 * Mute setting data
 */
export interface ChatMuteSetting {
  isMuted: boolean;
  muteEndTime?: string;
}

/**
 * Pin setting data
 */
export interface ChatPinSetting {
  isPinned: boolean;
}

/**
 * Read setting data
 */
export interface ChatReadSetting {
  isRead: boolean;
}

/**
 * Archive setting data
 */
export interface ChatArchiveSetting {
  isArchived: boolean;
}

/**
 * Ephemeral setting data
 */
export interface ChatEphemeralSetting {
  expiration: EphemeralExpiration;
  sender?: Sender;
}

/**
 * Event fired when chat settings change (mute, pin, read, archive, ephemeral)
 */
export interface ChatSettingEvent extends BaseEvent {
  eventType: 'chat_setting';

  /** Chat ID where settings changed */
  id: string;

  /** Type of setting that changed */
  settingType: ChatSettingType;

  /** Mute setting (present when settingType is 'mute') */
  mute?: ChatMuteSetting;

  /** Pin setting (present when settingType is 'pin') */
  pin?: ChatPinSetting;

  /** Read setting (present when settingType is 'read') */
  read?: ChatReadSetting;

  /** Archive setting (present when settingType is 'archive') */
  archive?: ChatArchiveSetting;

  /** Ephemeral setting (present when settingType is 'ephemeral') */
  ephemeral?: ChatEphemeralSetting;
}

/**
 * Event fired when chat push name changes
 */
export interface ChatPushNameEvent extends BaseEvent {
  eventType: 'chat_push_name';

  /** Chat ID */
  id: string;

  /** The chat's push name */
  pushName: string;
}

/**
 * Event fired when chat status changes
 */
export interface ChatStatusEvent extends BaseEvent {
  eventType: 'chat_status';

  /** Chat ID */
  id: string;

  /** The chat's status message */
  status: string;
}

/**
 * Event fired when chat picture changes
 */
export interface ChatPictureEvent extends BaseEvent {
  eventType: 'chat_picture';

  /** Chat ID */
  id: string;

  /** Sender who changed the picture */
  sender: Sender;

  /** The ID of the chat's profile picture */
  pictureId: string;
}
