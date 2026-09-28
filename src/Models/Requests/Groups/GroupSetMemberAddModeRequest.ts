/**
 * Request to set who can add members to a group.
 */
export interface GroupSetMemberAddModeRequest {
  /**
   * When true, only admins can add members. When false, all members can add.
   */
  /** @deprecated Use onlyAdminAdd. */
  onlyAdmins?: boolean;
  onlyAdminAdd?: boolean;
}
