/**
 * Chat information
 */
export interface ChatInfo {
  /**
   * The unique identifier of the chat.
   */
  id: string;

  /**
   * Whether the chat is read-only.
   */
  isReadOnly: boolean;

  /**
   * Whether the chat is a group chat.
   */
  isGroup: boolean;

  /**
   * Whether the chat is archived.
   */
  isArchived: boolean;

  /**
   * Whether the chat is pinned.
   */
  isPinned: boolean;

  /**
   * Whether the chat has ephemeral messages enabled.
   */
  isEphemeral: boolean;

  /**
   * The ephemeral message expiration time in seconds.
   */
  ephemeralExpiration: number;

  /**
   * Whether the chat is muted.
   */
  isMuted: boolean;

  /**
   * When the mute will end (if muted).
   */
  muteEndTime?: Date;

  /**
   * Whether the chat is marked as spam.
   */
  isSpam: boolean;
}
