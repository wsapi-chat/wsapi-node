import { BaseEvent } from '../BaseEvent';
import { Sender } from '../../Models/Entities/Users/Sender';

/**
 * Group description change data
 */
export interface GroupDescriptionChange {
  /** The new group description/topic */
  topic: string;
}

/**
 * Event fired when group updates occur (topic change, members join/leave)
 */
export interface GroupEvent extends BaseEvent {
  eventType: 'group';

  /** Group chat ID */
  id: string;

  /** Sender who triggered the change */
  sender?: Sender;

  /** Description change (present when description/topic changes) */
  description?: GroupDescriptionChange;

  /** When the change occurred */
  timestamp?: string;

  /** Array of JIDs of members who joined the group */
  join?: string[];

  /** Array of JIDs of members who left the group */
  leave?: string[];
}
