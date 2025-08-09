import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send an audio message
 */
export interface MessageSendAudioRequest extends MessageRequestBase {
  /**
   * Base64 encoded audio data.
   */
  audioBase64?: string;

  /**
   * URL of the audio file to be sent. (this is an alternative to audioBase64)
   */
  audioUrl?: string;

  /**
   * MIME type of the audio file, e.g., "audio/mpeg", "audio/ogg".
   */
  mimeType: string;

  /**
   * Indicates whether the audio should be sent as a view once message.
   * If true, the audio can only be viewed once by the recipient only in the main device.
   */
  viewOnce?: boolean;
}
