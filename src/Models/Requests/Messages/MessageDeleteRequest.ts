/**
 * Request to delete a message
 */
export interface MessageDeleteRequest {
  /**
   * The chat ID where the message is located.
   */
  chatId: string;

  /**
   * The sender ID of the message.
   */
  senderId: string;
}
