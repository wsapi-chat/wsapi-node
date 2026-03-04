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
 * Interface for the Users API client.
 * Provides methods to retrieve and manage user information, presence, and privacy settings.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IUsersClient {
  // Throwing methods (throw ApiException on error)

  /**
   * Gets the profile of a user by phone number.
   * @param phone The phone number of the user
   * @returns Promise that resolves to the user information
   * @throws {ApiException} When the request fails
   */
  getUserProfileAsync(phone: string): Promise<UserInfo>;

  /**
   * Checks whether a phone number is registered on WhatsApp.
   * @param phone The phone number to check
   * @returns Promise that resolves to an object indicating WhatsApp registration status
   * @throws {ApiException} When the request fails
   */
  checkUserAsync(phone: string): Promise<{ isInWhatsApp: boolean }>;

  /**
   * Gets the profile of the authenticated user.
   * @returns Promise that resolves to the authenticated user's profile
   * @throws {ApiException} When the request fails
   */
  getMyProfileAsync(): Promise<UserMeInfo>;

  /**
   * Updates the profile of the authenticated user.
   * @param request The profile update request
   * @throws {ApiException} When the request fails
   */
  updateMyProfileAsync(request: UpdateProfileRequest): Promise<void>;

  /**
   * Sets the presence of the authenticated user.
   * @param request The presence update request
   * @throws {ApiException} When the request fails
   */
  setPresenceAsync(request: SetMyPresenceRequest): Promise<void>;

  /**
   * Gets the privacy settings of the authenticated user.
   * @returns Promise that resolves to the privacy settings
   * @throws {ApiException} When the request fails
   */
  getPrivacySettingsAsync(): Promise<PrivacySettingsResponse>;

  /**
   * Sets the privacy settings of the authenticated user.
   * @param request The privacy settings update request
   * @returns Promise that resolves to the updated privacy settings
   * @throws {ApiException} When the request fails
   */
  setPrivacySettingAsync(request: SetPrivacyRequest): Promise<PrivacySettingsResponse>;

  /**
   * Checks whether multiple phone numbers are registered on WhatsApp.
   * @param request The bulk check request containing phone numbers
   * @returns Promise that resolves to an array of bulk check results
   * @throws {ApiException} When the request fails
   */
  bulkCheckAsync(request: BulkCheckRequest): Promise<BulkCheckResult[]>;

  // Non-throwing methods (return ApiResponse with success/error info)

  /**
   * Gets the profile of a user by phone number with error handling.
   * @param phone The phone number of the user
   * @returns Promise that resolves to an ApiResponse containing the user information or error details
   */
  tryGetUserProfileAsync(phone: string): Promise<ApiResponse<UserInfo>>;

  /**
   * Checks whether a phone number is registered on WhatsApp with error handling.
   * @param phone The phone number to check
   * @returns Promise that resolves to an ApiResponse containing the registration status or error details
   */
  tryCheckUserAsync(phone: string): Promise<ApiResponse<{ isInWhatsApp: boolean }>>;

  /**
   * Gets the profile of the authenticated user with error handling.
   * @returns Promise that resolves to an ApiResponse containing the profile or error details
   */
  tryGetMyProfileAsync(): Promise<ApiResponse<UserMeInfo>>;

  /**
   * Updates the profile of the authenticated user with error handling.
   * @param request The profile update request
   * @returns Promise that resolves to an ApiResponse indicating success or error details
   */
  tryUpdateMyProfileAsync(request: UpdateProfileRequest): Promise<ApiResponse<void>>;

  /**
   * Sets the presence of the authenticated user with error handling.
   * @param request The presence update request
   * @returns Promise that resolves to an ApiResponse indicating success or error details
   */
  trySetPresenceAsync(request: SetMyPresenceRequest): Promise<ApiResponse<void>>;

  /**
   * Gets the privacy settings of the authenticated user with error handling.
   * @returns Promise that resolves to an ApiResponse containing the privacy settings or error details
   */
  tryGetPrivacySettingsAsync(): Promise<ApiResponse<PrivacySettingsResponse>>;

  /**
   * Sets the privacy settings of the authenticated user with error handling.
   * @param request The privacy settings update request
   * @returns Promise that resolves to an ApiResponse containing the updated privacy settings or error details
   */
  trySetPrivacySettingAsync(request: SetPrivacyRequest): Promise<ApiResponse<PrivacySettingsResponse>>;

  /**
   * Checks whether multiple phone numbers are registered on WhatsApp with error handling.
   * @param request The bulk check request containing phone numbers
   * @returns Promise that resolves to an ApiResponse containing the bulk check results or error details
   */
  tryBulkCheckAsync(request: BulkCheckRequest): Promise<ApiResponse<BulkCheckResult[]>>;
}
