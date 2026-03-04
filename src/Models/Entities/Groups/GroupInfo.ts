import { Identity } from '../Users/Identity.js';
import { GroupParticipantInfo } from './GroupParticipantInfo.js';

export interface GroupInfo {
    groupId: string;
    owner?: Identity;
    name?: string;
    createdAt?: string;
    description?: string;
    isAnnounce?: boolean;
    isLocked?: boolean;
    isEphemeral?: boolean;
    ephemeralExpiration?: number;
    participants?: GroupParticipantInfo[];
    communityId?: string;
    isAnnouncementGroup?: boolean;
    isJoinApprovalRequired?: boolean;
    memberAddMode?: string;
}
