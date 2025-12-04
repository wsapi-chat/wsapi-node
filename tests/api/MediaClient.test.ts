import { describe, it, expect, beforeEach } from 'vitest';
import { MediaClient } from '../../src/ApiClient/MediaClient';
import { MockHttpClient, createSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';

describe('MediaClient', () => {
  let mockHttpClient: MockHttpClient;
  let mediaClient: MediaClient;

  const mockMediaData = new ArrayBuffer(1024);

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    mediaClient = new MediaClient(mockHttpClient as any);
  });

  describe('downloadAsync', () => {
    it('should download media', async () => {
      mockHttpClient.getBinary.mockResolvedValue(mockMediaData);

      const result = await mediaClient.downloadAsync('media123');

      expect(mockHttpClient.getBinary).toHaveBeenCalledWith('/media/download?id=media123');
      expect(result).toBe(mockMediaData);
    });

    it('should encode media ID with special characters', async () => {
      mockHttpClient.getBinary.mockResolvedValue(mockMediaData);

      await mediaClient.downloadAsync('media/with spaces&special=chars');

      expect(mockHttpClient.getBinary).toHaveBeenCalledWith('/media/download?id=media%2Fwith%20spaces%26special%3Dchars');
    });
  });

  // Non-throwing methods
  describe('tryDownloadAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGetBinary.mockResolvedValue(createSuccessResponse(mockMediaData));

      const result = await mediaClient.tryDownloadAsync('media123');

      expect(mockHttpClient.tryGetBinary).toHaveBeenCalledWith('/media/download?id=media123');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toBe(mockMediaData);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGetBinary.mockResolvedValue(createErrorResponse(404, 'Media not found'));

      const result = await mediaClient.tryDownloadAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });
});
