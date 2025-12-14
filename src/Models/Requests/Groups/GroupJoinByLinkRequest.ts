/**
 * Request to join a group via invite link code.
 */
export interface GroupJoinByLinkRequest {
  /**
   * The invite link code (e.g., "AbCdEfGhIjK" from https://chat.whatsapp.com/AbCdEfGhIjK).
   */
  code: string;
}
