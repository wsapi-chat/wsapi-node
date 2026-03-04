import type { HttpClient } from './HttpClient.js';
import type { IUsersClient } from './IUsersClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type {
  UserInfo,
  UserMeInfo,
  BulkCheckResult,
  PrivacySettingsResponse,
} from '../Models/Entities/Users/index.js';
import type {
  UpdateProfileRequest,
  SetMyPresenceRequest,
  SetPrivacyRequest,
  BulkCheckRequest,
} from '../Models/Requests/Users/index.js';

/**
 * Client for the Users API.
 * Provides methods to retrieve and manage user information, presence, and privacy settings.
 */
export class UsersClient implements IUsersClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  /**
   * Gets the profile of a user by phone number.
   * @param phone The phone number of the user
   * @returns Promise that resolves to the user information
   * @throws {ApiException} When the request fails
   */
  async getUserProfileAsync(phone: string): Promise<UserInfo> {
    return await this.httpClient.get<UserInfo>(`/users/${phone}/profile`);
  }

  /**
   * Checks whether a phone number is registered on WhatsApp.
   * @param phone The phone number to check
   * @returns Promise that resolves to an object indicating WhatsApp registration status
   * @throws {ApiException} When the request fails
   */
  async checkUserAsync(phone: string): Promise<{ isInWhatsApp: boolean }> {
    return await this.httpClient.get<{ isInWhatsApp: boolean }>(`/users/${phone}/check`);
  }

  /**
   * Gets the profile of the authenticated user.
   * @returns Promise that resolves to the authenticated user's profile
   * @throws {ApiException} When the request fails
   */
  async getMyProfileAsync(): Promise<UserMeInfo> {
    return await this.httpClient.get<UserMeInfo>('/users/me/profile');
  }

  /**
   * Updates the profile of the authenticated user.
   * @param request The profile update request
   * @throws {ApiException} When the request fails
   */
  async updateMyProfileAsync(request: UpdateProfileRequest): Promise<void> {
    await this.httpClient.putVoid('/users/me/profile', request);
  }

  /**
   * Sets the presence of the authenticated user.
   * @param request The presence update request
   * @throws {ApiException} When the request fails
   */
  async setPresenceAsync(request: SetMyPresenceRequest): Promise<void> {
    await this.httpClient.putVoid('/users/me/presence', request);
  }

  /**
   * Gets the privacy settings of the authenticated user.
   * @returns Promise that resolves to the privacy settings
   * @throws {ApiException} When the request fails
   */
  async getPrivacySettingsAsync(): Promise<PrivacySettingsResponse> {
    return await this.httpClient.get<PrivacySettingsResponse>('/users/me/privacy');
  }

  /**
   * Sets the privacy settings of the authenticated user.
   * @param request The privacy settings update request
   * @returns Promise that resolves to the updated privacy settings
   * @throws {ApiException} When the request fails
   */
  async setPrivacySettingAsync(request: SetPrivacyRequest): Promise<PrivacySettingsResponse> {
    return await this.httpClient.put<PrivacySettingsResponse>('/users/me/privacy', request);
  }

  /**
   * Checks whether multiple phone numbers are registered on WhatsApp.
   * @param request The bulk check request containing phone numbers
   * @returns Promise that resolves to an array of bulk check results
   * @throws {ApiException} When the request fails
   */
  async bulkCheckAsync(request: BulkCheckRequest): Promise<BulkCheckResult[]> {
    return await this.httpClient.post<BulkCheckResult[]>('/users/check', request);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  /**
   * Gets the profile of a user by phone number with error handling.
   * @param phone The phone number of the user
   * @returns Promise that resolves to an ApiResponse containing the user information or error details
   */
  async tryGetUserProfileAsync(phone: string): Promise<ApiResponse<UserInfo>> {
    return await this.httpClient.tryGet<UserInfo>(`/users/${phone}/profile`);
  }

  /**
   * Checks whether a phone number is registered on WhatsApp with error handling.
   * @param phone The phone number to check
   * @returns Promise that resolves to an ApiResponse containing the registration status or error details
   */
  async tryCheckUserAsync(phone: string): Promise<ApiResponse<{ isInWhatsApp: boolean }>> {
    return await this.httpClient.tryGet<{ isInWhatsApp: boolean }>(`/users/${phone}/check`);
  }

  /**
   * Gets the profile of the authenticated user with error handling.
   * @returns Promise that resolves to an ApiResponse containing the profile or error details
   */
  async tryGetMyProfileAsync(): Promise<ApiResponse<UserMeInfo>> {
    return await this.httpClient.tryGet<UserMeInfo>('/users/me/profile');
  }

  /**
   * Updates the profile of the authenticated user with error handling.
   * @param request The profile update request
   * @returns Promise that resolves to an ApiResponse indicating success or error details
   */
  async tryUpdateMyProfileAsync(request: UpdateProfileRequest): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid('/users/me/profile', request);
  }

  /**
   * Sets the presence of the authenticated user with error handling.
   * @param request The presence update request
   * @returns Promise that resolves to an ApiResponse indicating success or error details
   */
  async trySetPresenceAsync(request: SetMyPresenceRequest): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid('/users/me/presence', request);
  }

  /**
   * Gets the privacy settings of the authenticated user with error handling.
   * @returns Promise that resolves to an ApiResponse containing the privacy settings or error details
   */
  async tryGetPrivacySettingsAsync(): Promise<ApiResponse<PrivacySettingsResponse>> {
    return await this.httpClient.tryGet<PrivacySettingsResponse>('/users/me/privacy');
  }

  /**
   * Sets the privacy settings of the authenticated user with error handling.
   * @param request The privacy settings update request
   * @returns Promise that resolves to an ApiResponse containing the updated privacy settings or error details
   */
  async trySetPrivacySettingAsync(request: SetPrivacyRequest): Promise<ApiResponse<PrivacySettingsResponse>> {
    return await this.httpClient.tryPut<PrivacySettingsResponse>('/users/me/privacy', request);
  }

  /**
   * Checks whether multiple phone numbers are registered on WhatsApp with error handling.
   * @param request The bulk check request containing phone numbers
   * @returns Promise that resolves to an ApiResponse containing the bulk check results or error details
   */
  async tryBulkCheckAsync(request: BulkCheckRequest): Promise<ApiResponse<BulkCheckResult[]>> {
    return await this.httpClient.tryPost<BulkCheckResult[]>('/users/check', request);
  }
}
