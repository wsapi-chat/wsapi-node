import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IAccountClient } from './IAccountClient.js';
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
 * Account API client implementation.
 * Provides gateway-level instance and subscription management operations.
 */
export class AccountClient implements IAccountClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  async listInstancesAsync(pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<PagedResponse<AccountInstance>> {
    const query = this.buildQuery({ pageNumber, pageSize, createdFrom, createdTo, status });
    return await this.httpClient.get<PagedResponse<AccountInstance>>(`/account/instances${query}`);
  }

  async getInstanceAsync(id: string): Promise<AccountInstanceDetail> {
    return await this.httpClient.get<AccountInstanceDetail>(`/account/instances/${id}`);
  }

  async updateInstanceNameAsync(id: string, request: UpdateInstanceNameRequest): Promise<void> {
    await this.httpClient.putVoid(`/account/instances/${id}/name`, request);
  }

  async updateInstanceSettingsAsync(id: string, settings: AccountInstanceSettings): Promise<void> {
    await this.httpClient.putVoid(`/account/instances/${id}/settings`, settings);
  }

  async regenerateInstanceApiKeyAsync(id: string): Promise<string> {
    return await this.httpClient.put<string>(`/account/instances/${id}/apikey`);
  }

  async restartInstanceAsync(id: string): Promise<void> {
    await this.httpClient.putVoid(`/account/instances/${id}/restart`);
  }

  async listSubscriptionsAsync(pageNumber?: number, pageSize?: number): Promise<PagedResponse<AccountSubscription>> {
    const query = this.buildQuery({ pageNumber, pageSize });
    return await this.httpClient.get<PagedResponse<AccountSubscription>>(`/account/subscriptions${query}`);
  }

  async listSubscriptionInstancesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<PagedResponse<AccountInstance>> {
    const query = this.buildQuery({ pageNumber, pageSize, createdFrom, createdTo, status });
    return await this.httpClient.get<PagedResponse<AccountInstance>>(`/account/subscriptions/${subscriptionId}/instances${query}`);
  }

  async createSubscriptionInstanceAsync(subscriptionId: string): Promise<string> {
    return await this.httpClient.post<string>(`/account/subscriptions/${subscriptionId}/instances`);
  }

  async deleteSubscriptionInstanceAsync(subscriptionId: string, instanceId: string): Promise<void> {
    await this.httpClient.deleteVoid(`/account/subscriptions/${subscriptionId}/instances/${instanceId}`);
  }

  async listSubscriptionChangesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, timestampFrom?: string, timestampTo?: string, changeType?: string, instanceId?: string): Promise<PagedResponse<AccountSubscriptionChange>> {
    const query = this.buildQuery({ pageNumber, pageSize, timestampFrom, timestampTo, changeType, instanceId });
    return await this.httpClient.get<PagedResponse<AccountSubscriptionChange>>(`/account/subscriptions/${subscriptionId}/changes${query}`);
  }

  async getInstanceDefaultsAsync(): Promise<AccountInstanceDefaults> {
    return await this.httpClient.get<AccountInstanceDefaults>('/account/instances/defaults');
  }

  async updateInstanceDefaultsAsync(defaults: AccountInstanceDefaults): Promise<void> {
    await this.httpClient.putVoid('/account/instances/defaults', defaults);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListInstancesAsync(pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<ApiResponse<PagedResponse<AccountInstance>>> {
    const query = this.buildQuery({ pageNumber, pageSize, createdFrom, createdTo, status });
    return await this.httpClient.tryGet<PagedResponse<AccountInstance>>(`/account/instances${query}`);
  }

  async tryGetInstanceAsync(id: string): Promise<ApiResponse<AccountInstanceDetail>> {
    return await this.httpClient.tryGet<AccountInstanceDetail>(`/account/instances/${id}`);
  }

  async tryUpdateInstanceNameAsync(id: string, request: UpdateInstanceNameRequest): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid(`/account/instances/${id}/name`, request);
  }

  async tryUpdateInstanceSettingsAsync(id: string, settings: AccountInstanceSettings): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid(`/account/instances/${id}/settings`, settings);
  }

  async tryRegenerateInstanceApiKeyAsync(id: string): Promise<ApiResponse<string>> {
    return await this.httpClient.tryPut<string>(`/account/instances/${id}/apikey`);
  }

  async tryRestartInstanceAsync(id: string): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid(`/account/instances/${id}/restart`);
  }

  async tryListSubscriptionsAsync(pageNumber?: number, pageSize?: number): Promise<ApiResponse<PagedResponse<AccountSubscription>>> {
    const query = this.buildQuery({ pageNumber, pageSize });
    return await this.httpClient.tryGet<PagedResponse<AccountSubscription>>(`/account/subscriptions${query}`);
  }

  async tryListSubscriptionInstancesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, createdFrom?: string, createdTo?: string, status?: string): Promise<ApiResponse<PagedResponse<AccountInstance>>> {
    const query = this.buildQuery({ pageNumber, pageSize, createdFrom, createdTo, status });
    return await this.httpClient.tryGet<PagedResponse<AccountInstance>>(`/account/subscriptions/${subscriptionId}/instances${query}`);
  }

  async tryCreateSubscriptionInstanceAsync(subscriptionId: string): Promise<ApiResponse<string>> {
    return await this.httpClient.tryPost<string>(`/account/subscriptions/${subscriptionId}/instances`);
  }

  async tryDeleteSubscriptionInstanceAsync(subscriptionId: string, instanceId: string): Promise<ApiResponse<void>> {
    return await this.httpClient.tryDeleteVoid(`/account/subscriptions/${subscriptionId}/instances/${instanceId}`);
  }

  async tryListSubscriptionChangesAsync(subscriptionId: string, pageNumber?: number, pageSize?: number, timestampFrom?: string, timestampTo?: string, changeType?: string, instanceId?: string): Promise<ApiResponse<PagedResponse<AccountSubscriptionChange>>> {
    const query = this.buildQuery({ pageNumber, pageSize, timestampFrom, timestampTo, changeType, instanceId });
    return await this.httpClient.tryGet<PagedResponse<AccountSubscriptionChange>>(`/account/subscriptions/${subscriptionId}/changes${query}`);
  }

  async tryGetInstanceDefaultsAsync(): Promise<ApiResponse<AccountInstanceDefaults>> {
    return await this.httpClient.tryGet<AccountInstanceDefaults>('/account/instances/defaults');
  }

  async tryUpdateInstanceDefaultsAsync(defaults: AccountInstanceDefaults): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid('/account/instances/defaults', defaults);
  }

  private buildQuery(params: Record<string, string | number | undefined>): string {
    const parts: string[] = [];
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    }
    return parts.length > 0 ? `?${parts.join('&')}` : '';
  }
}
