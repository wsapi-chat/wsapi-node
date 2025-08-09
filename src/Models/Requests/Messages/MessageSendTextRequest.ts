import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send a text message
 */
export interface MessageSendTextRequest extends MessageRequestBase {
  /**
   * The message text to send.
   */
  text: string;
}
