export interface AccountInstanceDefaults {
  defaultWebhookUrl?: string | null;
  defaultSigningSecret?: string | null;
  defaultEventFilters?: string[] | null;
  defaultHistorySync?: boolean;
  defaultPullMode?: boolean;
}
