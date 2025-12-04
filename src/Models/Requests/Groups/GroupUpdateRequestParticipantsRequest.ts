/**
 * Request to update group participants
 */
export interface GroupUpdateRequestParticipantsRequest {
  /**
   * Array of participant phone numbers in WhatsApp format.
   */
  participants: string[];
}
