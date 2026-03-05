/**
 * Constants for chat setting types
 */
export const ChatSettingTypes = {
  /**
   * Mute settings
   */
  MUTE: 'mute',

  /**
   * Pin settings
   */
  PIN: 'pin',

  /**
   * Read settings
   */
  READ: 'read',

  /**
   * Archive settings
   */
  ARCHIVE: 'archive',

  /**
   * Ephemeral message settings
   */
  EPHEMERAL: 'ephemeral',
} as const;

/**
 * Type for chat setting type values
 */
export type ChatSettingType = (typeof ChatSettingTypes)[keyof typeof ChatSettingTypes];
