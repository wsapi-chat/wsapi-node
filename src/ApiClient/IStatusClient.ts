import type { ApiResponse } from './ApiResponse.js';
import type { StatusPrivacyResponse } from '../Models/Entities/Status/index.js';
import type { MessageCreated } from '../Models/Entities/Messages/index.js';
import type { PostTextStatusRequest, PostMediaStatusRequest } from '../Models/Requests/Status/index.js';

/**
 * Interface for WhatsApp status API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IStatusClient {
  // Throwing methods (throw ApiException on error)

  /** Get status privacy settings */
  getPrivacyAsync(): Promise<StatusPrivacyResponse>;

  /** Post a text status */
  postTextAsync(request: PostTextStatusRequest): Promise<MessageCreated>;

  /** Post an image status */
  postImageAsync(request: PostMediaStatusRequest): Promise<MessageCreated>;

  /** Post a video status */
  postVideoAsync(request: PostMediaStatusRequest): Promise<MessageCreated>;

  /** Delete a status message */
  deleteAsync(messageId: string, chatId: string, senderId: string): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)

  tryGetPrivacyAsync(): Promise<ApiResponse<StatusPrivacyResponse>>;
  tryPostTextAsync(request: PostTextStatusRequest): Promise<ApiResponse<MessageCreated>>;
  tryPostImageAsync(request: PostMediaStatusRequest): Promise<ApiResponse<MessageCreated>>;
  tryPostVideoAsync(request: PostMediaStatusRequest): Promise<ApiResponse<MessageCreated>>;
  tryDeleteAsync(messageId: string, chatId: string, senderId: string): Promise<ApiResponse>;
}
