import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IChatsClient } from './IChatsClient.js';
import type { ChatInfo } from '../Models/Entities/Chats/ChatInfo.js';
import type {
  ChatUpdatePresenceRequest,
  ChatUpdateEphemeralExpirationRequest,
  ChatUpdateMuteRequest,
  ChatUpdatePinRequest,
  ChatUpdateArchiveRequest,
  ChatUpdateReadRequest,
} from '../Models/Requests/Chats/index.js';

/**
 * WhatsApp chats API client implementation.
 * Provides methods for managing chats, updating settings, and handling chat operations.
 */
export class ChatsClient implements IChatsClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)
  
  async listAsync(): Promise<ChatInfo[]> {
    return await this.httpClient.get<ChatInfo[]>('/chats');
  }

  async getAsync(chatId: string): Promise<ChatInfo> {
    return await this.httpClient.get<ChatInfo>(`/chats/${chatId}`);
  }

  async updatePresenceAsync(chatId: string, request: ChatUpdatePresenceRequest): Promise<void> {
    await this.httpClient.putVoid(`/chats/${chatId}/presence`, request);
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

  // Non-throwing methods (return ApiResponse with success/error info)

  async tryListAsync(): Promise<ApiResponse<ChatInfo[]>> {
    return await this.httpClient.tryGet<ChatInfo[]>('/chats');
  }

  async tryGetAsync(chatId: string): Promise<ApiResponse<ChatInfo>> {
    return await this.httpClient.tryGet<ChatInfo>(`/chats/${chatId}`);
  }

  async tryUpdatePresenceAsync(chatId: string, request: ChatUpdatePresenceRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`/chats/${chatId}/presence`, request);
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
}
