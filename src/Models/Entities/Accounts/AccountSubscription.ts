export interface AccountSubscription {
  id: string;
  created?: string;
  curPeriodStart?: string;
  curPeriodEnd?: string;
  quantity?: number;
  plan?: string;
  price?: string;
  status?: string;
  cancelAtPeriodEnd?: boolean;
  instanceIds?: string[] | null;
}
