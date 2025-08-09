import type { HttpClient } from './HttpClient.js';
import type { IMediaClient } from './IMediaClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { MediaDownloadRequest } from '../Models/index.js';

/**
 * Client for the Media API.
 * Provides methods to download media files.
 */
export class MediaClient implements IMediaClient {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Downloads media from WhatsApp servers.
   * @param mediaDownloadRequest The media download request
   * @returns Promise that resolves to the media file bytes
   * @throws {ApiException} When the request fails
   */
  async downloadAsync(mediaDownloadRequest: MediaDownloadRequest): Promise<ArrayBuffer> {
    return await this.httpClient.postBinary('/media/download', mediaDownloadRequest);
  }

  /**
   * Downloads media from WhatsApp servers with error handling.
   * @param mediaDownloadRequest The media download request
   * @returns Promise that resolves to an ApiResponse containing the media bytes or error details
   */
  async tryDownloadAsync(mediaDownloadRequest: MediaDownloadRequest): Promise<ApiResponse<ArrayBuffer>> {
    return await this.httpClient.tryPostBinary('/media/download', mediaDownloadRequest);
  }
}
