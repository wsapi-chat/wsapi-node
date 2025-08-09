import type { ApiResponse } from './ApiResponse.js';
import type {
  ContactInfo,
  ContactPicture,
  ContactBusinessProfile,
} from '../Models/Entities/Contacts/index.js';
import type {
  ContactCreateRequest,
  ContactUpdateRequest,
} from '../Models/Requests/Contacts/index.js';

/**
 * Interface for WhatsApp contacts API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IContactsClient {
  // Throwing methods (throw ApiException on error)
  listAsync(): Promise<ContactInfo[]>;
  getAsync(contactId: string): Promise<ContactInfo>;
  getPictureAsync(contactId: string): Promise<ContactPicture>;
  getBusinessProfileAsync(contactId: string): Promise<ContactBusinessProfile>;
  createAsync(request: ContactCreateRequest): Promise<void>;
  updateAsync(contactId: string, request: ContactUpdateRequest): Promise<void>;
  subscribePresenceAsync(contactId: string): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)
  tryListAsync(): Promise<ApiResponse<ContactInfo[]>>;
  tryGetAsync(contactId: string): Promise<ApiResponse<ContactInfo>>;
  tryGetPictureAsync(contactId: string): Promise<ApiResponse<ContactPicture>>;
  tryGetBusinessProfileAsync(contactId: string): Promise<ApiResponse<ContactBusinessProfile>>;
  tryCreateAsync(request: ContactCreateRequest): Promise<ApiResponse>;
  tryUpdateAsync(contactId: string, request: ContactUpdateRequest): Promise<ApiResponse>;
  trySubscribePresenceAsync(contactId: string): Promise<ApiResponse>;
}
