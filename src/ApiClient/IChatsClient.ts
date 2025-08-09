import type { ApiResponse } from './ApiResponse.js';
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
 * Interface for WhatsApp chats API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IChatsClient {
  // Throwing methods (throw ApiException on error)
  listAsync(): Promise<ChatInfo[]>;
  getAsync(chatId: string): Promise<ChatInfo>;
  updatePresenceAsync(chatId: string, request: ChatUpdatePresenceRequest): Promise<void>;
  updateEphemeralAsync(chatId: string, request: ChatUpdateEphemeralExpirationRequest): Promise<void>;
  updateMuteAsync(chatId: string, request: ChatUpdateMuteRequest): Promise<void>;
  updatePinAsync(chatId: string, request: ChatUpdatePinRequest): Promise<void>;
  updateArchiveAsync(chatId: string, request: ChatUpdateArchiveRequest): Promise<void>;
  updateReadAsync(chatId: string, request: ChatUpdateReadRequest): Promise<void>;
  deleteChatAsync(chatId: string): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)
  tryListAsync(): Promise<ApiResponse<ChatInfo[]>>;
  tryGetAsync(chatId: string): Promise<ApiResponse<ChatInfo>>;
  tryUpdatePresenceAsync(chatId: string, request: ChatUpdatePresenceRequest): Promise<ApiResponse>;
  tryUpdateEphemeralAsync(chatId: string, request: ChatUpdateEphemeralExpirationRequest): Promise<ApiResponse>;
  tryUpdateMuteAsync(chatId: string, request: ChatUpdateMuteRequest): Promise<ApiResponse>;
  tryUpdatePinAsync(chatId: string, request: ChatUpdatePinRequest): Promise<ApiResponse>;
  tryUpdateArchiveAsync(chatId: string, request: ChatUpdateArchiveRequest): Promise<ApiResponse>;
  tryUpdateReadAsync(chatId: string, request: ChatUpdateReadRequest): Promise<ApiResponse>;
  tryDeleteChatAsync(chatId: string): Promise<ApiResponse>;
}
