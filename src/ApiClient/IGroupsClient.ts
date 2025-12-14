import type { ApiResponse } from './ApiResponse.js';
import type {
  GroupInfo,
  GroupCreated,
  GroupPictureUpdated,
  GroupInviteInfo,
  GroupInviteLinkResponse,
  GroupJoinRequestInfo,
  GroupJoinedResponse,
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
 * Interface for WhatsApp groups API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IGroupsClient {
  // Throwing methods (throw ApiException on error)

  /** List all WhatsApp groups */
  listAsync(): Promise<GroupInfo[]>;

  /** Get group information */
  getAsync(groupId: string): Promise<GroupInfo>;

  /** Create a new WhatsApp group */
  createAsync(request: GroupCreateRequest): Promise<GroupCreated>;

  /** Leave a group */
  leaveAsync(groupId: string): Promise<void>;

  /** Update group description */
  updateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<void>;

  /** Update group name */
  updateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<void>;

  /** Set group picture */
  updatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<GroupPictureUpdated>;

  /** Get group invite link. Optionally reset to generate a new link. */
  getInviteLinkAsync(groupId: string, reset?: boolean): Promise<GroupInviteLinkResponse>;

  /** Set group announce mode (only admins can send messages) */
  setAnnounceAsync(groupId: string, request: GroupSetAnnounceRequest): Promise<void>;

  /** Set group locked mode (only admins can edit group info) */
  setLockedAsync(groupId: string, request: GroupSetLockedRequest): Promise<void>;

  /** Set group join approval mode */
  setJoinApprovalAsync(groupId: string, request: GroupSetJoinApprovalRequest): Promise<void>;

  /** Set who can add members to the group */
  setMemberAddModeAsync(groupId: string, request: GroupSetMemberAddModeRequest): Promise<void>;

  /** Join group via invite link code */
  joinByLinkAsync(request: GroupJoinByLinkRequest): Promise<GroupJoinedResponse>;

  /** Join group via invite message */
  joinByInviteAsync(request: GroupJoinByInviteRequest): Promise<GroupJoinedResponse>;

  /** List pending join requests for a group */
  getJoinRequestsAsync(groupId: string): Promise<GroupJoinRequestInfo[]>;

  /** Approve or reject group join requests */
  approveRejectRequestsAsync(groupId: string, request: GroupApproveRejectRequest): Promise<void>;

  /** Manage group participants (add, remove, promote, demote) */
  updateParticipantsAsync(groupId: string, request: GroupUpdateRequestParticipantsRequest): Promise<void>;

  /** Get group info from invite code */
  getInviteInfoAsync(inviteCode: string): Promise<GroupInviteInfo>;

  // Non-throwing methods (return ApiResponse with success/error info)

  tryListAsync(): Promise<ApiResponse<GroupInfo[]>>;
  tryGetAsync(groupId: string): Promise<ApiResponse<GroupInfo>>;
  tryCreateAsync(request: GroupCreateRequest): Promise<ApiResponse<GroupCreated>>;
  tryLeaveAsync(groupId: string): Promise<ApiResponse>;
  tryUpdateDescriptionAsync(groupId: string, request: GroupUpdateDescriptionRequest): Promise<ApiResponse>;
  tryUpdateNameAsync(groupId: string, request: GroupUpdateNameRequest): Promise<ApiResponse>;
  tryUpdatePictureAsync(groupId: string, request: GroupUpdatePictureRequest): Promise<ApiResponse<GroupPictureUpdated>>;
  tryGetInviteLinkAsync(groupId: string, reset?: boolean): Promise<ApiResponse<GroupInviteLinkResponse>>;
  trySetAnnounceAsync(groupId: string, request: GroupSetAnnounceRequest): Promise<ApiResponse>;
  trySetLockedAsync(groupId: string, request: GroupSetLockedRequest): Promise<ApiResponse>;
  trySetJoinApprovalAsync(groupId: string, request: GroupSetJoinApprovalRequest): Promise<ApiResponse>;
  trySetMemberAddModeAsync(groupId: string, request: GroupSetMemberAddModeRequest): Promise<ApiResponse>;
  tryJoinByLinkAsync(request: GroupJoinByLinkRequest): Promise<ApiResponse<GroupJoinedResponse>>;
  tryJoinByInviteAsync(request: GroupJoinByInviteRequest): Promise<ApiResponse<GroupJoinedResponse>>;
  tryGetJoinRequestsAsync(groupId: string): Promise<ApiResponse<GroupJoinRequestInfo[]>>;
  tryApproveRejectRequestsAsync(groupId: string, request: GroupApproveRejectRequest): Promise<ApiResponse>;
  tryUpdateParticipantsAsync(groupId: string, request: GroupUpdateRequestParticipantsRequest): Promise<ApiResponse>;
  tryGetInviteInfoAsync(inviteCode: string): Promise<ApiResponse<GroupInviteInfo>>;
}
