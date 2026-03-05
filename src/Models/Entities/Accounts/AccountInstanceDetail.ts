import { AccountInstanceSettings } from './AccountInstanceSettings.js';

export interface AccountInstanceDetail {
  name?: string;
  hasApiKey?: boolean;
  settings?: AccountInstanceSettings;
  status?: string;
  deviceId?: string | null;
  created?: string;
}
