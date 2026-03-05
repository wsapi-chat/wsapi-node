export interface CreateCommunityRequest {
  name: string;
  participants?: string[];
  approvalMode?: string;
}
