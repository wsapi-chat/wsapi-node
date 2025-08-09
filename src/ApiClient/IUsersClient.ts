import type { ApiResponse } from './ApiResponse.js';
import type { UserInfo } from '../Models/index.js';

/**
 * Interface for the Users API client.
 * Provides methods to retrieve user information.
 */
export interface IUsersClient {
  /**
   * Gets user information by phone number.
   * @param phoneNumber The phone number to get user info for
   * @returns Promise that resolves to the user information
   * @throws {ApiException} When the request fails
   */
  getAsync(phoneNumber: string): Promise<UserInfo>;

  /**
   * Gets user information by phone number with error handling.
   * @param phoneNumber The phone number to get user info for
   * @returns Promise that resolves to an ApiResponse containing the user information or error details
   */
  tryGetAsync(phoneNumber: string): Promise<ApiResponse<UserInfo>>;
}
