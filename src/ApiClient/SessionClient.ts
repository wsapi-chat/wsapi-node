import type { HttpClient } from './HttpClient.js';
import type { ISessionClient } from './ISessionClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { SessionStatus, SessionPairCode } from '../Models/index.js';

/**
 * Client for the Session API.
 * Provides methods to manage authentication sessions.
 */
export class SessionClient implements ISessionClient {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Gets the QR code image for login.
   * @returns Promise that resolves to the QR code image as binary data
   * @throws {ApiException} When the request fails
   */
  async getLoginQRImageAsync(): Promise<ArrayBuffer> {
    return await this.httpClient.getBinary('/session/login/qr/image');
  }

  /**
   * Gets the QR code string for login.
   * @returns Promise that resolves to the QR code string
   * @throws {ApiException} When the request fails
   */
  async getLoginQRCodeAsync(): Promise<string> {
    return await this.httpClient.get<string>('/session/login/qr/code');
  }

  /**
   * Gets a pairing code for phone-based login.
   * @param phoneNumber The phone number to generate pairing code for
   * @returns Promise that resolves to the pairing code
   * @throws {ApiException} When the request fails
   */
  async getLoginPairCodeAsync(phoneNumber: string): Promise<SessionPairCode> {
    return await this.httpClient.get<SessionPairCode>(`/session/login/code/${phoneNumber}`);
  }

  /**
   * Logs out the current session.
   * @returns Promise that resolves when logout is complete
   * @throws {ApiException} When the request fails
   */
  async logoutAsync(): Promise<void> {
    await this.httpClient.postVoid('/session/logout');
  }

  /**
   * Gets the current session status.
   * @returns Promise that resolves to the session status
   * @throws {ApiException} When the request fails
   */
  async getSessionStatusAsync(): Promise<SessionStatus> {
    return await this.httpClient.get<SessionStatus>('/session/status');
  }

  /**
   * Gets the QR code image for login with error handling.
   * @returns Promise that resolves to an ApiResponse containing the QR code image or error details
   */
  async tryGetLoginQRImageAsync(): Promise<ApiResponse<ArrayBuffer>> {
    return await this.httpClient.tryGetBinary('/session/login/qr/image');
  }

  /**
   * Gets the QR code string for login with error handling.
   * @returns Promise that resolves to an ApiResponse containing the QR code string or error details
   */
  async tryGetLoginQRCodeAsync(): Promise<ApiResponse<string>> {
    return await this.httpClient.tryGet<string>('/session/login/qr/code');
  }

  /**
   * Gets a pairing code for phone-based login with error handling.
   * @param phoneNumber The phone number to generate pairing code for
   * @returns Promise that resolves to an ApiResponse containing the pairing code or error details
   */
  async tryGetLoginPairCodeAsync(phoneNumber: string): Promise<ApiResponse<SessionPairCode>> {
    return await this.httpClient.tryGet<SessionPairCode>(`/session/login/code/${phoneNumber}`);
  }

  /**
   * Logs out the current session with error handling.
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  async tryLogoutAsync(): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPostVoid('/session/logout');
  }

  /**
   * Gets the current session status with error handling.
   * @returns Promise that resolves to an ApiResponse containing the session status or error details
   */
  async tryGetSessionStatusAsync(): Promise<ApiResponse<SessionStatus>> {
    return await this.httpClient.tryGet<SessionStatus>('/session/status');
  }
}
