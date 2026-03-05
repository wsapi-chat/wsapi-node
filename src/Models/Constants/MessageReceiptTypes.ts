/**
 * Constants for message receipt types
 */
export const MessageReceiptTypes = {
  /**
   * Message was delivered
   */
  DELIVERED: 'delivered',

  /**
   * Message was read
   */
  READ: 'read',

  /**
   * Media message was played
   */
  PLAYED: 'played',

  /**
   * Read by self (own device)
   */
  READ_SELF: 'readSelf',

  /**
   * Receipt from sender
   */
  SENDER: 'sender',

  /**
   * Retry receipt
   */
  RETRY: 'retry',

  /**
   * Server error receipt
   */
  SERVER_ERROR: 'serverError',

  /**
   * Inactive receipt
   */
  INACTIVE: 'inactive',

  /**
   * Peer message receipt
   */
  PEER_MSG: 'peerMsg',

  /**
   * History sync receipt
   */
  HISTORY_SYNC: 'historySync',
} as const;

/**
 * Type for message receipt type values
 */
export type MessageReceiptType = (typeof MessageReceiptTypes)[keyof typeof MessageReceiptTypes];
