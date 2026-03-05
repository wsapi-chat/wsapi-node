import type { HttpClient } from './HttpClient.js';
import type { IMediaClient } from './IMediaClient.js';
import type { ApiResponse } from './ApiResponse.js';

/**
 * Client for the Media API.
 * Provides methods to download media files.
 */
export class MediaClient implements IMediaClient {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Downloads media from WhatsApp servers.
   * @param mediaId The ID of the media to download
   * @returns Promise that resolves to the media file bytes
   * @throws {ApiException} When the request fails
   */
  async downloadAsync(mediaId: string): Promise<ArrayBuffer> {
    return await this.httpClient.getBinary(`/media/download?id=${encodeURIComponent(mediaId)}`);
  }

  /**
   * Downloads media from WhatsApp servers with error handling.
   * @param mediaId The ID of the media to download
   * @returns Promise that resolves to an ApiResponse containing the media bytes or error details
   */
  async tryDownloadAsync(mediaId: string): Promise<ApiResponse<ArrayBuffer>> {
    return await this.httpClient.tryGetBinary(`/media/download?id=${encodeURIComponent(mediaId)}`);
  }
}
