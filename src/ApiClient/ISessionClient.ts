import type { ApiResponse } from './ApiResponse.js';
import type { SessionStatus, SessionPairCode, SessionQRCode, PasskeyState, PasskeyAssertion } from '../Models/index.js';

/**
 * Interface for the Session API client.
 * Provides methods to manage authentication sessions.
 */
export interface ISessionClient {
  /**
   * Gets the QR code image for login.
   * @returns Promise that resolves to the QR code image as binary data
   * @throws {ApiException} When the request fails (409 while a passkey verification step is pending; see {@link getPasskeyStateAsync})
   */
  getLoginQRImageAsync(): Promise<ArrayBuffer>;

  /**
   * Gets the QR code for login.
   * @returns Promise that resolves to the QR code response
   * @throws {ApiException} When the request fails (409 while a passkey verification step is pending; see {@link getPasskeyStateAsync})
   */
  getLoginQRCodeAsync(): Promise<SessionQRCode>;

  /**
   * Gets a pairing code for phone-based login.
   * @param phoneNumber The phone number to generate pairing code for
   * @returns Promise that resolves to the pairing code
   * @throws {ApiException} When the request fails (409 while a passkey verification step is pending; see {@link getPasskeyStateAsync})
   */
  getLoginPairCodeAsync(phoneNumber: string): Promise<SessionPairCode>;

  /**
   * Logs out the current session.
   * @returns Promise that resolves when logout is complete
   * @throws {ApiException} When the request fails
   */
  logoutAsync(): Promise<void>;

  /**
   * Gets the current session status.
   * @returns Promise that resolves to the session status
   * @throws {ApiException} When the request fails
   */
  getSessionStatusAsync(): Promise<SessionStatus>;

  /**
   * Gets the QR code image for login with error handling.
   * Returns a 409 error response while a passkey verification step is pending; see {@link getPasskeyStateAsync}.
   * @returns Promise that resolves to an ApiResponse containing the QR code image or error details
   */
  tryGetLoginQRImageAsync(): Promise<ApiResponse<ArrayBuffer>>;

  /**
   * Gets the QR code for login with error handling.
   * Returns a 409 error response while a passkey verification step is pending; see {@link getPasskeyStateAsync}.
   * @returns Promise that resolves to an ApiResponse containing the QR code response or error details
   */
  tryGetLoginQRCodeAsync(): Promise<ApiResponse<SessionQRCode>>;

  /**
   * Gets a pairing code for phone-based login with error handling.
   * Returns a 409 error response while a passkey verification step is pending; see {@link getPasskeyStateAsync}.
   * @param phoneNumber The phone number to generate pairing code for
   * @returns Promise that resolves to an ApiResponse containing the pairing code or error details
   */
  tryGetLoginPairCodeAsync(phoneNumber: string): Promise<ApiResponse<SessionPairCode>>;

  /**
   * Logs out the current session with error handling.
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  tryLogoutAsync(): Promise<ApiResponse<void>>;

  /**
   * Gets the current session status with error handling.
   * @returns Promise that resolves to an ApiResponse containing the session status or error details
   */
  tryGetSessionStatusAsync(): Promise<ApiResponse<SessionStatus>>;

  /**
   * Flushes the message history for the current session.
   * @returns Promise that resolves to the status response
   * @throws {ApiException} When the request fails
   */
  flushHistoryAsync(): Promise<{ status: string }>;

  /**
   * Flushes the message history for the current session with error handling.
   * @returns Promise that resolves to an ApiResponse containing the status response or error details
   */
  tryFlushHistoryAsync(): Promise<ApiResponse<{ status: string }>>;

  /**
   * Gets the state of the passkey (WebAuthn) verification step, if any.
   *
   * Some WhatsApp accounts require the owner's passkey to link a device. While `status` is
   * `required`, the result contains the WebAuthn `challenge` to sign with `navigator.credentials.get()`
   * on `origin` (`https://web.whatsapp.com`); submit the assertion with {@link submitPasskeyAsync}.
   * While a step is pending, the QR and pair-code endpoints return 409 — stop polling them.
   * @returns Promise that resolves to the passkey verification state
   * @throws {ApiException} When the request fails
   */
  getPasskeyStateAsync(): Promise<PasskeyState>;

  /**
   * Submits the WebAuthn assertion (the browser's `PublicKeyCredential.toJSON()`) for the pending passkey challenge.
   * @param assertion The WebAuthn assertion produced by the account owner's passkey
   * @returns Promise that resolves to the updated passkey state (usually `submitted` or `confirmation_required`)
   * @throws {ApiException} When the request fails: 400 malformed or mismatched assertion (step stays `required`),
   * 409 no passkey step pending or expired, 413 body too large, 502 WhatsApp rejected the passkey
   */
  submitPasskeyAsync(assertion: PasskeyAssertion): Promise<PasskeyState>;

  /**
   * Asks WhatsApp for a passkey challenge for an unpaired device (e.g. when WhatsApp's own notification
   * does not arrive, or to link with a passkey only). Idempotent while a challenge is pending.
   * @returns Promise that resolves to the passkey state (`required` with `source: requested`)
   * @throws {ApiException} When the request fails: 400 device already paired, 409 could not connect to WhatsApp,
   * 502 WhatsApp did not return a challenge
   */
  requestPasskeyAsync(): Promise<PasskeyState>;

  /**
   * Confirms the passkey pairing code.
   *
   * Compatibility / fallback only: the server now sends the confirmation automatically when the status becomes
   * `confirmation_required` (`confirmationSent` is `true`), so clients do not need to call this. A no-op if the
   * confirmation was already sent.
   * @returns Promise that resolves when the confirmation was sent or had already been sent
   * @throws {ApiException} When the request fails: 409 no step in `confirmation_required` or expired,
   * 502 WhatsApp rejected the confirmation
   */
  confirmPasskeyAsync(): Promise<void>;

  /**
   * Gets the state of the passkey verification step with error handling.
   * @returns Promise that resolves to an ApiResponse containing the passkey state or error details
   */
  tryGetPasskeyStateAsync(): Promise<ApiResponse<PasskeyState>>;

  /**
   * Submits the WebAuthn assertion for the pending passkey challenge with error handling.
   * @param assertion The WebAuthn assertion produced by the account owner's passkey
   * @returns Promise that resolves to an ApiResponse containing the updated passkey state or error details
   */
  trySubmitPasskeyAsync(assertion: PasskeyAssertion): Promise<ApiResponse<PasskeyState>>;

  /**
   * Asks WhatsApp for a passkey challenge for an unpaired device with error handling.
   * @returns Promise that resolves to an ApiResponse containing the passkey state or error details
   */
  tryRequestPasskeyAsync(): Promise<ApiResponse<PasskeyState>>;

  /**
   * Confirms the passkey pairing code with error handling.
   * Compatibility / fallback only: the server sends the confirmation automatically.
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  tryConfirmPasskeyAsync(): Promise<ApiResponse<void>>;
}
