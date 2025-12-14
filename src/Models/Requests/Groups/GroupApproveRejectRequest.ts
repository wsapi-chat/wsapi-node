/**
 * Request to approve or reject group join requests.
 */
export interface GroupApproveRejectRequest {
  /**
   * List of user JIDs to approve or reject.
   */
  participants: string[];

  /**
   * Action to perform on the join requests.
   */
  action: 'approve' | 'reject';
}
