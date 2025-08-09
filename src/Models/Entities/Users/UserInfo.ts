/**
 * User information
 */
export interface UserInfo {
  /**
   * The unique identifier of the user.
   */
  id: string;

  /**
   * Whether the user is on WhatsApp.
   */
  isInWhatsApp: boolean;

  /**
   * The status message of the user.
   */
  status: string;

  /**
   * The picture ID of the user.
   */
  pictureId: string;

  /**
   * The URL to the user's profile picture.
   */
  pictureUrl: string;

  /**
   * Whether the user account is verified.
   */
  isVerified: boolean;
}
