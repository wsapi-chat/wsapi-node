/**
 * Request to update a group's picture
 */
export interface GroupUpdatePictureRequest {
  /**
   * Base64 encoded picture data for the group.
   */
  pictureBase64: string;
}
