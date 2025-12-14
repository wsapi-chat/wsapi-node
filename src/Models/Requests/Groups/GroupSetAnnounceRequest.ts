/**
 * Request to set group announce mode.
 * When enabled, only admins can send messages to the group.
 */
export interface GroupSetAnnounceRequest {
  /**
   * Whether to enable announce mode (only admins can send messages).
   */
  announce: boolean;
}
