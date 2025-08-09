/**
 * Request to mark a message as read
 */
export interface MessageMarkAsReadRequest {
  /**
   * The chat ID where the message is located.
   */
  chatId: string;

  /**
   * The sender ID of the message.
   */
  senderId: string;

  /**
   * The receipt type for the read operation.
   */
  receiptType: string;
}
