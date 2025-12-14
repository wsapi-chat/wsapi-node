/**
 * Request to set group locked mode.
 * When enabled, only admins can edit group info (name, description, picture).
 */
export interface GroupSetLockedRequest {
  /**
   * Whether to lock group settings (only admins can edit group info).
   */
  locked: boolean;
}
