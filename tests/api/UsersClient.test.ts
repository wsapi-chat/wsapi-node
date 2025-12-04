import { describe, it, expect, beforeEach } from 'vitest';
import { UsersClient } from '../../src/ApiClient/UsersClient';
import { MockHttpClient, createSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { UserInfo } from '../../src/Models/Entities/Users/UserInfo';

describe('UsersClient', () => {
  let mockHttpClient: MockHttpClient;
  let usersClient: UsersClient;

  const mockUserInfo: UserInfo = {
    id: '1234567890@s.whatsapp.net',
    name: 'Test User',
    pushName: 'Test',
    status: 'Available',
    pictureUrl: 'https://example.com/picture.jpg',
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    usersClient = new UsersClient(mockHttpClient as any);
  });

  describe('getAsync', () => {
    it('should get user info', async () => {
      mockHttpClient.get.mockResolvedValue(mockUserInfo);

      const result = await usersClient.getAsync('+1234567890');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/users/+1234567890');
      expect(result).toEqual(mockUserInfo);
    });
  });

  // Non-throwing methods
  describe('tryGetAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockUserInfo));

      const result = await usersClient.tryGetAsync('+1234567890');

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/users/+1234567890');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUserInfo);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'User not found'));

      const result = await usersClient.tryGetAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });
});
