/**
 * Mute settings for a chat
 */
export interface ChatMute {
  /**
   * Whether the chat is currently muted
   */
  isMuted: boolean;

  /**
   * When the mute expires (null if indefinite or not muted)
   */
  mutedEndTime?: Date | null;
}