/**
 * Request to create a new group
 */
export interface GroupCreateRequest {
  /**
   * The name of the group.
   */
  name: string;

  /**
   * Initial participant JIDs in WhatsApp format (e.g., 1234567890@s.whatsapp.net).
   * Omit or pass an empty array to create a group with only the paired account.
   */
  participants?: string[];
}
