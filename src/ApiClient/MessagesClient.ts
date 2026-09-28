import { toWireRequest } from './wire.js';
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
  MessagePinRequest,
} from '../Models/Requests/Messages/index.js';

/**
 * WhatsApp messages API client implementation.
 * Provides methods for sending messages, managing reactions, and handling message states.
 */
const messageBody = (request: object) =>
  toWireRequest(request, {
    imageBase64: 'data',
    imageUrl: 'url',
    videoBase64: 'data',
    videoUrl: 'url',
    audioBase64: 'data',
    audioUrl: 'url',
    voiceBase64: 'data',
    voiceUrl: 'url',
    documentBase64: 'data',
    documentUrl: 'url',
    stickerBase64: 'data',
    stickerUrl: 'url',
    fileName: 'filename',
    vCard: 'vcard',
    time: 'timestamp',
  });

export class MessagesClient implements IMessagesClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Throwing methods (throw ApiException on error)

  async sendTextAsync(request: MessageSendTextRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/text', messageBody(request));
  }

  async sendLinkAsync(request: MessageSendLinkRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/link', messageBody(request));
  }

  async sendImageAsync(request: MessageSendImageRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/image', messageBody(request));
  }

  async sendVideoAsync(request: MessageSendVideoRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/video', messageBody(request));
  }

  async sendAudioAsync(request: MessageSendAudioRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/audio', messageBody(request));
  }

  async sendVoiceAsync(request: MessageSendVoiceRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/voice', messageBody(request));
  }

  async sendStickerAsync(request: MessageSendStickerRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/sticker', messageBody(request));
  }

  async sendDocumentAsync(request: MessageSendDocumentRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/document', messageBody(request));
  }

  async sendContactAsync(request: MessageSendContactRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/contact', messageBody(request));
  }

  async sendLocationAsync(request: MessageSendLocationRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>('messages/location', messageBody(request));
  }

  async sendReactionAsync(messageId: string, request: MessageSendReactionRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>(`messages/${messageId}/reaction`, messageBody(request));
  }

  async sendEditTextAsync(messageId: string, request: MessageSendTextRequest): Promise<MessageCreated> {
    return await this.httpClient.post<MessageCreated>(`messages/${messageId}/edit`, messageBody(request));
  }

  async markAsReadAsync(messageId: string, request: MessageMarkAsReadRequest): Promise<void> {
    await this.httpClient.postVoid(`messages/${messageId}/read`, messageBody(request));
  }

  async starAsync(messageId: string, request: MessageStarRequest): Promise<void> {
    await this.httpClient.postVoid(`messages/${messageId}/star`, messageBody(request));
  }

  async deleteAsync(messageId: string, request: MessageDeleteRequest): Promise<void> {
    await this.httpClient.postVoid(`messages/${messageId}/delete`, messageBody(request));
  }

  async deleteForMeAsync(messageId: string, request: MessageDeleteForMeRequest): Promise<void> {
    await this.httpClient.postVoid(`messages/${messageId}/delete-for-me`, messageBody(request));
  }

  async pinMessageAsync(messageId: string, request: MessagePinRequest): Promise<void> {
    await this.httpClient.postVoid(`messages/${messageId}/pin`, messageBody(request));
  }

  // Non-throwing methods (return ApiResponse with success/error info)

  async trySendTextAsync(request: MessageSendTextRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/text', messageBody(request));
  }

  async trySendLinkAsync(request: MessageSendLinkRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/link', messageBody(request));
  }

  async trySendImageAsync(request: MessageSendImageRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/image', messageBody(request));
  }

  async trySendVideoAsync(request: MessageSendVideoRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/video', messageBody(request));
  }

  async trySendAudioAsync(request: MessageSendAudioRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/audio', messageBody(request));
  }

  async trySendVoiceAsync(request: MessageSendVoiceRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/voice', messageBody(request));
  }

  async trySendStickerAsync(request: MessageSendStickerRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/sticker', messageBody(request));
  }

  async trySendDocumentAsync(request: MessageSendDocumentRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/document', messageBody(request));
  }

  async trySendContactAsync(request: MessageSendContactRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/contact', messageBody(request));
  }

  async trySendLocationAsync(request: MessageSendLocationRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>('messages/location', messageBody(request));
  }

  async trySendReactionAsync(
    messageId: string,
    request: MessageSendReactionRequest,
  ): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>(`messages/${messageId}/reaction`, messageBody(request));
  }

  async trySendEditTextAsync(messageId: string, request: MessageSendTextRequest): Promise<ApiResponse<MessageCreated>> {
    return await this.httpClient.tryPost<MessageCreated>(`messages/${messageId}/edit`, messageBody(request));
  }

  async tryMarkAsReadAsync(messageId: string, request: MessageMarkAsReadRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`messages/${messageId}/read`, messageBody(request));
  }

  async tryStarAsync(messageId: string, request: MessageStarRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`messages/${messageId}/star`, messageBody(request));
  }

  async tryDeleteAsync(messageId: string, request: MessageDeleteRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`messages/${messageId}/delete`, messageBody(request));
  }

  async tryDeleteForMeAsync(messageId: string, request: MessageDeleteForMeRequest): Promise<ApiResponse> {
    return await this.httpClient.tryPostVoid(`messages/${messageId}/delete-for-me`, messageBody(request));
  }

  async tryPinMessageAsync(messageId: string, request: MessagePinRequest): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPostVoid(`messages/${messageId}/pin`, messageBody(request));
  }
}
