import { describe, it, expect, beforeEach } from 'vitest';
import { AccountClient } from '../../src/ApiClient/AccountClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { AccountInfo } from '../../src/Models/Entities/Accounts/AccountInfo';
import type { AccountUpdatePictureResponse } from '../../src/Models/Requests/Account/AccountUpdatePictureResponse';

describe('AccountClient', () => {
  let mockHttpClient: MockHttpClient;
  let accountClient: AccountClient;

  const mockAccountInfo: AccountInfo = {
    id: '1234567890@s.whatsapp.net',
    name: 'Test User',
    pushName: 'Test',
    status: 'Available',
    pictureUrl: 'https://example.com/picture.jpg',
  };

  const mockPictureResponse: AccountUpdatePictureResponse = {
    pictureId: 'pic123',
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    accountClient = new AccountClient(mockHttpClient as any);
  });

  describe('getInfoAsync', () => {
    it('should get account info', async () => {
      mockHttpClient.get.mockResolvedValue(mockAccountInfo);

      const result = await accountClient.getInfoAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/account/info');
      expect(result).toEqual(mockAccountInfo);
    });
  });

  describe('updateNameAsync', () => {
    it('should update account name', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await accountClient.updateNameAsync({ name: 'New Name' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/account/name', { name: 'New Name' });
    });
  });

  describe('updateStatusAsync', () => {
    it('should update account status', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await accountClient.updateStatusAsync({ status: 'Busy' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/account/status', { status: 'Busy' });
    });
  });

  describe('updatePictureAsync', () => {
    it('should update account picture', async () => {
      mockHttpClient.post.mockResolvedValue(mockPictureResponse);

      const result = await accountClient.updatePictureAsync({ picture: 'base64data' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/account/picture', { picture: 'base64data' });
      expect(result).toEqual(mockPictureResponse);
    });
  });

  describe('updatePresenceAsync', () => {
    it('should update account presence', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await accountClient.updatePresenceAsync({ presence: 'available' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/account/presence', { presence: 'available' });
    });
  });

  // Non-throwing methods
  describe('tryGetInfoAsync', () => {
    it('should return success response with account info', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockAccountInfo));

      const result = await accountClient.tryGetInfoAsync();

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/account/info');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockAccountInfo);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'Not found'));

      const result = await accountClient.tryGetInfoAsync();

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('tryUpdateNameAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await accountClient.tryUpdateNameAsync({ name: 'New Name' });

      expect(mockHttpClient.tryPutVoid).toHaveBeenCalledWith('/account/name', { name: 'New Name' });
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdateStatusAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await accountClient.tryUpdateStatusAsync({ status: 'Busy' });

      expect(mockHttpClient.tryPutVoid).toHaveBeenCalledWith('/account/status', { status: 'Busy' });
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdatePictureAsync', () => {
    it('should return success response with picture info', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockPictureResponse));

      const result = await accountClient.tryUpdatePictureAsync({ picture: 'base64data' });

      expect(mockHttpClient.tryPost).toHaveBeenCalledWith('/account/picture', { picture: 'base64data' });
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockPictureResponse);
    });
  });

  describe('tryUpdatePresenceAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await accountClient.tryUpdatePresenceAsync({ presence: 'available' });

      expect(mockHttpClient.tryPutVoid).toHaveBeenCalledWith('/account/presence', { presence: 'available' });
      expect(result.isSuccess).toBe(true);
    });
  });
});
