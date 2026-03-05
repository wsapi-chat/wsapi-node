import type { ApiResponse } from './ApiResponse.js';
import type { ContactInfo } from '../Models/Entities/Contacts/index.js';
import type { ContactCreateRequest } from '../Models/Requests/Contacts/index.js';
import type { Identity } from '../Models/Entities/Users/Identity.js';

/**
 * Interface for WhatsApp contacts API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IContactsClient {
  // Throwing methods (throw ApiException on error)
  listAsync(): Promise<ContactInfo[]>;
  getAsync(contactId: string): Promise<ContactInfo>;
  createAsync(request: ContactCreateRequest): Promise<void>;
  syncContactsAsync(): Promise<void>;
  getBlocklistAsync(): Promise<Identity[]>;
  blockContactAsync(id: string): Promise<void>;
  unblockContactAsync(id: string): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)
  tryListAsync(): Promise<ApiResponse<ContactInfo[]>>;
  tryGetAsync(contactId: string): Promise<ApiResponse<ContactInfo>>;
  tryCreateAsync(request: ContactCreateRequest): Promise<ApiResponse>;
  trySyncContactsAsync(): Promise<ApiResponse<void>>;
  tryGetBlocklistAsync(): Promise<ApiResponse<Identity[]>>;
  tryBlockContactAsync(id: string): Promise<ApiResponse<void>>;
  tryUnblockContactAsync(id: string): Promise<ApiResponse<void>>;
}
