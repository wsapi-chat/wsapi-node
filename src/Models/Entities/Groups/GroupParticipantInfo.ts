import { Identity } from '../Users/Identity.js';

export interface GroupParticipantInfo extends Identity {
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
    displayName?: string;
}
