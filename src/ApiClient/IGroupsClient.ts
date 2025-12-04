import type { ApiResponse } from './ApiResponse.js';
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
 * Interface for WhatsApp groups API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IGroupsClient {
  // Throwing methods (throw ApiException on error)
  listAsync(): Promise<GroupInfo[]>;
  getAsync(groupId: string): Promise<GroupInfo>;
  deleteAsync(groupId: string): Promise<void>;
  createAsync(request: GroupCreateRequest): Promise<GroupCreated>;
  updateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<void>;
  updateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<void>;
  updatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<GroupPictureUpdated>;
  getInviteLinkAsync(groupId: string): Promise<string>;
  getJoinRequestsAsync(groupId: string): Promise<string[]>;
  updateParticipantsAsync(groupId: string, request: GroupUpdateRequestParticipantsRequest): Promise<void>;
  getInviteInfoAsync(inviteCode: string): Promise<GroupInviteInfo>;

  // Non-throwing methods (return ApiResponse with success/error info)
  tryListAsync(): Promise<ApiResponse<GroupInfo[]>>;
  tryGetAsync(groupId: string): Promise<ApiResponse<GroupInfo>>;
  tryDeleteAsync(groupId: string): Promise<ApiResponse>;
  tryCreateAsync(request: GroupCreateRequest): Promise<ApiResponse<GroupCreated>>;
  tryUpdateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<ApiResponse>;
  tryUpdateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<ApiResponse>;
  tryUpdatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<ApiResponse<GroupPictureUpdated>>;
  tryGetInviteLinkAsync(groupId: string): Promise<ApiResponse<string>>;
  tryGetJoinRequestsAsync(groupId: string): Promise<ApiResponse<string[]>>;
  tryUpdateParticipantsAsync(groupId: string, request: GroupUpdateRequestParticipantsRequest): Promise<ApiResponse>;
  tryGetInviteInfoAsync(inviteCode: string): Promise<ApiResponse<GroupInviteInfo>>;
}
