/**
 * Information about a message sender
 */
export interface Sender {
  /**
   * The unique identifier of the sender.
   */
  id: string;

  /**
   * The user identifier (phone number without domain).
   */
  user: string;

  /**
   * The device identifier.
   */
  device: number;

  /**
   * Whether this message is from the current user.
   */
  isMe: boolean;
}
