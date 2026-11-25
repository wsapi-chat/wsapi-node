import { Identity } from './Identity.js';

export interface UserInfo extends Identity {
  isInWhatsApp?: boolean;
  status?: string;
  pictureId?: string;
  pictureUrl?: string;
  /** Whether the account is a verified WhatsApp Business account */
  isVerified?: boolean;
  /** Verified business name (omitted unless the account is a verified business) */
  verifiedName?: string;
}
