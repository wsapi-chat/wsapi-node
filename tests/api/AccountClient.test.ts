import { describe, it, expect, beforeEach } from 'vitest';
import { AccountClient } from '../../src/ApiClient/AccountClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { AccountInstance, AccountInstanceDetail, AccountInstanceSettings, AccountSubscription, AccountSubscriptionChange, AccountInstanceDefaults, PagedResponse } from '../../src/Models/Entities/Accounts/index';

describe('AccountClient', () => {
  let mockHttpClient: MockHttpClient;
  let accountClient: AccountClient;

  const mockInstance: AccountInstance = {
    id: 'inst-123',
    name: 'Test Instance',
    status: 'active',
  };

  const mockInstanceDetail: AccountInstanceDetail = {
    id: 'inst-123',
    name: 'Test Instance',
    status: 'active',
    apiKey: 'key-123',
  };

  const mockSettings: AccountInstanceSettings = {
    webhookUrl: 'https://example.com/webhook',
  };

  const mockSubscription: AccountSubscription = {
    id: 'sub-123',
    plan: 'pro',
  };

  const mockDefaults: AccountInstanceDefaults = {
    webhookUrl: 'https://default.example.com/webhook',
  };

  const mockPagedInstances: PagedResponse<AccountInstance> = {
    items: [mockInstance],
    totalCount: 1,
    pageNumber: 1,
    pageSize: 10,
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    accountClient = new AccountClient(mockHttpClient as any);
  });

  describe('listInstancesAsync', () => {
    it('should list instances', async () => {
      mockHttpClient.get.mockResolvedValue(mockPagedInstances);

      const result = await accountClient.listInstancesAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/account/instances');
      expect(result).toEqual(mockPagedInstances);
    });

    it('should list instances with query params', async () => {
      mockHttpClient.get.mockResolvedValue(mockPagedInstances);

      await accountClient.listInstancesAsync(1, 20, '2025-01-01', '2025-12-31', 'active');

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/account/instances?pageNumber=1&pageSize=20&createdFrom=2025-01-01&createdTo=2025-12-31&status=active'
      );
    });
  });

  describe('getInstanceAsync', () => {
    it('should get instance by id', async () => {
      mockHttpClient.get.mockResolvedValue(mockInstanceDetail);

      const result = await accountClient.getInstanceAsync('inst-123');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/account/instances/inst-123');
      expect(result).toEqual(mockInstanceDetail);
    });
  });

  describe('updateInstanceNameAsync', () => {
    it('should update instance name', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await accountClient.updateInstanceNameAsync('inst-123', { name: 'New Name' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/account/instances/inst-123/name', { name: 'New Name' });
    });
  });

  describe('updateInstanceSettingsAsync', () => {
    it('should update instance settings', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await accountClient.updateInstanceSettingsAsync('inst-123', mockSettings);

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/account/instances/inst-123/settings', mockSettings);
    });
  });

  describe('regenerateInstanceApiKeyAsync', () => {
    it('should regenerate API key', async () => {
      mockHttpClient.put.mockResolvedValue('new-api-key');

      const result = await accountClient.regenerateInstanceApiKeyAsync('inst-123');

      expect(mockHttpClient.put).toHaveBeenCalledWith('/account/instances/inst-123/apikey');
      expect(result).toBe('new-api-key');
    });
  });

  describe('restartInstanceAsync', () => {
    it('should restart instance', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await accountClient.restartInstanceAsync('inst-123');

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/account/instances/inst-123/restart');
    });
  });

  describe('listSubscriptionsAsync', () => {
    it('should list subscriptions', async () => {
      const mockPaged: PagedResponse<AccountSubscription> = {
        items: [mockSubscription],
        totalCount: 1,
        pageNumber: 1,
        pageSize: 10,
      };
      mockHttpClient.get.mockResolvedValue(mockPaged);

      const result = await accountClient.listSubscriptionsAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/account/subscriptions');
      expect(result).toEqual(mockPaged);
    });
  });

  describe('getInstanceDefaultsAsync', () => {
    it('should get instance defaults', async () => {
      mockHttpClient.get.mockResolvedValue(mockDefaults);

      const result = await accountClient.getInstanceDefaultsAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/account/instances/defaults');
      expect(result).toEqual(mockDefaults);
    });
  });

  describe('updateInstanceDefaultsAsync', () => {
    it('should update instance defaults', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await accountClient.updateInstanceDefaultsAsync(mockDefaults);

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/account/instances/defaults', mockDefaults);
    });
  });

  // Non-throwing methods
  describe('tryListInstancesAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockPagedInstances));

      const result = await accountClient.tryListInstancesAsync();

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/account/instances');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockPagedInstances);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(401, 'Unauthorized'));

      const result = await accountClient.tryListInstancesAsync();

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(401);
    });
  });

  describe('tryGetInstanceAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockInstanceDetail));

      const result = await accountClient.tryGetInstanceAsync('inst-123');

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/account/instances/inst-123');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockInstanceDetail);
    });
  });

  describe('tryUpdateInstanceNameAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await accountClient.tryUpdateInstanceNameAsync('inst-123', { name: 'New Name' });

      expect(mockHttpClient.tryPutVoid).toHaveBeenCalledWith('/account/instances/inst-123/name', { name: 'New Name' });
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryRegenerateInstanceApiKeyAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPut.mockResolvedValue(createSuccessResponse('new-api-key'));

      const result = await accountClient.tryRegenerateInstanceApiKeyAsync('inst-123');

      expect(mockHttpClient.tryPut).toHaveBeenCalledWith('/account/instances/inst-123/apikey');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toBe('new-api-key');
    });
  });

  describe('tryRestartInstanceAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await accountClient.tryRestartInstanceAsync('inst-123');

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryGetInstanceDefaultsAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockDefaults));

      const result = await accountClient.tryGetInstanceDefaultsAsync();

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/account/instances/defaults');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockDefaults);
    });
  });

  describe('tryUpdateInstanceDefaultsAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await accountClient.tryUpdateInstanceDefaultsAsync(mockDefaults);

      expect(result.isSuccess).toBe(true);
    });
  });
});
