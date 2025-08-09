import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IContactsClient } from './IContactsClient.js';
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
 * WhatsApp contacts API client implementation.
 * Provides methods for managing contacts, retrieving contact information, and handling presence.
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

  async getPictureAsync(contactId: string): Promise<ContactPicture> {
    return await this.httpClient.get<ContactPicture>(`/contacts/${contactId}/picture`);
  }

  async getBusinessProfileAsync(contactId: string): Promise<ContactBusinessProfile> {
    return await this.httpClient.get<ContactBusinessProfile>(`/contacts/${contactId}/business`);
  }

  async createAsync(request: ContactCreateRequest): Promise<void> {
    await this.httpClient.postVoid('/contacts', request);
  }

  async updateAsync(contactId: string, request: ContactUpdateRequest): Promise<void> {
    await this.httpClient.putVoid(`/contacts/${contactId}`, request);
  }

  async subscribePresenceAsync(contactId: string): Promise<void> {
    await this.httpClient.postVoid(`/contacts/${contactId}/presence`, {});
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListAsync(): Promise<ApiResponse<ContactInfo[]>> {
    return await this.httpClient.tryGet<ContactInfo[]>('/contacts');
  }

  async tryGetAsync(contactId: string): Promise<ApiResponse<ContactInfo>> {
    return await this.httpClient.tryGet<ContactInfo>(`/contacts/${contactId}`);
  }

  async tryGetPictureAsync(contactId: string): Promise<ApiResponse<ContactPicture>> {
    return await this.httpClient.tryGet<ContactPicture>(`/contacts/${contactId}/picture`);
  }

  async tryGetBusinessProfileAsync(contactId: string): Promise<ApiResponse<ContactBusinessProfile>> {
    return await this.httpClient.tryGet<ContactBusinessProfile>(`/contacts/${contactId}/business`);
  }

  async tryCreateAsync(request: ContactCreateRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid('/contacts', request);
  }

  async tryUpdateAsync(contactId: string, request: ContactUpdateRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/contacts/${contactId}`, request);
  }

  async trySubscribePresenceAsync(contactId: string): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`/contacts/${contactId}/presence`, {});
  }
}
