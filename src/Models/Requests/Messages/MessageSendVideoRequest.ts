import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send a video message
 */
export interface MessageSendVideoRequest extends MessageRequestBase {
  /**
   * Base64 encoded video data. It should be in a supported video format.
   */
  videoBase64?: string;

  /**
   * URL of the video file to be sent. (this is an alternative to videoBase64)
   */
  videoUrl?: string;

  /**
   * MIME type of the video file, e.g., "video/mp4", "video/avi".
   */
  mimeType: string;

  /**
   * Caption for the video, which can be displayed alongside the video.
   */
  caption?: string;

  /**
   * Indicates whether the video should be sent as a view once message.
   * If true, the video can only be viewed once by the recipient only in the main device.
   */
  viewOnce?: boolean;
}
