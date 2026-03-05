export interface AccountInstanceSettings {
  useCustomDefaults?: boolean;
  pullMode?: boolean;
  webhookUrl?: string | null;
  eventSigningSecret?: string | null;
  historySync?: boolean;
  eventFilters?: string[] | null;
}
