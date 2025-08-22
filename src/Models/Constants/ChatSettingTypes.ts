/**
 * Constants for chat setting types
 */
export const ChatSettingTypes = {
  /**
   * Ephemeral message settings
   */
  EPHEMERAL: 'ephemeral',

  /**
   * Archive settings
   */
  ARCHIVE: 'archive',

  /**
   * Mute settings
   */
  MUTE: 'mute',

  /**
   * Pin settings
   */
  PIN: 'pin',
} as const;

/**
 * Type for chat setting type values
 */
export type ChatSettingType = typeof ChatSettingTypes[keyof typeof ChatSettingTypes];