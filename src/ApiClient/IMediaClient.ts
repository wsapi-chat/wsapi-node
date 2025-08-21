import type { ApiResponse } from './ApiResponse.js';

/**
 * Interface for the Media API client.
 * Provides methods to download media files.
 */
export interface IMediaClient {
  /**
   * Downloads media from WhatsApp servers.
   * @param mediaId The ID of the media to download
   * @returns Promise that resolves to the media file bytes
   * @throws {ApiException} When the request fails
   */
  downloadAsync(mediaId: string): Promise<ArrayBuffer>;

  /**
   * Downloads media from WhatsApp servers with error handling.
   * @param mediaId The ID of the media to download
   * @returns Promise that resolves to an ApiResponse containing the media bytes or error details
   */
  tryDownloadAsync(mediaId: string): Promise<ApiResponse<ArrayBuffer>>;
}
