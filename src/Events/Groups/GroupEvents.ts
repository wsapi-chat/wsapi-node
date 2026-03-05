import { BaseEvent } from '../BaseEvent';
import { Sender } from '../../Models/Entities/Users/Sender';
import { Identity } from '../../Models/Entities/Users/Identity.js';

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

  /** Array of members who joined the group */
  join?: Identity[];

  /** Array of members who left the group */
  leave?: Identity[];

  /** Group name change */
  name?: { name: string };

  /** Group lock state change */
  locked?: { isLocked: boolean };

  /** Group announce state change */
  announce?: { isAnnounce: boolean };

  /** Members promoted to admin */
  promote?: Identity[];

  /** Members demoted from admin */
  demote?: Identity[];

  /** Group link information */
  link?: { type: string; groupId: string; groupName?: string; isAnnouncementGroup?: boolean };

  /** Group unlink information */
  unlink?: { type?: string; reason?: string; groupId?: string };

  /** Membership approval requirement */
  membershipApproval?: { isRequired: boolean };

  /** Group deletion information */
  delete?: { reason?: string };

  /** Whether the group is suspended */
  suspended?: boolean | null;

  /** Whether this is a community */
  isCommunity?: boolean;

  /** Community ID this group belongs to */
  communityId?: string;

  /** Whether this is an announcement group */
  isAnnouncementGroup?: boolean;

  /** Reason why a member joined */
  joinReason?: string;

  /** Group type */
  groupType?: string;
}
