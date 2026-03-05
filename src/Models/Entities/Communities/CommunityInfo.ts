import { Identity } from '../Users/Identity.js';
import { GroupParticipantInfo } from '../Groups/GroupParticipantInfo.js';

export interface CommunityInfo {
  communityId: string;
  owner?: Identity;
  name?: string;
  created?: string;
  description?: string;
  isLocked?: boolean;
  communityApprovalMode?: string;
  participants?: GroupParticipantInfo[];
}
