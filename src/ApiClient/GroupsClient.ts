import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IGroupsClient } from './IGroupsClient.js';
import type {
  GroupInfo,
  GroupCreated,
  GroupPictureUpdated,
  GroupInviteInfo,
} from '../Models/Entities/Groups/index.js';
import type {
  GroupCreateRequest,
  GroupUpdateDescriptionRequest,
  GroupUpdateNameRequest,
  GroupUpdatePictureRequest,
  GroupUpdateRequestParticipantsRequest,
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

  async deleteAsync(groupId: string): Promise<void> {
    await this.httpClient.deleteVoid(`/groups/${groupId}`);
  }

  async createAsync(request: GroupCreateRequest): Promise<GroupCreated> {
    return await this.httpClient.post<GroupCreated>('/groups', request);
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

  async getInviteLinkAsync(groupId: string): Promise<string> {
    return await this.httpClient.get<string>(`/groups/${groupId}/invite-link`);
  }

  async getJoinRequestsAsync(groupId: string): Promise<string[]> {
    return await this.httpClient.get<string[]>(`/groups/${groupId}/requests`);
  }

  async updateParticipantsAsync(groupId: string, request: GroupUpdateRequestParticipantsRequest): Promise<void> {
    await this.httpClient.putVoid(`/groups/${groupId}/participants`, request);
  }

  async getInviteInfoAsync(inviteCode: string): Promise<GroupInviteInfo> {
    return await this.httpClient.get<GroupInviteInfo>(`/group-invites/${inviteCode}`);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListAsync(): Promise<ApiResponse<GroupInfo[]>> {
    return await this.httpClient.tryGet<GroupInfo[]>('/groups');
  }

  async tryGetAsync(groupId: string): Promise<ApiResponse<GroupInfo>> {
    return await this.httpClient.tryGet<GroupInfo>(`/groups/${groupId}`);
  }

  async tryDeleteAsync(groupId: string): Promise<ApiResponse> {
    return await this.httpClient.tryDeleteVoid(`/groups/${groupId}`);
  }

  async tryCreateAsync(request: GroupCreateRequest): Promise<ApiResponse<GroupCreated>> {
    return await this.httpClient.tryPost<GroupCreated>('/groups', request);
  }

  async tryUpdateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/description`, request);
  }

  async tryUpdateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/name`, request);
  }

  async tryUpdatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<ApiResponse<GroupPictureUpdated>> {
    return await this.httpClient.tryPost<GroupPictureUpdated>(`/groups/${groupId}/picture`, request);
  }

  async tryGetInviteLinkAsync(groupId: string): Promise<ApiResponse<string>> {
    return await this.httpClient.tryGet<string>(`/groups/${groupId}/invite-link`);
  }

  async tryGetJoinRequestsAsync(groupId: string): Promise<ApiResponse<string[]>> {
    return await this.httpClient.tryGet<string[]>(`/groups/${groupId}/requests`);
  }

  async tryUpdateParticipantsAsync(groupId: string, request: GroupUpdateRequestParticipantsRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/groups/${groupId}/participants`, request);
  }

  async tryGetInviteInfoAsync(inviteCode: string): Promise<ApiResponse<GroupInviteInfo>> {
    return await this.httpClient.tryGet<GroupInviteInfo>(`/group-invites/${inviteCode}`);
  }
}
