/**
 * Request to set group join approval mode.
 * When enabled, join requests require admin approval.
 */
export interface GroupSetJoinApprovalRequest {
  /**
   * Whether to require admin approval for join requests.
   */
  joinApproval: boolean;
}
