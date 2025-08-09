/**
 * Request to update contact information
 */
export interface ContactUpdateRequest {
  /**
   * The full name of the contact.
   */
  fullName: string;

  /**
   * The first name of the contact.
   */
  firstName: string;
}
