/**
 * Constants for passkey verification statuses
 * (`status` from `GET /session/passkey` and `passkeyStatus` from `GET /session/status`).
 */
export const PasskeyStatuses = {
  /**
   * No passkey step in progress
   */
  NONE: 'none',

  /**
   * WhatsApp is waiting for the passkey assertion; `challenge` and `origin` are set
   */
  REQUIRED: 'required',

  /**
   * The assertion was sent; waiting for WhatsApp to complete the link
   */
  SUBMITTED: 'submitted',

  /**
   * Show `confirmationCode` to the user so they can compare it with the code on their phone
   * and approve there. The confirmation is sent automatically.
   */
  CONFIRMATION_REQUIRED: 'confirmation_required',

  /**
   * The step failed or expired; see `error`
   */
  ERROR: 'error',
} as const;

/**
 * Type for passkey verification status values
 */
export type PasskeyStatus = (typeof PasskeyStatuses)[keyof typeof PasskeyStatuses];

/**
 * Constants for the source of a passkey challenge
 */
export const PasskeySources = {
  /**
   * WhatsApp pushed the challenge after the QR scan or pair code
   */
  NOTIFICATION: 'notification',

  /**
   * The challenge was fetched via `POST /session/passkey/request`
   */
  REQUESTED: 'requested',
} as const;

/**
 * Type for passkey challenge source values
 */
export type PasskeySource = (typeof PasskeySources)[keyof typeof PasskeySources];
