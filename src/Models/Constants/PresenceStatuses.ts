/**
 * Constants for user presence statuses
 */
export const PresenceStatuses = {
  /**
   * User is available
   */
  AVAILABLE: 'available',

  /**
   * User is unavailable
   */
  UNAVAILABLE: 'unavailable',
} as const;

/**
 * Type for presence status values
 */
export type PresenceStatus = typeof PresenceStatuses[keyof typeof PresenceStatuses];