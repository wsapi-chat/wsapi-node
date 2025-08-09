import type { HttpClient } from './HttpClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { IMessagesClient } from './IMessagesClient.js';
import type { MessageCreated } from '../Models/Entities/Messages/MessageCreated.js';
import type {
  MessageSendTextRequest,
  MessageSendImageRequest,
  MessageSendVideoRequest,
  MessageSendAudioRequest,
  MessageSendVoiceRequest,
  MessageSendStickerRequest,
  MessageSendDocumentRequest,
  MessageSendContactRequest,
  MessageSendLocationRequest,
  MessageSendLinkRequest,
  MessageSendReactionRequest,
  MessageMarkAsReadRequest,
  MessageStarRequest,
  MessageDeleteRequest,
  MessageDeleteForMeRequest,
} from '../Models/Requests/Messages/index.js';

/**
 * WhatsApp messages API client implementation.
 * Provides methods for sending messages, managing reactions, and handling message states.
 */
export class MessagesClient implements IMessagesClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)
  
  async sendTextAsync(request: MessageSendTextRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/text', request);
  }

  async sendLinkAsync(request: MessageSendLinkRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/link', request);
  }

  async sendImageAsync(request: MessageSendImageRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/image', request);
  }

  async sendVideoAsync(request: MessageSendVideoRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/video', request);
  }

  async sendAudioAsync(request: MessageSendAudioRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/audio', request);
  }

  async sendVoiceAsync(request: MessageSendVoiceRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/voice', request);
  }

  async sendStickerAsync(request: MessageSendStickerRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/sticker', request);
  }

  async sendDocumentAsync(request: MessageSendDocumentRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/document', request);
  }

  async sendContactAsync(request: MessageSendContactRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/contact', request);
  }

  async sendLocationAsync(request: MessageSendLocationRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/location', request);
  }

  async sendReactionAsync(messageId: string, request: MessageSendReactionRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>(`messages/${messageId}/reaction`, request);
  }

  async sendEditTextAsync(messageId: string, request: MessageSendTextRequest): Promise<MessageCreated> {
    return await this.httpClient.put<MessageCreated>(`messages/${messageId}/text`, request);
  }

  async markAsReadAsync(messageId: string, request: MessageMarkAsReadRequest): Promise<void> {
    await this.httpClient.putVoid(`messages/${messageId}/read`, request);
  }

  async starAsync(messageId: string, request: MessageStarRequest): Promise<void> {
    await this.httpClient.putVoid(`messages/${messageId}/star`, request);
  }

  async deleteAsync(messageId: string, request: MessageDeleteRequest): Promise<void> {
    await this.httpClient.putVoid(`messages/${messageId}/delete`, request);
  }

  async deleteForMeAsync(messageId: string, request: MessageDeleteForMeRequest): Promise<void> {
    await this.httpClient.putVoid(`messages/${messageId}/delete/forme`, request);
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async trySendTextAsync(request: MessageSendTextRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/text', request);
  }

  async trySendLinkAsync(request: MessageSendLinkRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/link', request);
  }

  async trySendImageAsync(request: MessageSendImageRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/image', request);
  }

  async trySendVideoAsync(request: MessageSendVideoRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/video', request);
  }

  async trySendAudioAsync(request: MessageSendAudioRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/audio', request);
  }

  async trySendVoiceAsync(request: MessageSendVoiceRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/voice', request);
  }

  async trySendStickerAsync(request: MessageSendStickerRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/sticker', request);
  }

  async trySendDocumentAsync(request: MessageSendDocumentRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/document', request);
  }

  async trySendContactAsync(request: MessageSendContactRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/contact', request);
  }

  async trySendLocationAsync(request: MessageSendLocationRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/location', request);
  }

  async trySendReactionAsync(messageId: string, request: MessageSendReactionRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>(`messages/${messageId}/reaction`, request);
  }

  async trySendEditTextAsync(messageId: string, request: MessageSendTextRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPut<MessageCreated>(`messages/${messageId}/text`, request);
  }

  async tryMarkAsReadAsync(messageId: string, request: MessageMarkAsReadRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`messages/${messageId}/read`, request);
  }

  async tryStarAsync(messageId: string, request: MessageStarRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`messages/${messageId}/star`, request);
  }

  async tryDeleteAsync(messageId: string, request: MessageDeleteRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`messages/${messageId}/delete`, request);
  }

  async tryDeleteForMeAsync(messageId: string, request: MessageDeleteForMeRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPutVoid(`messages/${messageId}/delete/forme`, request);
  }
}
