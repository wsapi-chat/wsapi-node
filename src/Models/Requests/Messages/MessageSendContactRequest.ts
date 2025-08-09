/**
 * Request to send a contact message
 */
export interface MessageSendContactRequest {
  /**
   * The recipient of the message. This could be a phone number, group ID, or broadcast list ID.
   */
  to: string;

  /**
   * The vCard data of the contact.
   */
  vCard: string;

  /**
   * The display name of the contact.
   */
  displayName: string;
}
