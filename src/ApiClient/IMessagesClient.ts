import type { ApiResponse } from './ApiResponse.js';
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
 * Interface for WhatsApp messages API client operations.
 * Provides both throwing and non-throwing method variants for error handling.
 */
export interface IMessagesClient {
  // Throwing methods (throw ApiException on error)
  sendTextAsync(request: MessageSendTextRequest): Promise<MessageCreated>;
  sendLinkAsync(request: MessageSendLinkRequest): Promise<MessageCreated>;
  sendImageAsync(request: MessageSendImageRequest): Promise<MessageCreated>;
  sendVideoAsync(request: MessageSendVideoRequest): Promise<MessageCreated>;
  sendAudioAsync(request: MessageSendAudioRequest): Promise<MessageCreated>;
  sendVoiceAsync(request: MessageSendVoiceRequest): Promise<MessageCreated>;
  sendStickerAsync(request: MessageSendStickerRequest): Promise<MessageCreated>;
  sendDocumentAsync(request: MessageSendDocumentRequest): Promise<MessageCreated>;
  sendContactAsync(request: MessageSendContactRequest): Promise<MessageCreated>;
  sendLocationAsync(request: MessageSendLocationRequest): Promise<MessageCreated>;
  sendReactionAsync(messageId: string, request: MessageSendReactionRequest): Promise<MessageCreated>;
  sendEditTextAsync(messageId: string, request: MessageSendTextRequest): Promise<MessageCreated>;
  markAsReadAsync(messageId: string, request: MessageMarkAsReadRequest): Promise<void>;
  starAsync(messageId: string, request: MessageStarRequest): Promise<void>;
  deleteAsync(messageId: string, request: MessageDeleteRequest): Promise<void>;
  deleteForMeAsync(messageId: string, request: MessageDeleteForMeRequest): Promise<void>;

  // Non-throwing methods (return ApiResponse with success/error info)
  trySendTextAsync(request: MessageSendTextRequest): Promise<ApiResponse<MessageCreated>>;
  trySendLinkAsync(request: MessageSendLinkRequest): Promise<ApiResponse<MessageCreated>>;
  trySendImageAsync(request: MessageSendImageRequest): Promise<ApiResponse<MessageCreated>>;
  trySendVideoAsync(request: MessageSendVideoRequest): Promise<ApiResponse<MessageCreated>>;
  trySendAudioAsync(request: MessageSendAudioRequest): Promise<ApiResponse<MessageCreated>>;
  trySendVoiceAsync(request: MessageSendVoiceRequest): Promise<ApiResponse<MessageCreated>>;
  trySendStickerAsync(request: MessageSendStickerRequest): Promise<ApiResponse<MessageCreated>>;
  trySendDocumentAsync(request: MessageSendDocumentRequest): Promise<ApiResponse<MessageCreated>>;
  trySendContactAsync(request: MessageSendContactRequest): Promise<ApiResponse<MessageCreated>>;
  trySendLocationAsync(request: MessageSendLocationRequest): Promise<ApiResponse<MessageCreated>>;
  trySendReactionAsync(messageId: string, request: MessageSendReactionRequest): Promise<ApiResponse<MessageCreated>>;
  trySendEditTextAsync(messageId: string, request: MessageSendTextRequest): Promise<ApiResponse<MessageCreated>>;
  tryMarkAsReadAsync(messageId: string, request: MessageMarkAsReadRequest): Promise<ApiResponse>;
  tryStarAsync(messageId: string, request: MessageStarRequest): Promise<ApiResponse>;
  tryDeleteAsync(messageId: string, request: MessageDeleteRequest): Promise<ApiResponse>;
  tryDeleteForMeAsync(messageId: string, request: MessageDeleteForMeRequest): Promise<ApiResponse>;
}
