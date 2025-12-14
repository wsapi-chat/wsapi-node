import type { GroupInviteParticipant } from './GroupInviteParticipant.js';

/**
 * Group information retrieved from an invite code
 */
export interface GroupInviteInfo {
  /**
   * Group JID.
   */
  id: string;

  /**
   * Group owner JID.
   */
  ownerId?: string;

  /**
   * Group name.
   */
  name: string;

  /**
   * Group creation date.
   */
  created?: string;

  /**
   * Group description.
   */
  description?: string;

  /**
   * Whether only admins can send messages.
   */
  isAnnounce?: boolean;

  /**
   * Whether only admins can edit group info.
   */
  isLocked?: boolean;

  /**
   * Whether ephemeral messages are enabled.
   */
  isEphemeral?: boolean;

  /**
   * Ephemeral message expiration in seconds.
   */
  ephemeralExpiration?: number;

  /**
   * List of group participants.
   */
  participants?: GroupInviteParticipant[];
}
