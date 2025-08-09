/**
 * Contact information
 */
export interface ContactInfo {
  /**
   * The unique identifier of the contact.
   */
  id: string;

  /**
   * The full name of the contact.
   */
  fullName: string;

  /**
   * The business name of the contact (if applicable).
   */
  businessName: string;

  /**
   * The push name (display name) of the contact.
   */
  pushName: string;

  /**
   * The status message of the contact.
   */
  status: string;

  /**
   * The picture ID of the contact.
   */
  pictureId: string;

  /**
   * Whether the contact is in the phone's address book.
   */
  inPhoneAddressBook: boolean;
}
