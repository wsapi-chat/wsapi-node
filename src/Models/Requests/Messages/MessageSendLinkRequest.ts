import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send a link message
 */
export interface MessageSendLinkRequest extends MessageRequestBase {
  /**
   * The message text to send. It should include the url of the link.
   */
  text: string;

  /**
   * The URL to include in the message.
   */
  url: string;

  /**
   * The title of the link.
   */
  title?: string;

  /**
   * The description of the link.
   */
  description?: string;

  /**
   * The JPEG thumbnail as a base64 string.
   */
  jpegThumbnail?: string;
}
