import { describe, it, expect, beforeEach } from 'vitest';
import { StatusClient } from '../../src/ApiClient/StatusClient';
import {
  MockHttpClient,
  createSuccessResponse,
  createVoidSuccessResponse,
  createErrorResponse,
} from '../mocks/MockHttpClient';
import type { StatusPrivacyResponse } from '../../src/Models/Entities/Status/index';
import type { MessageCreated } from '../../src/Models/Entities/Messages/MessageCreated';

describe('StatusClient', () => {
  let mockHttpClient: MockHttpClient;
  let statusClient: StatusClient;

  const mockPrivacy: StatusPrivacyResponse = {
    type: 'contacts',
    isDefault: true,
  };

  const mockMessageCreated: MessageCreated = {
    id: 'status123',
    timestamp: '2025-01-01T00:00:00Z',
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    statusClient = new StatusClient(mockHttpClient as any);
  });

  describe('getPrivacyAsync', () => {
    it('should get status privacy', async () => {
      mockHttpClient.get.mockResolvedValue(mockPrivacy);

      const result = await statusClient.getPrivacyAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/status/privacy');
      expect(result).toEqual(mockPrivacy);
    });
  });

  describe('postTextAsync', () => {
    it('should post text status', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await statusClient.postTextAsync({ text: 'Hello World' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/status/text', { text: 'Hello World' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('postImageAsync', () => {
    it('should post image status', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await statusClient.postImageAsync({ media: 'base64data', caption: 'My Image' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/status/image', { media: 'base64data', caption: 'My Image' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('postVideoAsync', () => {
    it('should post video status', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await statusClient.postVideoAsync({ media: 'base64data' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/status/video', { media: 'base64data' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('deleteAsync', () => {
    it('should delete status', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);

      await statusClient.deleteAsync('status123', 'chat123', 'sender123');

      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('/status/status123/delete', {
        chatId: 'chat123',
        senderId: 'sender123',
      });
    });
  });

  // Non-throwing methods
  describe('tryGetPrivacyAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockPrivacy));

      const result = await statusClient.tryGetPrivacyAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockPrivacy);
    });
  });

  describe('tryPostTextAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await statusClient.tryPostTextAsync({ text: 'Hello' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockMessageCreated);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createErrorResponse(400, 'Invalid request'));

      const result = await statusClient.tryPostTextAsync({ text: '' });

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(400);
    });
  });

  describe('tryPostImageAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await statusClient.tryPostImageAsync({ media: 'base64' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryPostVideoAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await statusClient.tryPostVideoAsync({ media: 'base64' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryDeleteAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await statusClient.tryDeleteAsync('status123', 'chat123', 'sender123');

      expect(result.isSuccess).toBe(true);
    });
  });
});
