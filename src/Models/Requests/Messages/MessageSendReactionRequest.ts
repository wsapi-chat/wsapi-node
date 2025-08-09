/**
 * Request to send a reaction to a message
 */
export interface MessageSendReactionRequest {
  /**
   * The recipient of the reaction. This could be a phone number, group ID, or broadcast list ID.
   */
  to: string;

  /**
   * If the recipient is a group, this is the ID of the sender of the message to which the reaction is being sent. If the recipient is a user, this could be null
   */
  senderId?: string;

  /**
   * The emoji reaction to be sent. This should be a valid emoji string.
   */
  reaction: string;
}
