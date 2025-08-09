/**
 * Request to create a new group
 */
export interface GroupCreateRequest {
  /**
   * The name of the group.
   */
  name: string;

  /**
   * Array of participant phone numbers in WhatsApp format (e.g., 1234567890@s.whatsapp.net).
   */
  participants: string[];
}
