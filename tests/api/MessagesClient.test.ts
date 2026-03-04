import { describe, it, expect, beforeEach } from 'vitest';
import { MessagesClient } from '../../src/ApiClient/MessagesClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { MessageCreated } from '../../src/Models/Entities/Messages/MessageCreated';

describe('MessagesClient', () => {
  let mockHttpClient: MockHttpClient;
  let messagesClient: MessagesClient;

  const mockMessageCreated: MessageCreated = {
    id: 'msg123',
    timestamp: '2025-01-01T00:00:00Z',
  };

  const chatId = '1234567890@s.whatsapp.net';

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    messagesClient = new MessagesClient(mockHttpClient as any);
  });

  describe('sendTextAsync', () => {
    it('should send text message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendTextAsync({ chatId, text: 'Hello' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/text', { chatId, text: 'Hello' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendLinkAsync', () => {
    it('should send link message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendLinkAsync({ chatId, url: 'https://example.com', text: 'Check this out' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/link', { chatId, url: 'https://example.com', text: 'Check this out' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendImageAsync', () => {
    it('should send image message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendImageAsync({ chatId, media: 'base64data', caption: 'Image' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/image', { chatId, media: 'base64data', caption: 'Image' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendVideoAsync', () => {
    it('should send video message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendVideoAsync({ chatId, media: 'base64data', caption: 'Video' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/video', { chatId, media: 'base64data', caption: 'Video' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendAudioAsync', () => {
    it('should send audio message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendAudioAsync({ chatId, media: 'base64data' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/audio', { chatId, media: 'base64data' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendVoiceAsync', () => {
    it('should send voice message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendVoiceAsync({ chatId, media: 'base64data' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/voice', { chatId, media: 'base64data' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendStickerAsync', () => {
    it('should send sticker message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendStickerAsync({ chatId, media: 'base64data' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/sticker', { chatId, media: 'base64data' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendDocumentAsync', () => {
    it('should send document message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendDocumentAsync({ chatId, media: 'base64data', fileName: 'doc.pdf' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/document', { chatId, media: 'base64data', fileName: 'doc.pdf' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendContactAsync', () => {
    it('should send contact message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendContactAsync({ chatId, contact: { name: 'John', phoneNumber: '+1234567890' } });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/contact', { chatId, contact: { name: 'John', phoneNumber: '+1234567890' } });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendLocationAsync', () => {
    it('should send location message', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendLocationAsync({ chatId, latitude: 40.7128, longitude: -74.0060 });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/location', { chatId, latitude: 40.7128, longitude: -74.0060 });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendReactionAsync', () => {
    it('should send reaction', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendReactionAsync('msg123', { chatId, reaction: '👍' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('messages/msg123/reaction', { chatId, reaction: '👍' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('sendEditTextAsync', () => {
    it('should edit text message', async () => {
      mockHttpClient.put.mockResolvedValue(mockMessageCreated);

      const result = await messagesClient.sendEditTextAsync('msg123', { chatId, text: 'Edited text' });

      expect(mockHttpClient.put).toHaveBeenCalledWith('messages/msg123/text', { chatId, text: 'Edited text' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('markAsReadAsync', () => {
    it('should mark message as read', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await messagesClient.markAsReadAsync('msg123', { chatId });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('messages/msg123/read', { chatId });
    });
  });

  describe('starAsync', () => {
    it('should star a message', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await messagesClient.starAsync('msg123', { chatId, star: true });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('messages/msg123/star', { chatId, star: true });
    });
  });

  describe('deleteAsync', () => {
    it('should delete a message', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await messagesClient.deleteAsync('msg123', { chatId });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('messages/msg123/delete', { chatId });
    });
  });

  describe('deleteForMeAsync', () => {
    it('should delete message for me', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await messagesClient.deleteForMeAsync('msg123', { chatId });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('messages/msg123/delete/forme', { chatId });
    });
  });

  // Non-throwing methods
  describe('trySendTextAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendTextAsync({ chatId, text: 'Hello' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createErrorResponse(400, 'Invalid chat ID'));

      const result = await messagesClient.trySendTextAsync({ chatId: 'invalid', text: 'Hello' });

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(400);
    });
  });

  describe('trySendLinkAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendLinkAsync({ chatId, url: 'https://example.com' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendImageAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendImageAsync({ chatId, media: 'base64' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendVideoAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendVideoAsync({ chatId, media: 'base64' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendAudioAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendAudioAsync({ chatId, media: 'base64' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendVoiceAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendVoiceAsync({ chatId, media: 'base64' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendStickerAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendStickerAsync({ chatId, media: 'base64' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendDocumentAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendDocumentAsync({ chatId, media: 'base64', fileName: 'doc.pdf' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendContactAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendContactAsync({ chatId, contact: { name: 'John', phoneNumber: '+1234567890' } });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendLocationAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendLocationAsync({ chatId, latitude: 40.7128, longitude: -74.0060 });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendReactionAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendReactionAsync('msg123', { chatId, reaction: '👍' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('trySendEditTextAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPut.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await messagesClient.trySendEditTextAsync('msg123', { chatId, text: 'Edited' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });
  });

  describe('tryMarkAsReadAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await messagesClient.tryMarkAsReadAsync('msg123', { chatId });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryStarAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await messagesClient.tryStarAsync('msg123', { chatId, star: true });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryDeleteAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await messagesClient.tryDeleteAsync('msg123', { chatId });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryDeleteForMeAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await messagesClient.tryDeleteForMeAsync('msg123', { chatId });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('pinMessageAsync', () => {
    it('should pin a message', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);

      await messagesClient.pinMessageAsync('msg123', { chatId, senderId: 'sender123', pinned: true });

      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('messages/msg123/pin', { chatId, senderId: 'sender123', pinned: true });
    });
  });

  describe('tryPinMessageAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await messagesClient.tryPinMessageAsync('msg123', { chatId, senderId: 'sender123', pinned: true });

      expect(result.isSuccess).toBe(true);
    });
  });
});
