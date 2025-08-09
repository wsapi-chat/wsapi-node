import type { ApiResponse } from './ApiResponse.js';
import type {
  GroupInfo,
  GroupPictureInfo,
  GroupCreated,
  GroupPictureUpdated,
} from '../Models/Entities/Groups/index.js';
import type {
  GroupCreateRequest,
  GroupUpdateDescriptionRequest,
  GroupUpdateNameRequest,
  GroupUpdatePictureRequest,
} from '../Models/Requests/Groups/index.js';

/**
 * Interface for WhatsApp groups API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IGroupsClient {
  // Throwing methods (throw ApiException on error)
  listAsync(): Promise<GroupInfo[]>;
  getAsync(groupId: string): Promise<GroupInfo>;
  getPictureAsync(groupId: string): Promise<GroupPictureInfo>;
  createAsync(request: GroupCreateRequest): Promise<GroupCreated>;
  updateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<void>;
  updateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<void>;
  updatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<GroupPictureUpdated>;
  leaveGroupAsync(groupId: string): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)
  tryListAsync(): Promise<ApiResponse<GroupInfo[]>>;
  tryGetAsync(groupId: string): Promise<ApiResponse<GroupInfo>>;
  tryGetPictureAsync(groupId: string): Promise<ApiResponse<GroupPictureInfo>>;
  tryCreateAsync(request: GroupCreateRequest): Promise<ApiResponse<GroupCreated>>;
  tryUpdateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<ApiResponse>;
  tryUpdateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<ApiResponse>;
  tryUpdatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<ApiResponse<GroupPictureUpdated>>;
  tryLeaveGroupAsync(groupId: string): Promise<ApiResponse>;
}
