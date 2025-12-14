/**
 * Request to join a group via invite message details.
 */
export interface GroupJoinByInviteRequest {
  /**
   * The group JID.
   */
  groupId: string;

  /**
   * The JID of the user who sent the invite.
   */
  inviterId: string;

  /**
   * The invite code from the message.
   */
  code: string;

  /**
   * The invite expiration timestamp (Unix seconds).
   */
  expiration?: number;
}
