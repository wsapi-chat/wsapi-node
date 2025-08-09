import type { HttpClient } from './HttpClient.js';
import type { IUsersClient } from './IUsersClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { UserInfo } from '../Models/index.js';

/**
 * Client for the Users API.
 * Provides methods to retrieve user information.
 */
export class UsersClient implements IUsersClient {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Gets user information by phone number.
   * @param phoneNumber The phone number to get user info for
   * @returns Promise that resolves to the user information
   * @throws {ApiException} When the request fails
   */
  async getAsync(phoneNumber: string): Promise<UserInfo> {
    return await this.httpClient.get<UserInfo>(`/users/${phoneNumber}`);
  }

  /**
   * Gets user information by phone number with error handling.
   * @param phoneNumber The phone number to get user info for
   * @returns Promise that resolves to an ApiResponse containing the user information or error details
   */
  async tryGetAsync(phoneNumber: string): Promise<ApiResponse<UserInfo>> {
    return await this.httpClient.tryGet<UserInfo>(`/users/${phoneNumber}`);
  }
}
