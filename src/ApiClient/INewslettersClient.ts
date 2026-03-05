import type { ApiResponse } from './ApiResponse.js';
import type { NewsletterInfo } from '../Models/Entities/Newsletters/index.js';
import type { CreateNewsletterRequest } from '../Models/Requests/Newsletters/index.js';

/**
 * Interface for WhatsApp newsletters API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface INewslettersClient {
  // Throwing methods (throw ApiException on error)

  /** List all newsletters */
  listNewslettersAsync(): Promise<NewsletterInfo[]>;

  /** Create a new newsletter */
  createNewsletterAsync(request: CreateNewsletterRequest): Promise<NewsletterInfo>;

  /** Get newsletter info by invite code */
  getNewsletterByInviteCodeAsync(code: string): Promise<NewsletterInfo>;

  /** Get newsletter information */
  getNewsletterAsync(id: string): Promise<NewsletterInfo>;

  /** Toggle newsletter subscription */
  toggleSubscriptionAsync(id: string, subscribed: boolean): Promise<void>;

  /** Toggle newsletter mute */
  toggleMuteAsync(id: string, mute: boolean): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)

  tryListNewslettersAsync(): Promise<ApiResponse<NewsletterInfo[]>>;
  tryCreateNewsletterAsync(request: CreateNewsletterRequest): Promise<ApiResponse<NewsletterInfo>>;
  tryGetNewsletterByInviteCodeAsync(code: string): Promise<ApiResponse<NewsletterInfo>>;
  tryGetNewsletterAsync(id: string): Promise<ApiResponse<NewsletterInfo>>;
  tryToggleSubscriptionAsync(id: string, subscribed: boolean): Promise<ApiResponse>;
  tryToggleMuteAsync(id: string, mute: boolean): Promise<ApiResponse>;
}
