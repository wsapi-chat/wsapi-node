import type { ApiResponse } from './ApiResponse.js';
import type { CommunityInfo, CommunitySubGroupResponse } from '../Models/Entities/Communities/index.js';
import type { Identity } from '../Models/Entities/Users/Identity.js';
import type { MessageCreated } from '../Models/Entities/Messages/index.js';
import type {
  CreateCommunityRequest,
  CreateCommunityGroupRequest,
  LinkGroupRequest,
} from '../Models/Requests/Communities/index.js';

/**
 * Interface for WhatsApp communities API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface ICommunitiesClient {
  // Throwing methods (throw ApiException on error)

  /** List all communities */
  listCommunitiesAsync(): Promise<CommunityInfo[]>;

  /** Create a new community */
  createCommunityAsync(request: CreateCommunityRequest): Promise<MessageCreated>;

  /** Get community information */
  getCommunityAsync(id: string): Promise<CommunityInfo>;

  /** Leave a community */
  leaveCommunityAsync(id: string): Promise<void>;

  /** Set community name */
  setCommunityNameAsync(id: string, name: string): Promise<void>;

  /** Set community description */
  setCommunityDescriptionAsync(id: string, description: string): Promise<void>;

  /** Set community picture */
  setCommunityPictureAsync(id: string, data: string): Promise<{ pictureId: string }>;

  /** Set community locked setting */
  setCommunityLockedAsync(id: string, enabled: boolean): Promise<void>;

  /** Get community participants */
  getCommunityParticipantsAsync(id: string): Promise<Identity[]>;

  /** Update community participants (add, remove, promote, demote) */
  updateCommunityParticipantsAsync(id: string, participants: string[], action: string): Promise<void>;

  /** Get community invite link */
  getCommunityInviteLinkAsync(id: string): Promise<{ link: string }>;

  /** Reset community invite link */
  resetCommunityInviteLinkAsync(id: string): Promise<{ link: string }>;

  /** Get community sub-groups */
  getCommunitySubGroupsAsync(id: string): Promise<CommunitySubGroupResponse[]>;

  /** Create a new sub-group in a community */
  createCommunityGroupAsync(id: string, request: CreateCommunityGroupRequest): Promise<MessageCreated>;

  /** Link an existing group to a community */
  linkGroupToCommunityAsync(id: string, request: LinkGroupRequest): Promise<void>;

  /** Unlink a group from a community */
  unlinkGroupFromCommunityAsync(id: string, groupId: string): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)

  tryListCommunitiesAsync(): Promise<ApiResponse<CommunityInfo[]>>;
  tryCreateCommunityAsync(request: CreateCommunityRequest): Promise<ApiResponse<MessageCreated>>;
  tryGetCommunityAsync(id: string): Promise<ApiResponse<CommunityInfo>>;
  tryLeaveCommunityAsync(id: string): Promise<ApiResponse>;
  trySetCommunityNameAsync(id: string, name: string): Promise<ApiResponse>;
  trySetCommunityDescriptionAsync(id: string, description: string): Promise<ApiResponse>;
  trySetCommunityPictureAsync(id: string, data: string): Promise<ApiResponse<{ pictureId: string }>>;
  trySetCommunityLockedAsync(id: string, enabled: boolean): Promise<ApiResponse>;
  tryGetCommunityParticipantsAsync(id: string): Promise<ApiResponse<Identity[]>>;
  tryUpdateCommunityParticipantsAsync(id: string, participants: string[], action: string): Promise<ApiResponse>;
  tryGetCommunityInviteLinkAsync(id: string): Promise<ApiResponse<{ link: string }>>;
  tryResetCommunityInviteLinkAsync(id: string): Promise<ApiResponse<{ link: string }>>;
  tryGetCommunitySubGroupsAsync(id: string): Promise<ApiResponse<CommunitySubGroupResponse[]>>;
  tryCreateCommunityGroupAsync(id: string, request: CreateCommunityGroupRequest): Promise<ApiResponse<MessageCreated>>;
  tryLinkGroupToCommunityAsync(id: string, request: LinkGroupRequest): Promise<ApiResponse>;
  tryUnlinkGroupFromCommunityAsync(id: string, groupId: string): Promise<ApiResponse>;
}
