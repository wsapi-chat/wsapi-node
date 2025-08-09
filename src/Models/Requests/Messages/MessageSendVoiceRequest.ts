import { MessageRequestBase } from './MessageRequestBase.js';

/**
 * Request to send a voice message
 */
export interface MessageSendVoiceRequest extends MessageRequestBase {
  /**
   * Base64 encoded voice data. It should be OGG format
   */
  voiceBase64?: string;

  /**
   * URL of the voice file to be sent. It should be OGG format (this is an alternative to voiceBase64)
   */
  voiceUrl?: string;

  /**
   * Indicates whether the voice should be sent as a view once message.
   * If true, the voice can only be viewed once by the recipient only in the main device.
   */
  viewOnce?: boolean;
}
