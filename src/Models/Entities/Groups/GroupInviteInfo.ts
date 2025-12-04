/**
 * Group invite information from an invite code
 */
export interface GroupInviteInfo {
  /**
   * The invite code.
   */
  code: string;

  /**
   * The group ID.
   */
  group: string;

  /**
   * The expiration date of the invite.
   */
  expires?: string;
}
