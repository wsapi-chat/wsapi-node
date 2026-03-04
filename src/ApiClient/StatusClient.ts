import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IStatusClient } from './IStatusClient.js';
import type { StatusPrivacyResponse } from '../Models/Entities/Status/index.js';
import type { MessageCreated } from '../Models/Entities/Messages/index.js';
import type { PostTextStatusRequest, PostMediaStatusRequest } from '../Models/Requests/Status/index.js';

/**
 * WhatsApp status API client implementation.
 * Provides methods for posting and managing WhatsApp status updates.
 */
export class StatusClient implements IStatusClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  async getPrivacyAsync(): Promise<StatusPrivacyResponse> {
    return await this.httpClient.get<StatusPrivacyResponse>('/status/privacy');
  }

  async postTextAsync(request: PostTextStatusRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('/status/text', request);
  }

  async postImageAsync(request: PostMediaStatusRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('/status/image', request);
  }

  async postVideoAsync(request: PostMediaStatusRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('/status/video', request);
  }

  async deleteAsync(messageId: string, chatId: string, senderId: string): Promise<void> {
    await this.httpClient.postVoid(`/status/${messageId}/delete`, { chatId, senderId });
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryGetPrivacyAsync(): Promise<ApiResponse<StatusPrivacyResponse>> {
    return await this.httpClient.tryGet<StatusPrivacyResponse>('/status/privacy');
  }

  async tryPostTextAsync(request: PostTextStatusRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('/status/text', request);
  }

  async tryPostImageAsync(request: PostMediaStatusRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('/status/image', request);
  }

  async tryPostVideoAsync(request: PostMediaStatusRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('/status/video', request);
  }

  async tryDeleteAsync(messageId: string, chatId: string, senderId: string): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`/status/${messageId}/delete`, { chatId, senderId });
  }
}
