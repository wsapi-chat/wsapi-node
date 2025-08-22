/**
 * Extended text information for rich text messages
 */
export interface MessageExtendedText {
  /**
   * Matched text content
   */
  matchedText?: string | null;

  /**
   * Description of the link/content
   */
  description?: string | null;

  /**
   * Title of the link/content
   */
  title?: string | null;

  /**
   * Base64 encoded JPEG thumbnail
   */
  jpegThumbnail?: string | null;
}