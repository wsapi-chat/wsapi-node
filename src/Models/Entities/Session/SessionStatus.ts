import type { PasskeyStatus } from '../../Constants/PasskeyStatuses.js';

export interface SessionStatus {
  isConnected: boolean;
  isLoggedIn: boolean;
  deviceId?: string;
  /**
   * Passkey verification state (same as `status` from `GET /session/passkey`).
   * While it is `required`, `submitted` or `confirmation_required`, stop polling the QR / pair-code endpoints.
   */
  passkeyStatus?: PasskeyStatus;
}
