import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send a sticker message
 */
export interface MessageSendStickerRequest extends MessageRequestBase {
  /**
   * The sticker to send, encoded in base64. The file should be in a WebP supported sticker format.
   */
  stickerBase64?: string;

  /**
   * The URL of the sticker to send. (this is an alternative to stickerBase64). The file should be in a WebP supported sticker format.
   */
  stickerUrl?: string;

  /**
   * Whether the sticker is animated or not.
   */
  isAnimated?: boolean;
}
