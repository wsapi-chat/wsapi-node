/**
 * Constants for media types
 */
export const MediaTypes = {
  /**
   * Image media type
   */
  IMAGE: 'image',

  /**
   * Video media type
   */
  VIDEO: 'video',

  /**
   * Audio media type
   */
  AUDIO: 'audio',

  /**
   * Voice message media type
   */
  VOICE: 'voice',

  /**
   * Document media type
   */
  DOCUMENT: 'document',

  /**
   * Sticker media type
   */
  STICKER: 'sticker',

  /**
   * Location media type
   */
  LOCATION: 'location',
} as const;

/**
 * Type for media type values
 */
export type MediaType = (typeof MediaTypes)[keyof typeof MediaTypes];
