import type { PasskeySource, PasskeyStatus } from '../../Constants/PasskeyStatuses.js';

/**
 * A credential allowed to answer a passkey challenge.
 */
export interface PasskeyAllowCredential {
  /** Credential ID (base64url, unpadded) */
  id?: string;
  /** Credential type, e.g. `public-key` */
  type?: string;
  /** Allowed authenticator transports */
  transports?: string[];
}

/**
 * WebAuthn `PublicKeyCredentialRequestOptionsJSON` sent by WhatsApp, with binary fields
 * base64url-encoded (accepted by `PublicKeyCredential.parseRequestOptionsFromJSON`).
 */
export interface PasskeyChallenge {
  /** Challenge bytes (base64url, unpadded) */
  challenge?: string;
  /** Timeout in milliseconds */
  timeout?: number;
  /** Relying party ID */
  rpId?: string;
  /** Credentials allowed to answer the challenge (empty for a discoverable credential) */
  allowCredentials?: PasskeyAllowCredential[];
  /** User verification requirement, e.g. `required` */
  userVerification?: string;
  /** WebAuthn extensions */
  extensions?: Record<string, unknown>;
}

/**
 * State of the passkey verification step (`GET /session/passkey`).
 */
export interface PasskeyState {
  /** Current passkey verification state */
  status: PasskeyStatus;
  /** Where the challenge came from. Omitted when no step is in progress. */
  source?: PasskeySource;
  /**
   * WebAuthn challenge to pass to `navigator.credentials.get()` on `origin`.
   * Only set while `status` is `required`.
   */
  challenge?: PasskeyChallenge;
  /** Origin the challenge must be signed on (e.g. `https://web.whatsapp.com`). Only set while `status` is `required`. */
  origin?: string;
  /** Code to show the user while `status` is `confirmation_required`. */
  confirmationCode?: string;
  /** `true` once the confirmation has been sent to WhatsApp (sent automatically). */
  confirmationSent?: boolean;
  /** Failure reason when `status` is `error` */
  error?: string;
  /** When WhatsApp requested the passkey verification (ISO 8601 date-time) */
  requestedAt?: string;
  /** When the step expires, 5 minutes after `requestedAt` (ISO 8601 date-time) */
  expiresAt?: string;
}
