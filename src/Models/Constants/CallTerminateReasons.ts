/**
 * Constants for call termination reasons
 */
export const CallTerminateReasons = {
  /**
   * Call was rejected by the receiver
   */
  REJECTED: 'rejected',

  /**
   * Call ended normally
   */
  ENDED: 'ended',

  /**
   * Call terminated for an unknown reason
   */
  UNKNOWN: 'unknown',
} as const;

/**
 * Type for call termination reason values
 */
export type CallTerminateReason = (typeof CallTerminateReasons)[keyof typeof CallTerminateReasons];
