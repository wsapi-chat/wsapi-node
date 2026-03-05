import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IGroupsClient } from './IGroupsClient.js';
import type {
  GroupInfo,
  GroupCreated,
  GroupPictureUpdated,
  GroupInviteInfo,
  GroupInviteLinkResponse,
  GroupJoinRequestInfo,
  GroupJoinedResponse,
  GroupParticipantInfo,
} from '../Models/Entities/Groups/index.js';
import type {
  GroupCreateRequest,
  GroupUpdateDescriptionRequest,
  GroupUpdateNameRequest,
  GroupUpdatePictureRequest,
  GroupUpdateRequestParticipantsRequest,
  GroupSetAnnounceRequest,
  GroupSetLockedRequest,
  GroupSetJoinApprovalRequest,
  GroupSetMemberAddModeRequest,
  GroupJoinByLinkRequest,
  GroupJoinByInviteRequest,
  GroupApproveRejectRequest,
} from '../Models/Requests/Groups/index.js';

/**
 * WhatsApp groups API client implementation.
 * Provides methods for managing groups, participants, and group settings.
 */
export class GroupsClient implements IGroupsClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  async listAsync(): Promise<GroupInfo[]> {
    return await this.httpClient.get<GroupInfo[]>('/groups');
  }

  async getAsync(groupId: string): Promise<GroupInfo> {
    return await this.httpClient.get<GroupInfo>(`/groups/${groupId}`);
  }

  async createAsync(request: GroupCreateRequest): Promise<GroupCreated> {
    return await this.httpClient.post<GroupCreated>('/groups', request);
  }

  async leaveAsync(groupId: string): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/leave`);
  }

  async updateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/description`, request);
  }

  async updateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/name`, request);
  }

  async updatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<GroupPictureUpdated> {
    return await this.httpClient.post<GroupPictureUpdated>(`/groups/${groupId}/picture`, request);
  }

  async getInviteLinkAsync(groupId: string, reset?: boolean): Promise<GroupInviteLinkResponse> {
    const query = reset ? '?reset=1' : '';
    return await this.httpClient.get<GroupInviteLinkResponse>(`/groups/${groupId}/invite-link${query}`);
  }

  async setAnnounceAsync(groupId: string, request: GroupSetAnnounceRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/announce`, request);
  }

  async setLockedAsync(groupId: string, request: GroupSetLockedRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/locked`, request);
  }

  async setJoinApprovalAsync(groupId: string, request: GroupSetJoinApprovalRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/join-approval`, request);
  }

  async setMemberAddModeAsync(groupId: string, request: GroupSetMemberAddModeRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/member-add-mode`, request);
  }

  async joinByLinkAsync(request: GroupJoinByLinkRequest): Promise<GroupJoinedResponse> {
    return await this.httpClient.post<GroupJoinedResponse>('/groups/join/link', request);
  }

  async joinByInviteAsync(request: GroupJoinByInviteRequest): Promise<GroupJoinedResponse> {
    return await this.httpClient.post<GroupJoinedResponse>('/groups/join/invite', request);
  }

  async getJoinRequestsAsync(groupId: string): Promise<GroupJoinRequestInfo[]> {
    return await this.httpClient.get<GroupJoinRequestInfo[]>(`/groups/${groupId}/requests`);
  }

  async approveRejectRequestsAsync(groupId: string, request: GroupApproveRejectRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/requests`, request);
  }

  async updateParticipantsAsync(groupId: string, request: GroupUpdateRequestParticipantsRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/participants`, request);
  }

  async getInviteInfoAsync(inviteCode: string): Promise<GroupInviteInfo> {
    return await this.httpClient.get<GroupInviteInfo>(`/groups/invite/${inviteCode}`);
  }

  async getParticipantsAsync(groupId: string): Promise<GroupParticipantInfo[]> {
    return await this.httpClient.get<GroupParticipantInfo[]>(`/groups/${groupId}/participants`);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListAsync(): Promise<ApiResponse<GroupInfo[]>> {
    return await this.httpClient.tryGet<GroupInfo[]>('/groups');
  }

  async tryGetAsync(groupId: string): Promise<ApiResponse<GroupInfo>> {
    return await this.httpClient.tryGet<GroupInfo>(`/groups/${groupId}`);
  }

  async tryCreateAsync(request: GroupCreateRequest): Promise<ApiResponse<GroupCreated>> {
    return await this.httpClient.tryPost<GroupCreated>('/groups', request);
  }

  async tryLeaveAsync(groupId: string): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/leave`);
  }

  async tryUpdateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/description`, request);
  }

  async tryUpdateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/name`, request);
  }

  async tryUpdatePictureAsync(
    groupId: string,
    request: GroupUpdatePictureRequest,
  ): Promise<ApiResponse<GroupPictureUpdated>> {
    return await this.httpClient.tryPost<GroupPictureUpdated>(`/groups/${groupId}/picture`, request);
  }

  async tryGetInviteLinkAsync(groupId: string, reset?: boolean): Promise<ApiResponse<GroupInviteLinkResponse>> {
    const query = reset ? '?reset=1' : '';
    return await this.httpClient.tryGet<GroupInviteLinkResponse>(`/groups/${groupId}/invite-link${query}`);
  }

  async trySetAnnounceAsync(groupId: string, request: GroupSetAnnounceRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/announce`, request);
  }

  async trySetLockedAsync(groupId: string, request: GroupSetLockedRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/locked`, request);
  }

  async trySetJoinApprovalAsync(groupId: string, request: GroupSetJoinApprovalRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/join-approval`, request);
  }

  async trySetMemberAddModeAsync(groupId: string, request: GroupSetMemberAddModeRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/member-add-mode`, request);
  }

  async tryJoinByLinkAsync(request: GroupJoinByLinkRequest): Promise<ApiResponse<GroupJoinedResponse>> {
    return await this.httpClient.tryPost<GroupJoinedResponse>('/groups/join/link', request);
  }

  async tryJoinByInviteAsync(request: GroupJoinByInviteRequest): Promise<ApiResponse<GroupJoinedResponse>> {
    return await this.httpClient.tryPost<GroupJoinedResponse>('/groups/join/invite', request);
  }

  async tryGetJoinRequestsAsync(groupId: string): Promise<ApiResponse<GroupJoinRequestInfo[]>> {
    return await this.httpClient.tryGet<GroupJoinRequestInfo[]>(`/groups/${groupId}/requests`);
  }

  async tryApproveRejectRequestsAsync(groupId: string, request: GroupApproveRejectRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/requests`, request);
  }

  async tryUpdateParticipantsAsync(
    groupId: string,
    request: GroupUpdateRequestParticipantsRequest,
  ): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/participants`, request);
  }

  async tryGetInviteInfoAsync(inviteCode: string): Promise<ApiResponse<GroupInviteInfo>> {
    return await this.httpClient.tryGet<GroupInviteInfo>(`/groups/invite/${inviteCode}`);
  }

  async tryGetParticipantsAsync(groupId: string): Promise<ApiResponse<GroupParticipantInfo[]>> {
    return await this.httpClient.tryGet<GroupParticipantInfo[]>(`/groups/${groupId}/participants`);
  }
}
