/**
 * Request for group participant operations
 */
export interface GroupParticipantRequest {
  /**
   * The user ID of the participant.
   */
  userId: string;

  /**
   * The timestamp when the request was made.
   */
  requestedAt: Date;
}
