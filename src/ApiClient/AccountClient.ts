import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IAccountClient } from './IAccountClient.js';
import type { AccountInfo } from '../Models/Entities/Accounts/AccountInfo.js';
import type {
  AccountUpdateNameRequest,
  AccountUpdateStatusRequest,
  AccountUpdatePictureRequest,
  AccountUpdatePresenceRequest,
  AccountUpdatePictureResponse,
} from '../Models/Requests/Account/index.js';

/**
 * WhatsApp account API client implementation.
 * Provides methods for managing account information, status, and settings.
 */
export class AccountClient implements IAccountClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)
  
  async getInfoAsync(): Promise<AccountInfo> {
    return await this.httpClient.get<AccountInfo>('/account/info');
  }

  async updateNameAsync(request: AccountUpdateNameRequest): Promise<void> {
    await this.httpClient.putVoid('/account/name', request);
  }

  async updateStatusAsync(request: AccountUpdateStatusRequest): Promise<void> {
    await this.httpClient.putVoid('/account/status', request);
  }

  async updatePictureAsync(request: AccountUpdatePictureRequest): Promise<AccountUpdatePictureResponse> {
    return await this.httpClient.post<AccountUpdatePictureResponse>('/account/picture', request);
  }

  async updatePresenceAsync(request: AccountUpdatePresenceRequest): Promise<void> {
    await this.httpClient.putVoid('/account/presence', request);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryGetInfoAsync(): Promise<ApiResponse<AccountInfo>> {
    return await this.httpClient.tryGet<AccountInfo>('/account/info');
  }

  async tryUpdateNameAsync(request: AccountUpdateNameRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid('/account/name', request);
  }

  async tryUpdateStatusAsync(request: AccountUpdateStatusRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid('/account/status', request);
  }

  async tryUpdatePictureAsync(request: AccountUpdatePictureRequest): Promise<ApiResponse<AccountUpdatePictureResponse>> {
    return await this.httpClient.tryPost<AccountUpdatePictureResponse>('/account/picture', request);
  }

  async tryUpdatePresenceAsync(request: AccountUpdatePresenceRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid('/account/presence', request);
  }
}
