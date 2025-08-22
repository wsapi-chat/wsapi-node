/**
 * Pin information for a message
 */
export interface MessagePin {
  /**
   * Whether the message is pinned
   */
  isPinned: boolean;

  /**
   * When the message was pinned
   */
  pinnedAt?: Date;

  /**
   * When the pin expires (null if permanent)
   */
  pinExpiresAt?: Date | null;

  /**
   * User who pinned the message
   */
  pinnedBy?: string;
}