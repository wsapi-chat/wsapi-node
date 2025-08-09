/**
 * Request to create a new contact
 */
export interface ContactCreateRequest {
  /**
   * The unique identifier for the contact.
   */
  id: string;

  /**
   * The full name of the contact.
   */
  fullName: string;

  /**
   * The first name of the contact.
   */
  firstName: string;
}
