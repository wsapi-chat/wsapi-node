/**
 * Request to star/unstar a message
 */
export interface MessageStarRequest {
  /**
   * The chat ID where the message is located.
   */
  chatId: string;

  /**
   * The sender ID of the message.
   */
  senderId: string;

  /**
   * Whether the message should be starred or unstarred.
   */
  starred: boolean;
}
