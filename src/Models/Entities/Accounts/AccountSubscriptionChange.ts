export interface AccountSubscriptionChange {
  id: string;
  timestamp?: string;
  subscriptionId?: string;
  changeType?: string;
  previousQuantity?: number | null;
  newQuantity?: number | null;
  instanceId?: string | null;
  proratedAmount?: number | null;
  notes?: string | null;
}
