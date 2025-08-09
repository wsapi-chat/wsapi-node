import { BaseEvent } from '../BaseEvent';
import { Sender } from '../../Models/Entities/Users/Sender';
import { MessageReplyTo } from '../../Models/Entities/Messages/MessageReplyTo';
import { MessageEdit } from '../../Models/Entities/Messages/MessageEdit';
import { MessageMedia } from '../../Models/Entities/Messages/MessageMedia';
import { MessageReaction } from '../../Models/Entities/Messages/MessageReaction';

/**
 * Event fired when a new message is received
 */
export interface MessageEvent extends BaseEvent {
  /** Unique message ID */
  id: string;
  
  /** Chat ID where the message was sent */
  chatId: string;
  
  /** Message sender information */
  sender: Sender;
  
  /** Display name of the sender */
  senderName: string;
  
  /** When the message was sent */
  time: Date;
  
  /** Whether this message is in a group chat */
  isGroup: boolean;
  
  /** Whether this is a status message */
  isStatus: boolean;
  
  /** Array of mentioned user IDs */
  mentions?: string[];
  
  /** Ephemeral message expiration setting */
  expiration: string;
  
  /** Message type (text, image, video, etc.) */
  type: string;
  
  /** Text content for text messages */
  text?: string;
  
  /** Reply information if this is a reply */
  replyTo?: MessageReplyTo;
  
  /** Extended text with formatting (raw object for now) */
  extendedText?: any;
  
  /** Edit information if this message was edited */
  editMessage?: MessageEdit;
  
  /** Media content for media messages */
  media?: MessageMedia;
  
  /** Reaction information */
  reaction?: MessageReaction;
  
  /** Single contact for contact messages */
  contact?: string;
  
  /** Multiple contacts for contact array messages */
  contactArray?: string[];
  
  /** Pin information if message is pinned (raw object for now) */
  pinInChat?: any;
}

/**
 * Event fired when a message is deleted
 */
export interface MessageDeleteEvent extends BaseEvent {
  /** ID of the deleted message */
  messageId: string;
  
  /** Chat ID where the message was deleted */
  chatId: string;
  
  /** Who deleted the message */
  deletedBy: string;
  
  /** When the message was deleted */
  deletedAt: Date;
}

/**
 * Event fired when message history is synced
 */
export interface MessageHistorySyncEvent extends BaseEvent {
  /** Chat ID for the history sync */
  chatId: string;
  
  /** Number of messages synced */
  messageCount: number;
  
  /** When the sync started */
  syncStartTime: Date;
  
  /** When the sync completed */
  syncEndTime: Date;
}

/**
 * Event fired when a message is read
 */
export interface MessageReadEvent extends BaseEvent {
  /** ID of the read message */
  messageId: string;
  
  /** Chat ID where the message was read */
  chatId: string;
  
  /** Who read the message */
  readBy: string;
  
  /** When the message was read */
  readAt: Date;
}

/**
 * Event fired when a message is starred/unstarred
 */
export interface MessageStarEvent extends BaseEvent {
  /** ID of the starred message */
  messageId: string;
  
  /** Chat ID where the message was starred */
  chatId: string;
  
  /** Whether the message is now starred (true) or unstarred (false) */
  isStarred: boolean;
  
  /** Who starred/unstarred the message */
  starredBy: string;
  
  /** When the star action occurred */
  starredAt: Date;
}
