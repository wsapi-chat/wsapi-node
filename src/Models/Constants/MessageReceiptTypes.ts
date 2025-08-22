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
   * Receipt from sender
   */
  SENDER: 'sender',
} as const;

/**
 * Type for message receipt type values
 */
export type MessageReceiptType = typeof MessageReceiptTypes[keyof typeof MessageReceiptTypes];