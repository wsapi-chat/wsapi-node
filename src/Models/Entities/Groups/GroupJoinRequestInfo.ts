/**
 * Information about a pending group join request
 */
export interface GroupJoinRequestInfo {
  /**
   * JID of the user requesting to join.
   */
  userId: string;

  /**
   * When the request was made.
   */
  requestedAt: string;
}
