import type { ApiResponse } from './ApiResponse.js';
import type { MediaDownloadRequest } from '../Models/index.js';

/**
 * Interface for the Media API client.
 * Provides methods to download media files.
 */
export interface IMediaClient {
  /**
   * Downloads media from WhatsApp servers.
   * @param mediaDownloadRequest The media download request
   * @returns Promise that resolves to the media file bytes
   * @throws {ApiException} When the request fails
   */
  downloadAsync(mediaDownloadRequest: MediaDownloadRequest): Promise<ArrayBuffer>;

  /**
   * Downloads media from WhatsApp servers with error handling.
   * @param mediaDownloadRequest The media download request
   * @returns Promise that resolves to an ApiResponse containing the media bytes or error details
   */
  tryDownloadAsync(mediaDownloadRequest: MediaDownloadRequest): Promise<ApiResponse<ArrayBuffer>>;
}
