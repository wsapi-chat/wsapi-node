import { BaseEvent } from '../BaseEvent';
import { Sender } from '../../Models/Entities/Users/Sender';
import { MessageReplyTo } from '../../Models/Entities/Messages/MessageReplyTo';
import { MessageEdit } from '../../Models/Entities/Messages/MessageEdit';
import { MessageMedia } from '../../Models/Entities/Messages/MessageMedia';
import { MessageReaction } from '../../Models/Entities/Messages/MessageReaction';
import { MessagePin } from '../../Models/Entities/Messages/MessagePin';
import { MessageExtendedText } from '../../Models/Entities/Messages/MessageExtendedText';

/**
 * Message type
 */
export type MessageType = 'text' | 'media' | 'reaction' | 'contact' | 'contactArray' | 'pinInChat';

/**
 * Receipt type for message read events
 */
export type ReceiptType =
  | 'delivered'
  | 'read'
  | 'played'
  | 'readSelf'
  | 'sender'
  | 'retry'
  | 'serverError'
  | 'inactive'
  | 'peerMsg'
  | 'historySync';

/**
 * Event fired when a new message is received
 */
export interface MessageEvent extends BaseEvent {
  eventType: 'message';

  /** Unique message ID */
  id: string;

  /** When the message was sent */
  time: string;

  /** Chat ID where the message was sent */
  chatId: string;

  /** Message sender information */
  sender: Sender;

  /** Whether this message is in a group chat */
  isGroup?: boolean;

  /** Whether this is a status message */
  isStatus?: boolean;

  /** Message type */
  type: MessageType;

  /** Text content for text messages */
  text?: string;

  /** Media content for media messages */
  media?: MessageMedia;

  /** Reaction information */
  reaction?: MessageReaction;

  /** Single contact vCard for contact messages */
  contact?: string;

  /** Array of vCards for contact array messages */
  contactArray?: string[];

  /** Extended text with URL preview */
  extendedText?: MessageExtendedText;

  /** Array of mentioned user IDs */
  mentions?: string[];

  /** Reply information if this is a reply */
  replyTo?: MessageReplyTo;

  /** Ephemeral message expiration setting */
  ephemeralExpiration?: string;

  /** Whether this message was edited */
  isEdit?: boolean;

  /** Edit information if this message was edited */
  edit?: MessageEdit;

  /** Pin information for pinInChat messages */
  pin?: MessagePin;

  /** Whether this message was forwarded */
  isForwarded?: boolean;

  /** Whether this is a view-once message */
  viewOnce?: boolean;
}

/**
 * Event fired when a message is deleted
 */
export interface MessageDeleteEvent extends BaseEvent {
  eventType: 'message_delete';

  /** ID of the deleted message */
  id: string;

  /** Sender who deleted the message */
  sender: Sender;

  /** Chat ID where the message was deleted */
  chatId: string;

  /** When the message was deleted */
  time: string;

  /** Whether deleted for all participants */
  isDeletedForAll?: boolean;

  /** Whether deleted only for the current user */
  isDeletedForMe?: boolean;

  /** Whether this was a status message */
  isStatus?: boolean;
}

/**
 * Event fired when message history is synced
 */
export interface MessageHistorySyncEvent extends BaseEvent {
  eventType: 'message_history_sync';

  /** Chat ID for which history was synced */
  chatId?: string;

  /** Array of synced messages */
  messages: MessageEvent[];
}

/**
 * Event fired when a message is read
 */
export interface MessageReadEvent extends BaseEvent {
  eventType: 'message_read';

  /** Chat ID where the message was read */
  chatId: string;

  /** Who read the message */
  sender: Sender;

  /** Original message sender */
  messageSender?: Sender;

  /** Whether this is in a group chat */
  isGroup?: boolean;

  /** IDs of messages that were read */
  messageIds?: string[];

  /** When the read receipt was received */
  time: string;

  /** Type of receipt */
  receiptType: ReceiptType;
}

/**
 * Event fired when a message is starred/unstarred
 */
export interface MessageStarEvent extends BaseEvent {
  eventType: 'message_star';

  /** ID of the starred message */
  id: string;

  /** Chat ID where the message was starred */
  chatId: string;

  /** Who starred/unstarred the message */
  sender: Sender;

  /** When the star action occurred */
  time: string;

  /** Whether the message is now starred (true) or unstarred (false) */
  isStarred: boolean;
}
