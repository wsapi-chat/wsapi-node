import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { ICommunitiesClient } from './ICommunitiesClient.js';
import type { CommunityInfo, CommunitySubGroupResponse } from '../Models/Entities/Communities/index.js';
import type { Identity } from '../Models/Entities/Users/Identity.js';
import type { MessageCreated } from '../Models/Entities/Messages/index.js';
import type { CreateCommunityRequest, CreateCommunityGroupRequest, LinkGroupRequest } from '../Models/Requests/Communities/index.js';

/**
 * WhatsApp communities API client implementation.
 * Provides methods for managing communities, sub-groups, and community settings.
 */
export class CommunitiesClient implements ICommunitiesClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  async listCommunitiesAsync(): Promise<CommunityInfo[]> {
    return await this.httpClient.get<CommunityInfo[]>('/communities');
  }

  async createCommunityAsync(request: CreateCommunityRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('/communities', request);
  }

  async getCommunityAsync(id: string): Promise<CommunityInfo> {
    return await this.httpClient.get<CommunityInfo>(`/communities/${id}`);
  }

  async leaveCommunityAsync(id: string): Promise<void> {
    await this.httpClient.postVoid(`/communities/${id}/leave`);
  }

  async setCommunityNameAsync(id: string, name: string): Promise<void> {
    await this.httpClient.putVoid(`/communities/${id}/name`, { name });
  }

  async setCommunityDescriptionAsync(id: string, description: string): Promise<void> {
    await this.httpClient.putVoid(`/communities/${id}/description`, { description });
  }

  async setCommunityPictureAsync(id: string, data: string): Promise<{ pictureId: string }> {
    return await this.httpClient.post<{ pictureId: string }>(`/communities/${id}/picture`, { data });
  }

  async setCommunityLockedAsync(id: string, enabled: boolean): Promise<void> {
    await this.httpClient.putVoid(`/communities/${id}/settings/locked`, { enabled });
  }

  async getCommunityParticipantsAsync(id: string): Promise<Identity[]> {
    return await this.httpClient.get<Identity[]>(`/communities/${id}/participants`);
  }

  async updateCommunityParticipantsAsync(id: string, participants: string[], action: string): Promise<void> {
    await this.httpClient.putVoid(`/communities/${id}/participants`, { participants, action });
  }

  async getCommunityInviteLinkAsync(id: string): Promise<{ link: string }> {
    return await this.httpClient.get<{ link: string }>(`/communities/${id}/invite-link`);
  }

  async resetCommunityInviteLinkAsync(id: string): Promise<{ link: string }> {
    return await this.httpClient.post<{ link: string }>(`/communities/${id}/invite-link/reset`);
  }

  async getCommunitySubGroupsAsync(id: string): Promise<CommunitySubGroupResponse[]> {
    return await this.httpClient.get<CommunitySubGroupResponse[]>(`/communities/${id}/groups`);
  }

  async createCommunityGroupAsync(id: string, request: CreateCommunityGroupRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>(`/communities/${id}/groups`, request);
  }

  async linkGroupToCommunityAsync(id: string, request: LinkGroupRequest): Promise<void> {
    await this.httpClient.postVoid(`/communities/${id}/groups/link`, request);
  }

  async unlinkGroupFromCommunityAsync(id: string, groupId: string): Promise<void> {
    await this.httpClient.deleteVoid(`/communities/${id}/groups/${groupId}`);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListCommunitiesAsync(): Promise<ApiResponse<CommunityInfo[]>> {
    return await this.httpClient.tryGet<CommunityInfo[]>('/communities');
  }

  async tryCreateCommunityAsync(request: CreateCommunityRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('/communities', request);
  }

  async tryGetCommunityAsync(id: string): Promise<ApiResponse<CommunityInfo>> {
    return await this.httpClient.tryGet<CommunityInfo>(`/communities/${id}`);
  }

  async tryLeaveCommunityAsync(id: string): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`/communities/${id}/leave`);
  }

  async trySetCommunityNameAsync(id: string, name: string): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/communities/${id}/name`, { name });
  }

  async trySetCommunityDescriptionAsync(id: string, description: string): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/communities/${id}/description`, { description });
  }

  async trySetCommunityPictureAsync(id: string, data: string): Promise<ApiResponse<{ pictureId: string }>> {
    return await this.httpClient.tryPost<{ pictureId: string }>(`/communities/${id}/picture`, { data });
  }

  async trySetCommunityLockedAsync(id: string, enabled: boolean): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/communities/${id}/settings/locked`, { enabled });
  }

  async tryGetCommunityParticipantsAsync(id: string): Promise<ApiResponse<Identity[]>> {
    return await this.httpClient.tryGet<Identity[]>(`/communities/${id}/participants`);
  }

  async tryUpdateCommunityParticipantsAsync(id: string, participants: string[], action: string): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/communities/${id}/participants`, { participants, action });
  }

  async tryGetCommunityInviteLinkAsync(id: string): Promise<ApiResponse<{ link: string }>> {
    return await this.httpClient.tryGet<{ link: string }>(`/communities/${id}/invite-link`);
  }

  async tryResetCommunityInviteLinkAsync(id: string): Promise<ApiResponse<{ link: string }>> {
    return await this.httpClient.tryPost<{ link: string }>(`/communities/${id}/invite-link/reset`);
  }

  async tryGetCommunitySubGroupsAsync(id: string): Promise<ApiResponse<CommunitySubGroupResponse[]>> {
    return await this.httpClient.tryGet<CommunitySubGroupResponse[]>(`/communities/${id}/groups`);
  }

  async tryCreateCommunityGroupAsync(id: string, request: CreateCommunityGroupRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>(`/communities/${id}/groups`, request);
  }

  async tryLinkGroupToCommunityAsync(id: string, request: LinkGroupRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`/communities/${id}/groups/link`, request);
  }

  async tryUnlinkGroupFromCommunityAsync(id: string, groupId: string): Promise<ApiResponse> {
    return await this.httpClient.tryDeleteVoid(`/communities/${id}/groups/${groupId}`);
  }
}
