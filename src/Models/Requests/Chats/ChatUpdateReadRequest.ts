/**
 * Request to update chat read status
 */
export interface ChatUpdateReadRequest {
  /**
   * Whether the chat should be marked as read or unread.
   */
  read: boolean;
}
