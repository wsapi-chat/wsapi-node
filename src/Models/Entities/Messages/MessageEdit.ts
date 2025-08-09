/**
 * Information about message edit operations
 */
export interface MessageEdit {
  /**
   * The ID of the original message that was edited.
   */
  originalMessageId: string;

  /**
   * The timestamp of the original message.
   */
  originalMessageTime: Date;
}
