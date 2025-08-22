/**
 * Pin settings for a chat
 */
export interface ChatPin {
  /**
   * Whether the chat is pinned
   */
  isPinned: boolean;

  /**
   * When the pin was set
   */
  pinnedAt?: Date;

  /**
   * When the pin expires (null if permanent)
   */
  pinExpiresAt?: Date | null;
}