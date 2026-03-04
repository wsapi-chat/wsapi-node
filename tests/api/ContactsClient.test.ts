import { describe, it, expect, beforeEach } from 'vitest';
import { ContactsClient } from '../../src/ApiClient/ContactsClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { ContactInfo } from '../../src/Models/Entities/Contacts/index';

describe('ContactsClient', () => {
  let mockHttpClient: MockHttpClient;
  let contactsClient: ContactsClient;

  const mockContactInfo: ContactInfo = {
    id: '1234567890@s.whatsapp.net',
    fullName: 'Test Contact',
    pushName: 'Test',
    phoneNumber: '+1234567890',
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    contactsClient = new ContactsClient(mockHttpClient as any);
  });

  describe('listAsync', () => {
    it('should list all contacts', async () => {
      mockHttpClient.get.mockResolvedValue([mockContactInfo]);

      const result = await contactsClient.listAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/contacts');
      expect(result).toEqual([mockContactInfo]);
    });
  });

  describe('getAsync', () => {
    it('should get contact by id', async () => {
      mockHttpClient.get.mockResolvedValue(mockContactInfo);

      const result = await contactsClient.getAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/contacts/1234567890@s.whatsapp.net');
      expect(result).toEqual(mockContactInfo);
    });
  });

  describe('createAsync', () => {
    it('should create a contact', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);

      await contactsClient.createAsync({ phoneNumber: '+1234567890', name: 'New Contact' });

      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('/contacts', {
        phoneNumber: '+1234567890',
        name: 'New Contact',
      });
    });
  });

  describe('syncContactsAsync', () => {
    it('should sync contacts', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);

      await contactsClient.syncContactsAsync();

      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('/contacts/sync');
    });
  });

  describe('getBlocklistAsync', () => {
    it('should get blocklist', async () => {
      const blocklist = [{ id: '1234567890@s.whatsapp.net' }];
      mockHttpClient.get.mockResolvedValue(blocklist);

      const result = await contactsClient.getBlocklistAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/contacts/blocklist');
      expect(result).toEqual(blocklist);
    });
  });

  describe('blockContactAsync', () => {
    it('should block a contact', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await contactsClient.blockContactAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/contacts/1234567890@s.whatsapp.net/block');
    });
  });

  describe('unblockContactAsync', () => {
    it('should unblock a contact', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await contactsClient.unblockContactAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/contacts/1234567890@s.whatsapp.net/unblock');
    });
  });

  // Non-throwing methods
  describe('tryListAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse([mockContactInfo]));

      const result = await contactsClient.tryListAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual([mockContactInfo]);
    });
  });

  describe('tryGetAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockContactInfo));

      const result = await contactsClient.tryGetAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockContactInfo);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'Contact not found'));

      const result = await contactsClient.tryGetAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('tryCreateAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await contactsClient.tryCreateAsync({ phoneNumber: '+1234567890', name: 'New Contact' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('trySyncContactsAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await contactsClient.trySyncContactsAsync();

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryGetBlocklistAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse([{ id: '123@s.whatsapp.net' }]));

      const result = await contactsClient.tryGetBlocklistAsync();

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryBlockContactAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await contactsClient.tryBlockContactAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUnblockContactAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await contactsClient.tryUnblockContactAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
    });
  });
});
