/**
 * Account information
 */
export interface AccountInfo {
  /**
   * The unique identifier of the account.
   */
  id: string;

  /**
   * The device ID.
   */
  deviceId: number;

  /**
   * The phone number associated with the account.
   */
  phone: string;

  /**
   * The push name (display name) of the account.
   */
  pushName: string;

  /**
   * The business name (if applicable).
   */
  businessName: string;

  /**
   * The status message of the account.
   */
  status: string;

  /**
   * The picture ID of the account.
   */
  pictureId: string;
}
