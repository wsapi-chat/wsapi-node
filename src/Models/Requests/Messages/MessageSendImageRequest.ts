import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send an image message
 */
export interface MessageSendImageRequest extends MessageRequestBase {
  /**
   * Base64 encoded image data.
   */
  imageBase64?: string;

  /**
   * URL of the image to be sent. (this is an alternative to imageBase64)
   */
  imageUrl?: string;

  /**
   * MIME type of the image, e.g., "image/jpeg", "image/png".
   */
  mimeType: string;

  /**
   * Caption for the image, which can be displayed alongside the image.
   */
  caption?: string;

  /**
   * Indicates whether the image should be sent as a view once message.
   * If true, the image can only be viewed once by the recipient only in the main device.
   */
  viewOnce?: boolean;
}
