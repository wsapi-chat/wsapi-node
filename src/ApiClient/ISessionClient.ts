import type { ApiResponse } from './ApiResponse.js';
import type { SessionStatus, SessionPairCode } from '../Models/index.js';

/**
 * Interface for the Session API client.
 * Provides methods to manage authentication sessions.
 */
export interface ISessionClient {
  /**
   * Gets the QR code image for login.
   * @returns Promise that resolves to the QR code image as binary data
   * @throws {ApiException} When the request fails
   */
  getLoginQRImageAsync(): Promise<ArrayBuffer>;

  /**
   * Gets the QR code string for login.
   * @returns Promise that resolves to the QR code string
   * @throws {ApiException} When the request fails
   */
  getLoginQRCodeAsync(): Promise<string>;

  /**
   * Gets a pairing code for phone-based login.
   * @param phoneNumber The phone number to generate pairing code for
   * @returns Promise that resolves to the pairing code
   * @throws {ApiException} When the request fails
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
   * @returns Promise that resolves to an ApiResponse containing the QR code image or error details
   */
  tryGetLoginQRImageAsync(): Promise<ApiResponse<ArrayBuffer>>;

  /**
   * Gets the QR code string for login with error handling.
   * @returns Promise that resolves to an ApiResponse containing the QR code string or error details
   */
  tryGetLoginQRCodeAsync(): Promise<ApiResponse<string>>;

  /**
   * Gets a pairing code for phone-based login with error handling.
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
}
