import { describe, it, expect, beforeEach } from 'vitest';
import { InstanceClient } from '../../src/ApiClient/InstanceClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { InstanceSettings } from '../../src/Models/Entities/Instance/InstanceSettings';

describe('InstanceClient', () => {
  let mockHttpClient: MockHttpClient;
  let instanceClient: InstanceClient;

  const mockSettings: InstanceSettings = {
    webhookUrl: 'https://example.com/webhook',
    webhookEvents: ['message', 'chat_presence'],
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    instanceClient = new InstanceClient(mockHttpClient as any);
  });

  describe('getSettingsAsync', () => {
    it('should get instance settings', async () => {
      mockHttpClient.get.mockResolvedValue(mockSettings);

      const result = await instanceClient.getSettingsAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/instance/settings');
      expect(result).toEqual(mockSettings);
    });
  });

  describe('updateSettingsAsync', () => {
    it('should update instance settings', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await instanceClient.updateSettingsAsync(mockSettings);

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/instance/settings', mockSettings);
    });
  });

  describe('restartAsync', () => {
    it('should restart instance', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await instanceClient.restartAsync();

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/instance/restart');
    });
  });

  describe('updateApiKeyAsync', () => {
    it('should update API key', async () => {
      mockHttpClient.put.mockResolvedValue('new-api-key-123');

      const result = await instanceClient.updateApiKeyAsync();

      expect(mockHttpClient.put).toHaveBeenCalledWith('/instance/apikey');
      expect(result).toBe('new-api-key-123');
    });
  });

  // Non-throwing methods
  describe('tryGetSettingsAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockSettings));

      const result = await instanceClient.tryGetSettingsAsync();

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/instance/settings');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockSettings);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(401, 'Unauthorized'));

      const result = await instanceClient.tryGetSettingsAsync();

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(401);
    });
  });

  describe('tryUpdateSettingsAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await instanceClient.tryUpdateSettingsAsync(mockSettings);

      expect(mockHttpClient.tryPutVoid).toHaveBeenCalledWith('/instance/settings', mockSettings);
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryRestartAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await instanceClient.tryRestartAsync();

      expect(mockHttpClient.tryPutVoid).toHaveBeenCalledWith('/instance/restart');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdateApiKeyAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPut.mockResolvedValue(createSuccessResponse('new-api-key-123'));

      const result = await instanceClient.tryUpdateApiKeyAsync();

      expect(mockHttpClient.tryPut).toHaveBeenCalledWith('/instance/apikey');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toBe('new-api-key-123');
    });
  });
});
