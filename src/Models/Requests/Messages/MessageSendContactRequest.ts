import type { MessageRequestBase } from './MessageRequestBase.js';
/**
 * Request to send a contact message
 */
export interface MessageSendContactRequest extends MessageRequestBase {
  /**
   * The recipient of the message. This could be a phone number, group ID, or broadcast list ID.
   */
  to: string;

  /**
   * The vCard data of the contact.
   */
  /** @deprecated Use vcard. */
  vCard?: string;
  vcard?: string;

  /**
   * The display name of the contact.
   */
  displayName?: string;
}
