import type { Sender } from '../Users/index.js';

/**
 * Ephemeral message settings for a chat
 */
export interface ChatEphemeral {
  /**
   * Ephemeral expiration time (e.g., "24h", "7d", "90d", "off")
   */
  expiration: string;

  /**
   * User who set the ephemeral setting
   */
  sender: Sender;
}