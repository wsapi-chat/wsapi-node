/**
 * Media information for a message
 */
export interface MessageMedia {
  /**
   * The type of media (image, video, audio, etc.).
   */
  mediaType: string;

  /**
   * The URL where the media can be accessed.
   */
  url: string;

  /**
   * The MIME type of the media file.
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
   * The media key for decryption.
   */
  mediaKey?: string;

  /**
   * Caption text for the media.
   */
  caption?: string;

  /**
   * Height of the media (for images/videos).
   */
  height: number;

  /**
   * Width of the media (for images/videos).
   */
  width: number;

  /**
   * JPEG thumbnail as base64 string.
   */
  jpegThumbnail?: string;

  /**
   * Direct path to the media file.
   */
  directPath?: string;

  /**
   * Duration of the media (for audio/video) in seconds.
   */
  duration: number;

  /**
   * Number of pages (for documents).
   */
  pageCount: number;

  /**
   * Title or filename of the media.
   */
  title?: string;
}
