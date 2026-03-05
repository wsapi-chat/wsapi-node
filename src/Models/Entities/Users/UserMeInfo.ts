import { Identity } from './Identity.js';

export interface UserMeInfo extends Identity {
  deviceId?: number;
  pushName?: string;
  businessName?: string;
  status?: string;
  pictureId?: string;
  isVerified?: boolean;
}
