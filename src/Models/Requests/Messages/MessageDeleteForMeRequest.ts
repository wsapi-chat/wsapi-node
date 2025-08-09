/**
 * Request to delete a message for me only
 */
export interface MessageDeleteForMeRequest {
  /**
   * The chat ID where the message is located.
   */
  chatId: string;

  /**
   * The sender ID of the message.
   */
  senderId: string;

  /**
   * Whether the message is from me.
   */
  isFromMe: boolean;

  /**
   * The timestamp of the message.
   */
  time: Date;
}
