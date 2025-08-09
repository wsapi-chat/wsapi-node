import type { ApiResponse } from './ApiResponse.js';
import type { AccountInfo } from '../Models/Entities/Accounts/AccountInfo.js';
import type {
  AccountUpdateNameRequest,
  AccountUpdateStatusRequest,
  AccountUpdatePictureRequest,
  AccountUpdatePresenceRequest,
  AccountUpdatePictureResponse,
} from '../Models/Requests/Account/index.js';

/**
 * Interface for WhatsApp account API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IAccountClient {
  // Throwing methods (throw ApiException on error)
  getInfoAsync(): Promise<AccountInfo>;
  updateNameAsync(request: AccountUpdateNameRequest): Promise<void>;
  updateStatusAsync(request: AccountUpdateStatusRequest): Promise<void>;
  updatePictureAsync(request: AccountUpdatePictureRequest): Promise<AccountUpdatePictureResponse>;
  updatePresenceAsync(request: AccountUpdatePresenceRequest): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)
  tryGetInfoAsync(): Promise<ApiResponse<AccountInfo>>;
  tryUpdateNameAsync(request: AccountUpdateNameRequest): Promise<ApiResponse>;
  tryUpdateStatusAsync(request: AccountUpdateStatusRequest): Promise<ApiResponse>;
  tryUpdatePictureAsync(request: AccountUpdatePictureRequest): Promise<ApiResponse<AccountUpdatePictureResponse>>;
  tryUpdatePresenceAsync(request: AccountUpdatePresenceRequest): Promise<ApiResponse>;
}
