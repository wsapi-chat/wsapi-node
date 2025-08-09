/**
 * Request to update chat mute status
 */
export interface ChatUpdateMuteRequest {
  /**
   * The duration to mute the chat. If undefined, the chat will be unmuted.
   */
  duration?: string;
}
