import { describe, it, expect, beforeEach } from 'vitest';
import { UsersClient } from '../../src/ApiClient/UsersClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { UserInfo, UserMeInfo, BulkCheckResult, PrivacySettingsResponse } from '../../src/Models/Entities/Users/index';

describe('UsersClient', () => {
  let mockHttpClient: MockHttpClient;
  let usersClient: UsersClient;

  const mockUserInfo: UserInfo = {
    id: '1234567890@s.whatsapp.net',
    status: 'Available',
    pictureUrl: 'https://example.com/picture.jpg',
  };

  const mockUserMeInfo: UserMeInfo = {
    id: '1234567890@s.whatsapp.net',
    deviceId: 'device-123',
    pushName: 'Test User',
    status: 'Available',
  };

  const mockPrivacy: PrivacySettingsResponse = {
    groupAdd: 'all',
    lastSeen: 'contacts',
    status: 'all',
    profile: 'all',
    readReceipts: 'all',
    online: 'all',
    callAdd: 'all',
  };

  const mockBulkCheckResults: BulkCheckResult[] = [
    { query: '+1234567890', isInWhatsApp: true, jid: '1234567890@s.whatsapp.net' },
    { query: '+0000000000', isInWhatsApp: false },
  ];

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    usersClient = new UsersClient(mockHttpClient as any);
  });

  describe('getUserProfileAsync', () => {
    it('should get user profile', async () => {
      mockHttpClient.get.mockResolvedValue(mockUserInfo);

      const result = await usersClient.getUserProfileAsync('+1234567890');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/users/+1234567890/profile');
      expect(result).toEqual(mockUserInfo);
    });
  });

  describe('checkUserAsync', () => {
    it('should check if user is on WhatsApp', async () => {
      mockHttpClient.get.mockResolvedValue({ isInWhatsApp: true });

      const result = await usersClient.checkUserAsync('+1234567890');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/users/+1234567890/check');
      expect(result.isInWhatsApp).toBe(true);
    });
  });

  describe('getMyProfileAsync', () => {
    it('should get my profile', async () => {
      mockHttpClient.get.mockResolvedValue(mockUserMeInfo);

      const result = await usersClient.getMyProfileAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/users/me/profile');
      expect(result).toEqual(mockUserMeInfo);
    });
  });

  describe('updateMyProfileAsync', () => {
    it('should update my profile', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await usersClient.updateMyProfileAsync({ pushName: 'New Name' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/users/me/profile', { pushName: 'New Name' });
    });
  });

  describe('setPresenceAsync', () => {
    it('should set presence', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await usersClient.setPresenceAsync({ presence: 'available' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/users/me/presence', { presence: 'available' });
    });
  });

  describe('getPrivacySettingsAsync', () => {
    it('should get privacy settings', async () => {
      mockHttpClient.get.mockResolvedValue(mockPrivacy);

      const result = await usersClient.getPrivacySettingsAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/users/me/privacy');
      expect(result).toEqual(mockPrivacy);
    });
  });

  describe('setPrivacySettingAsync', () => {
    it('should set privacy setting', async () => {
      mockHttpClient.put.mockResolvedValue(mockPrivacy);

      const result = await usersClient.setPrivacySettingAsync({ groupAdd: 'contacts' });

      expect(mockHttpClient.put).toHaveBeenCalledWith('/users/me/privacy', { groupAdd: 'contacts' });
      expect(result).toEqual(mockPrivacy);
    });
  });

  describe('bulkCheckAsync', () => {
    it('should bulk check users', async () => {
      mockHttpClient.post.mockResolvedValue(mockBulkCheckResults);

      const result = await usersClient.bulkCheckAsync({ phones: ['+1234567890', '+0000000000'] });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/users/check', { phones: ['+1234567890', '+0000000000'] });
      expect(result).toEqual(mockBulkCheckResults);
    });
  });

  // Non-throwing methods
  describe('tryGetUserProfileAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockUserInfo));

      const result = await usersClient.tryGetUserProfileAsync('+1234567890');

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/users/+1234567890/profile');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUserInfo);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'User not found'));

      const result = await usersClient.tryGetUserProfileAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('tryCheckUserAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse({ isInWhatsApp: true }));

      const result = await usersClient.tryCheckUserAsync('+1234567890');

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryGetMyProfileAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockUserMeInfo));

      const result = await usersClient.tryGetMyProfileAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockUserMeInfo);
    });
  });

  describe('tryUpdateMyProfileAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await usersClient.tryUpdateMyProfileAsync({ pushName: 'New' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('trySetPresenceAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await usersClient.trySetPresenceAsync({ presence: 'available' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryGetPrivacySettingsAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockPrivacy));

      const result = await usersClient.tryGetPrivacySettingsAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockPrivacy);
    });
  });

  describe('trySetPrivacySettingAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPut.mockResolvedValue(createSuccessResponse(mockPrivacy));

      const result = await usersClient.trySetPrivacySettingAsync({ groupAdd: 'contacts' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryBulkCheckAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockBulkCheckResults));

      const result = await usersClient.tryBulkCheckAsync({ phones: ['+1234567890'] });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockBulkCheckResults);
    });
  });
});
