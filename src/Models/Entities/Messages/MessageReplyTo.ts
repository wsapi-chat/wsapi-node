import { Sender } from '../Users/Sender.js';

/**
 * Information about a message being replied to
 */
export interface MessageReplyTo {
  /**
   * The ID of the message being replied to.
   */
  id: string;

  /**
   * The sender of the original message.
   */
  sender: Sender;

  /**
   * Whether the original message was forwarded.
   */
  isForwarded: boolean;
}
