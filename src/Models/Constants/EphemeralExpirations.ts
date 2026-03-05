/**
 * Constants for ephemeral message expiration times
 */
export const EphemeralExpirations = {
  /**
   * Turn off ephemeral messages
   */
  OFF: 'off',

  /**
   * Messages expire after 24 hours
   */
  HOURS_24: '24h',

  /**
   * Messages expire after 7 days
   */
  DAYS_7: '7d',

  /**
   * Messages expire after 90 days
   */
  DAYS_90: '90d',
} as const;

/**
 * Type for ephemeral expiration values
 */
export type EphemeralExpiration = (typeof EphemeralExpirations)[keyof typeof EphemeralExpirations];
