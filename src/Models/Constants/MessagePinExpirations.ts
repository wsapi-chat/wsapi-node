/**
 * Constants for message pin expiration times
 */
export const MessagePinExpirations = {
  /**
   * Pin never expires
   */
  NEVER: 'never',

  /**
   * Pin expires after 24 hours
   */
  HOURS_24: '24h',

  /**
   * Pin expires after 7 days
   */
  DAYS_7: '7d',

  /**
   * Pin expires after 30 days
   */
  DAYS_30: '30d',
} as const;

/**
 * Type for message pin expiration values
 */
export type MessagePinExpiration = typeof MessagePinExpirations[keyof typeof MessagePinExpirations];