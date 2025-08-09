/**
 * Request to download media from a message
 */
export interface MediaDownloadRequest {
  /**
   * The type of media.
   */
  mediaType: string;

  /**
   * The URL of the media.
   */
  url: string;

  /**
   * The direct path to the media.
   */
  directPath?: string;

  /**
   * The media key for decryption.
   */
  mediaKey?: string;

  /**
   * The MIME type of the media.
   */
  mimeType?: string;

  /**
   * The length of the file in bytes.
   */
  fileLength: number;

  /**
   * SHA256 hash of the file.
   */
  fileSHA256?: string;

  /**
   * SHA256 hash of the encrypted file.
   */
  fileEncSHA256?: string;

  /**
   * The name of the file.
   */
  fileName?: string;
}
