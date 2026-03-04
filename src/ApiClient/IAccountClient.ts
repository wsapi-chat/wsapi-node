import type { ApiResponse } from './ApiResponse.js';
import type {
  AccountInstance,
  AccountInstanceDetail,
  AccountInstanceSettings,
  AccountSubscription,
  AccountSubscriptionChange,
  AccountInstanceDefaults,
  PagedResponse,
} from '../Models/Entities/Accounts/index.js';
import type { UpdateInstanceNameRequest } from '../Models/Requests/Account/index.js';

/**
 * Interface for the Account API client.
 * Provides gateway-level instance and subscription management operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IAccountClient {
  // Throwing methods (throw ApiException on error)

  listInstancesAsync(pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<PagedResponse<AccountInstance>>;
  getInstanceAsync(id: string): Promise<AccountInstanceDetail>;
  updateInstanceNameAsync(id: string, request: UpdateInstanceNameRequest): Promise<void>;
  updateInstanceSettingsAsync(id: string, settings: AccountInstanceSettings): Promise<void>;
  regenerateInstanceApiKeyAsync(id: string): Promise<string>;
  restartInstanceAsync(id: string): Promise<void>;

  listSubscriptionsAsync(pageNumber?: number, pageSize?: number): Promise<PagedResponse<AccountSubscription>>;
  listSubscriptionInstancesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<PagedResponse<AccountInstance>>;
  createSubscriptionInstanceAsync(subscriptionId: string): Promise<string>;
  deleteSubscriptionInstanceAsync(subscriptionId: string, instanceId: string): Promise<void>;
  listSubscriptionChangesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, timestampFrom?: string, timestampTo?: string, changeType?: string, instanceId?: string): Promise<PagedResponse<AccountSubscriptionChange>>;

  getInstanceDefaultsAsync(): Promise<AccountInstanceDefaults>;
  updateInstanceDefaultsAsync(defaults: AccountInstanceDefaults): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)

  tryListInstancesAsync(pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<ApiResponse<PagedResponse<AccountInstance>>>;
  tryGetInstanceAsync(id: string): Promise<ApiResponse<AccountInstanceDetail>>;
  tryUpdateInstanceNameAsync(id: string, request: UpdateInstanceNameRequest): Promise<ApiResponse<void>>;
  tryUpdateInstanceSettingsAsync(id: string, settings: AccountInstanceSettings): Promise<ApiResponse<void>>;
  tryRegenerateInstanceApiKeyAsync(id: string): Promise<ApiResponse<string>>;
  tryRestartInstanceAsync(id: string): Promise<ApiResponse<void>>;

  tryListSubscriptionsAsync(pageNumber?: number, pageSize?: number): Promise<ApiResponse<PagedResponse<AccountSubscription>>>;
  tryListSubscriptionInstancesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<ApiResponse<PagedResponse<AccountInstance>>>;
  tryCreateSubscriptionInstanceAsync(subscriptionId: string): Promise<ApiResponse<string>>;
  tryDeleteSubscriptionInstanceAsync(subscriptionId: string, instanceId: string): Promise<ApiResponse<void>>;
  tryListSubscriptionChangesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, timestampFrom?: string, timestampTo?: string, changeType?: string, instanceId?: string): Promise<ApiResponse<PagedResponse<AccountSubscriptionChange>>>;

  tryGetInstanceDefaultsAsync(): Promise<ApiResponse<AccountInstanceDefaults>>;
  tryUpdateInstanceDefaultsAsync(defaults: AccountInstanceDefaults): Promise<ApiResponse<void>>;
}
