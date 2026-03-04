import { describe, it, expect, beforeEach } from 'vitest';
import { NewslettersClient } from '../../src/ApiClient/NewslettersClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { NewsletterInfo } from '../../src/Models/Entities/Newsletters/index';

describe('NewslettersClient', () => {
  let mockHttpClient: MockHttpClient;
  let newslettersClient: NewslettersClient;

  const mockNewsletter: NewsletterInfo = {
    id: 'newsletter123@newsletter',
    name: 'Test Newsletter',
    subscriberCount: 100,
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    newslettersClient = new NewslettersClient(mockHttpClient as any);
  });

  describe('listNewslettersAsync', () => {
    it('should list newsletters', async () => {
      mockHttpClient.get.mockResolvedValue([mockNewsletter]);

      const result = await newslettersClient.listNewslettersAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/newsletters');
      expect(result).toEqual([mockNewsletter]);
    });
  });

  describe('createNewsletterAsync', () => {
    it('should create a newsletter', async () => {
      mockHttpClient.post.mockResolvedValue(mockNewsletter);

      const result = await newslettersClient.createNewsletterAsync({ name: 'New Newsletter' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/newsletters', { name: 'New Newsletter' });
      expect(result).toEqual(mockNewsletter);
    });
  });

  describe('getNewsletterByInviteCodeAsync', () => {
    it('should get newsletter by invite code', async () => {
      mockHttpClient.get.mockResolvedValue(mockNewsletter);

      const result = await newslettersClient.getNewsletterByInviteCodeAsync('ABC123');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/newsletters/invite/ABC123');
      expect(result).toEqual(mockNewsletter);
    });
  });

  describe('getNewsletterAsync', () => {
    it('should get newsletter by id', async () => {
      mockHttpClient.get.mockResolvedValue(mockNewsletter);

      const result = await newslettersClient.getNewsletterAsync('newsletter123@newsletter');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/newsletters/newsletter123@newsletter');
      expect(result).toEqual(mockNewsletter);
    });
  });

  describe('toggleSubscriptionAsync', () => {
    it('should toggle subscription', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await newslettersClient.toggleSubscriptionAsync('newsletter123@newsletter', true);

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/newsletters/newsletter123@newsletter/subscription', { subscribed: true });
    });
  });

  describe('toggleMuteAsync', () => {
    it('should toggle mute', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await newslettersClient.toggleMuteAsync('newsletter123@newsletter', true);

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/newsletters/newsletter123@newsletter/mute', { mute: true });
    });
  });

  // Non-throwing methods
  describe('tryListNewslettersAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse([mockNewsletter]));

      const result = await newslettersClient.tryListNewslettersAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual([mockNewsletter]);
    });
  });

  describe('tryCreateNewsletterAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockNewsletter));

      const result = await newslettersClient.tryCreateNewsletterAsync({ name: 'Test' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryGetNewsletterAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockNewsletter));

      const result = await newslettersClient.tryGetNewsletterAsync('newsletter123@newsletter');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockNewsletter);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'Not found'));

      const result = await newslettersClient.tryGetNewsletterAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('tryToggleSubscriptionAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await newslettersClient.tryToggleSubscriptionAsync('newsletter123@newsletter', true);

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryToggleMuteAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await newslettersClient.tryToggleMuteAsync('newsletter123@newsletter', false);

      expect(result.isSuccess).toBe(true);
    });
  });
});
