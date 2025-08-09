/**
 * Contact information in a message
 */
export interface MessageContact {
  /**
   * The display name of the contact.
   */
  displayName: string;

  /**
   * The vCard data of the contact.
   */
  vCard: string;
}
