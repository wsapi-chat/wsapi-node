import { GroupUpdateRequestParticipantAction } from '../../Constants/GroupUpdateRequestParticipantActions.js';

/**
 * Request to update group participants
 */
export interface GroupUpdateRequestParticipantsRequest {
  /**
   * Array of participant phone numbers in WhatsApp format.
   */
  participants: string[];

  /**
   * The action to perform on the participants.
   */
  action: GroupUpdateRequestParticipantAction;
}
