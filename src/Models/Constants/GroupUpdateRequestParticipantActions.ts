export const GroupUpdateRequestParticipantActions = {
  ADD: 'add',
  REMOVE: 'remove',
  UPDATE: 'update',
  PROMOTE: 'promote',
  DEMOTE: 'demote'
} as const;

export type GroupUpdateRequestParticipantAction = typeof GroupUpdateRequestParticipantActions[keyof typeof GroupUpdateRequestParticipantActions];
