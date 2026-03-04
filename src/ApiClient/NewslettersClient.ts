import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { INewslettersClient } from './INewslettersClient.js';
import type { NewsletterInfo } from '../Models/Entities/Newsletters/index.js';
import type { CreateNewsletterRequest } from '../Models/Requests/Newsletters/index.js';

/**
 * WhatsApp newsletters API client implementation.
 * Provides methods for managing newsletters and subscriptions.
 */
export class NewslettersClient implements INewslettersClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  async listNewslettersAsync(): Promise<NewsletterInfo[]> {
    return await this.httpClient.get<NewsletterInfo[]>('/newsletters');
  }

  async createNewsletterAsync(request: CreateNewsletterRequest): Promise<NewsletterInfo> {
    return await this.httpClient.post<NewsletterInfo>('/newsletters', request);
  }

  async getNewsletterByInviteCodeAsync(code: string): Promise<NewsletterInfo> {
    return await this.httpClient.get<NewsletterInfo>(`/newsletters/invite/${code}`);
  }

  async getNewsletterAsync(id: string): Promise<NewsletterInfo> {
    return await this.httpClient.get<NewsletterInfo>(`/newsletters/${id}`);
  }

  async toggleSubscriptionAsync(id: string, subscribed: boolean): Promise<void> {
    await this.httpClient.putVoid(`/newsletters/${id}/subscription`, { subscribed });
  }

  async toggleMuteAsync(id: string, mute: boolean): Promise<void> {
    await this.httpClient.putVoid(`/newsletters/${id}/mute`, { mute });
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListNewslettersAsync(): Promise<ApiResponse<NewsletterInfo[]>> {
    return await this.httpClient.tryGet<NewsletterInfo[]>('/newsletters');
  }

  async tryCreateNewsletterAsync(request: CreateNewsletterRequest): Promise<ApiResponse<NewsletterInfo>> {
    return await this.httpClient.tryPost<NewsletterInfo>('/newsletters', request);
  }

  async tryGetNewsletterByInviteCodeAsync(code: string): Promise<ApiResponse<NewsletterInfo>> {
    return await this.httpClient.tryGet<NewsletterInfo>(`/newsletters/invite/${code}`);
  }

  async tryGetNewsletterAsync(id: string): Promise<ApiResponse<NewsletterInfo>> {
    return await this.httpClient.tryGet<NewsletterInfo>(`/newsletters/${id}`);
  }

  async tryToggleSubscriptionAsync(id: string, subscribed: boolean): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/newsletters/${id}/subscription`, { subscribed });
  }

  async tryToggleMuteAsync(id: string, mute: boolean): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/newsletters/${id}/mute`, { mute });
  }
}
