import { Identity } from './Identity.js';

export interface UserInfo extends Identity {
  isInWhatsApp?: boolean;
  status?: string;
  pictureId?: string;
  pictureUrl?: string;
  isVerified?: boolean;
}
