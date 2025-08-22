/**
 * Archive settings for a chat
 */
export interface ChatArchive {
  /**
   * Whether the chat is archived
   */
  isArchived: boolean;

  /**
   * When the chat was archived
   */
  archivedAt?: Date;
}