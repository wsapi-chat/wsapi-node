/**
 * Request to update a group's picture
 */
export interface GroupUpdatePictureRequest {
  /**
   * Base64 encoded picture data for the group.
   */
  /** @deprecated Use data. */
  pictureBase64?: string;
  data?: string;
}
