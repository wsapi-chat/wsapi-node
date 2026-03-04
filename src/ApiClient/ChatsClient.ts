import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IChatsClient } from './IChatsClient.js';
import type { ChatListItem, ChatPicture, ChatBusinessProfile } from '../Models/Entities/Chats/index.js';
import type {
  ChatUpdatePresenceRequest,
  ChatUpdateEphemeralExpirationRequest,
  ChatUpdateMuteRequest,
  ChatUpdatePinRequest,
  ChatUpdateArchiveRequest,
  ChatUpdateReadRequest,
  RequestMessagesRequest,
} from '../Models/Requests/Chats/index.js';

/**
 * WhatsApp chats API client implementation.
 * Provides methods for managing chats, updating settings, and handling chat operations.
 */
export class ChatsClient implements IChatsClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)
  
  async listAsync(): Promise<ChatListItem[]> {
    return await this.httpClient.get<ChatListItem[]>('/chats');
  }

  async getAsync(chatId: string): Promise<ChatListItem> {
    return await this.httpClient.get<ChatListItem>(`/chats/${chatId}`);
  }

  async getPictureAsync(chatId: string): Promise<ChatPicture> {
    return await this.httpClient.get<ChatPicture>(`/chats/${chatId}/picture`);
  }

  async getBusinessProfileAsync(chatId: string): Promise<ChatBusinessProfile> {
    return await this.httpClient.get<ChatBusinessProfile>(`/chats/${chatId}/business`);
  }

  async setPresenceAsync(chatId: string, request: ChatUpdatePresenceRequest): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/presence/set`, request);
  }

  async subscribePresenceAsync(chatId: string): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/presence/subscribe`);
  }

  async updateEphemeralAsync(chatId: string, request: ChatUpdateEphemeralExpirationRequest): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/ephemeral`, request);
  }

  async updateMuteAsync(chatId: string, request: ChatUpdateMuteRequest): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/mute`, request);
  }

  async updatePinAsync(chatId: string, request: ChatUpdatePinRequest): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/pin`, request);
  }

  async updateArchiveAsync(chatId: string, request: ChatUpdateArchiveRequest): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/archive`, request);
  }

  async updateReadAsync(chatId: string, request: ChatUpdateReadRequest): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/read`, request);
  }

  async deleteChatAsync(chatId: string): Promise<void> {
    await this.httpClient.deleteVoid(`/chats/${chatId}`);
  }

  async clearAsync(chatId: string): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/clear`);
  }

  async requestMessagesAsync(chatId: string, request: RequestMessagesRequest): Promise<{ status: string }> {
    return await this.httpClient.post<{ status: string }>(`/chats/${chatId}/messages`, request);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListAsync(): Promise<ApiResponse<ChatListItem[]>> {
    return await this.httpClient.tryGet<ChatListItem[]>('/chats');
  }

  async tryGetAsync(chatId: string): Promise<ApiResponse<ChatListItem>> {
    return await this.httpClient.tryGet<ChatListItem>(`/chats/${chatId}`);
  }

  async tryGetPictureAsync(chatId: string): Promise<ApiResponse<ChatPicture>> {
    return await this.httpClient.tryGet<ChatPicture>(`/chats/${chatId}/picture`);
  }

  async tryGetBusinessProfileAsync(chatId: string): Promise<ApiResponse<ChatBusinessProfile>> {
    return await this.httpClient.tryGet<ChatBusinessProfile>(`/chats/${chatId}/business`);
  }

  async trySetPresenceAsync(chatId: string, request: ChatUpdatePresenceRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/presence/set`, request);
  }

  async trySubscribePresenceAsync(chatId: string): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/presence/subscribe`);
  }

  async tryUpdateEphemeralAsync(chatId: string, request: ChatUpdateEphemeralExpirationRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/ephemeral`, request);
  }

  async tryUpdateMuteAsync(chatId: string, request: ChatUpdateMuteRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/mute`, request);
  }

  async tryUpdatePinAsync(chatId: string, request: ChatUpdatePinRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/pin`, request);
  }

  async tryUpdateArchiveAsync(chatId: string, request: ChatUpdateArchiveRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/archive`, request);
  }

  async tryUpdateReadAsync(chatId: string, request: ChatUpdateReadRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/read`, request);
  }

  async tryDeleteChatAsync(chatId: string): Promise<ApiResponse> {
    return await this.httpClient.tryDeleteVoid(`/chats/${chatId}`);
  }

  async tryClearAsync(chatId: string): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/clear`);
  }

  async tryRequestMessagesAsync(chatId: string, request: RequestMessagesRequest): Promise<ApiResponse<{ status: string }>> {
    return await this.httpClient.tryPost<{ status: string }>(`/chats/${chatId}/messages`, request);
  }
}
