import type { HttpClient } from './HttpClient.js';
import type { IInstanceClient } from './IInstanceClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { InstanceSettings } from '../Models/index.js';

/**
 * Client for the Instance API.
 * Provides methods to manage instance settings and operations.
 */
export class InstanceClient implements IInstanceClient {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Gets the current instance settings.
   * @returns Promise that resolves to the instance settings
   * @throws {ApiException} When the request fails
   */
  async getSettingsAsync(): Promise<InstanceSettings> {
    return await this.httpClient.get<InstanceSettings>('/instance/settings');
  }

  /**
   * Updates the instance settings.
   * @param settings The new instance settings
   * @returns Promise that resolves when the settings are updated
   * @throws {ApiException} When the request fails
   */
  async updateSettingsAsync(settings: InstanceSettings): Promise<void> {
    await this.httpClient.putVoid('/instance/settings', settings);
  }

  /**
   * Restarts the instance.
   * @returns Promise that resolves when the instance is restarted
   * @throws {ApiException} When the request fails
   */
  async restartAsync(): Promise<void> {
    await this.httpClient.putVoid('/instance/restart');
  }

  /**
   * Updates the API key for the instance.
   * @returns Promise that resolves to the new API key
   * @throws {ApiException} When the request fails
   */
  async updateApiKeyAsync(): Promise<string> {
    return await this.httpClient.put<string>('/instance/apikey');
  }

  /**
   * Gets the current instance settings with error handling.
   * @returns Promise that resolves to an ApiResponse containing the instance settings or error details
   */
  async tryGetSettingsAsync(): Promise<ApiResponse<InstanceSettings>> {
    return await this.httpClient.tryGet<InstanceSettings>('/instance/settings');
  }

  /**
   * Updates the instance settings with error handling.
   * @param settings The new instance settings
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  async tryUpdateSettingsAsync(settings: InstanceSettings): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid('/instance/settings', settings);
  }

  /**
   * Restarts the instance with error handling.
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  async tryRestartAsync(): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid('/instance/restart');
  }

  /**
   * Updates the API key for the instance with error handling.
   * @returns Promise that resolves to an ApiResponse containing the new API key or error details
   */
  async tryUpdateApiKeyAsync(): Promise<ApiResponse<string>> {
    return await this.httpClient.tryPut<string>('/instance/apikey');
  }
}
