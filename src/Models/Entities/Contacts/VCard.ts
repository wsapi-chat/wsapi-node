/**
 * VCard contact information
 */
export interface VCard {
  /**
   * Full name
   */
  fn?: string;

  /**
   * Phone number
   */
  tel?: string;

  /**
   * Email address
   */
  email?: string;

  /**
   * Organization/company
   */
  org?: string;

  /**
   * URL/website
   */
  url?: string;

  /**
   * Raw vCard data
   */
  vcard?: string;
}
