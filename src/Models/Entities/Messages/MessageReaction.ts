/**
 * Reaction information for a message
 */
export interface MessageReaction {
  /**
   * The ID of the message that was reacted to.
   */
  messageId: string;

  /**
   * The emoji reaction.
   */
  emoji: string;
}
