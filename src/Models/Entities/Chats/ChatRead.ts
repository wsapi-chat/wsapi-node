/**
 * Read status for a chat
 */
export interface ChatRead {
  /**
   * Whether all messages in the chat are read
   */
  isRead: boolean;

  /**
   * Number of unread messages
   */
  unreadCount: number;

  /**
   * Timestamp of the last read message
   */
  lastReadAt?: Date;
}