/**
 * Group participant information
 */
export interface GroupParticipantInfo {
  /**
   * The unique identifier of the participant.
   */
  id: string;

  /**
   * Whether the participant is an admin.
   */
  isAdmin: boolean;

  /**
   * Whether the participant is a super admin.
   */
  isSuperAdmin: boolean;

  /**
   * The display name of the participant.
   */
  displayName: string;
}
