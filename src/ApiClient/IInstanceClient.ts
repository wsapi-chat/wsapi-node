import type { ApiResponse } from './ApiResponse.js';
import type { InstanceSettings } from '../Models/index.js';

/**
 * Interface for the Instance API client.
 * Provides methods to manage instance settings and operations.
 */
export interface IInstanceClient {
  /**
   * Gets the current instance settings.
   * @returns Promise that resolves to the instance settings
   * @throws {ApiException} When the request fails
   */
  getSettingsAsync(): Promise<InstanceSettings>;

  /**
   * Updates the instance settings.
   * @param settings The new instance settings
   * @returns Promise that resolves when the settings are updated
   * @throws {ApiException} When the request fails
   */
  updateSettingsAsync(settings: InstanceSettings): Promise<void>;

  /**
   * Restarts the instance.
   * @returns Promise that resolves when the instance is restarted
   * @throws {ApiException} When the request fails
   */
  restartAsync(): Promise<void>;

  /**
   * Updates the API key for the instance.
   * @returns Promise that resolves to the new API key
   * @throws {ApiException} When the request fails
   */
  updateApiKeyAsync(): Promise<string>;

  /**
   * Gets the current instance settings with error handling.
   * @returns Promise that resolves to an ApiResponse containing the instance settings or error details
   */
  tryGetSettingsAsync(): Promise<ApiResponse<InstanceSettings>>;

  /**
   * Updates the instance settings with error handling.
   * @param settings The new instance settings
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  tryUpdateSettingsAsync(settings: InstanceSettings): Promise<ApiResponse<void>>;

  /**
   * Restarts the instance with error handling.
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  tryRestartAsync(): Promise<ApiResponse<void>>;

  /**
   * Updates the API key for the instance with error handling.
   * @returns Promise that resolves to an ApiResponse containing the new API key or error details
   */
  tryUpdateApiKeyAsync(): Promise<ApiResponse<string>>;
}
