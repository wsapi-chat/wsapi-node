import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IContactsClient } from './IContactsClient.js';
import type { ContactInfo } from '../Models/Entities/Contacts/index.js';
import type { ContactCreateRequest } from '../Models/Requests/Contacts/index.js';
import type { Identity } from '../Models/Entities/Users/Identity.js';

/**
 * WhatsApp contacts API client implementation.
 * Provides methods for managing contacts and retrieving contact information.
 */
export class ContactsClient implements IContactsClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  async listAsync(): Promise<ContactInfo[]> {
    return await this.httpClient.get<ContactInfo[]>('/contacts');
  }

  async getAsync(contactId: string): Promise<ContactInfo> {
    return await this.httpClient.get<ContactInfo>(`/contacts/${contactId}`);
  }

  async createAsync(request: ContactCreateRequest): Promise<void> {
    await this.httpClient.postVoid('/contacts', request);
  }

  async syncContactsAsync(): Promise<void> {
    await this.httpClient.postVoid('/contacts/sync');
  }

  async getBlocklistAsync(): Promise<Identity[]> {
    return await this.httpClient.get<Identity[]>('/contacts/blocklist');
  }

  async blockContactAsync(id: string): Promise<void> {
    await this.httpClient.putVoid(`/contacts/${id}/block`);
  }

  async unblockContactAsync(id: string): Promise<void> {
    await this.httpClient.putVoid(`/contacts/${id}/unblock`);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListAsync(): Promise<ApiResponse<ContactInfo[]>> {
    return await this.httpClient.tryGet<ContactInfo[]>('/contacts');
  }

  async tryGetAsync(contactId: string): Promise<ApiResponse<ContactInfo>> {
    return await this.httpClient.tryGet<ContactInfo>(`/contacts/${contactId}`);
  }

  async tryCreateAsync(request: ContactCreateRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid('/contacts', request);
  }

  async trySyncContactsAsync(): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPostVoid('/contacts/sync');
  }

  async tryGetBlocklistAsync(): Promise<ApiResponse<Identity[]>> {
    return await this.httpClient.tryGet<Identity[]>('/contacts/blocklist');
  }

  async tryBlockContactAsync(id: string): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid(`/contacts/${id}/block`);
  }

  async tryUnblockContactAsync(id: string): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid(`/contacts/${id}/unblock`);
  }
}
