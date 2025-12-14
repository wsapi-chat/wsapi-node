/**
 * Participant information from a group invite preview
 */
export interface GroupInviteParticipant {
  /**
   * Participant JID.
   */
  id: string;

  /**
   * Whether the participant is an admin.
   */
  isAdmin?: boolean;

  /**
   * Whether the participant is a super admin (group creator).
   */
  isSuperAdmin?: boolean;

  /**
   * Display name of the participant.
   */
  displayName?: string;
}
