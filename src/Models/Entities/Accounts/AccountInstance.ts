export interface AccountInstance {
    id: string;
    created?: string;
    name?: string;
    useCustomDefaults?: boolean;
    status?: string;
    deviceId?: string | null;
    expiredAt?: string | null;
    trialEndsAt?: string | null;
    isInTrial?: boolean;
    hasApiKey?: boolean;
}
