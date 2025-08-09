import { GroupParticipantInfo } from './GroupParticipantInfo.js';

/**
 * Group information
 */
export interface GroupInfo {
  /**
   * The unique identifier of the group.
   */
  id: string;

  /**
   * The owner ID of the group.
   */
  ownerId: string;

  /**
   * The name of the group.
   */
  name: string;

  /**
   * When the group was created.
   */
  created: Date;

  /**
   * The description of the group.
   */
  description: string;

  /**
   * Whether the group is announcement only.
   */
  isAnnounce: boolean;

  /**
   * Whether the group is locked.
   */
  isLocked: boolean;

  /**
   * Whether the group has ephemeral messages enabled.
   */
  isEphemeral: boolean;

  /**
   * The ephemeral message expiration time in seconds.
   */
  ephemeralExpiration: number;

  /**
   * The participants of the group.
   */
  participants: GroupParticipantInfo[];
}
