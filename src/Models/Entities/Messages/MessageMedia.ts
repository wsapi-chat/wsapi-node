/**
 * Media information for a message
 */
export interface MessageMedia {
  /**
   * The media ID that should be used to download the binary content
   */
  id: string;

  /**
 * The type of media (image, video, audio, etc.).
 */
  mediaType: string;

  /**
   * The MIME type of the media file.
   */
  mimeType?: string;

  /**
   * The length of the file in bytes.
   */
  fileLength: number;

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
