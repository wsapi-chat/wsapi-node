/**
 * Constants for chat presence states
 */
export const ChatPresenceStates = {
  /**
   * User is typing
   */
  TYPING: 'typing',

  /**
   * User is recording audio/video
   */
  RECORDING: 'recording',

  /**
   * User presence is paused
   */
  PAUSED: 'paused',
} as const;

/**
 * Type for chat presence state values
 */
export type ChatPresenceState = typeof ChatPresenceStates[keyof typeof ChatPresenceStates];