/**
 * Base interface for all message request types
 */
export interface MessageRequestBase {
  /**
   * The recipient of the message. This could be a phone number, group ID, or broadcast list ID.
   * Phone numbers should be in the 1234567890@s.whatsapp.net format.
   * Group IDs should be in the format 12345678@g.us format
   */
  to: string;

  /**
   * An array of phone numbers that are mentioned in the message.
   * The message mentions should be in the following format: Hello @1234567890
   * The mentions should be in the whatsapp format: 1234567890@s.whatsapp.net
   */
  mentions?: string[];

  /**
   * Message ID of the message being replied to.
   */
  replyTo?: string;

  /**
   * Indicates whether the message is a forwarded message.
   */
  isForwarded?: boolean;
}
