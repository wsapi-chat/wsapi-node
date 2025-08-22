/**
 * Constants for chat mute durations
 */
export const ChatMuteDurations = {
  /**
   * Turn off mute
   */
  OFF: 'off',

  /**
   * Mute for 24 hours
   */
  ONE_DAY: '24h',

  /**
   * Mute for one week
   */
  ONE_WEEK: '1w',

  /**
   * Mute always (indefinitely)
   */
  ALWAYS: 'always',
} as const;

/**
 * Type for chat mute duration values
 */
export type ChatMuteDuration = typeof ChatMuteDurations[keyof typeof ChatMuteDurations];