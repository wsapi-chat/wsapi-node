import { describe, it, expect, beforeEach } from 'vitest';
import { ContactsClient } from '../../src/ApiClient/ContactsClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { ContactInfo } from '../../src/Models/Entities/Contacts/index';

describe('ContactsClient', () => {
  let mockHttpClient: MockHttpClient;
  let contactsClient: ContactsClient;

  const mockContactInfo: ContactInfo = {
    id: '1234567890@s.whatsapp.net',
    name: 'Test Contact',
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

  describe('updateAsync', () => {
    it('should update a contact', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await contactsClient.updateAsync('1234567890@s.whatsapp.net', { name: 'Updated Name' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith(
        '/contacts/1234567890@s.whatsapp.net',
        { name: 'Updated Name' }
      );
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

  describe('tryUpdateAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await contactsClient.tryUpdateAsync('1234567890@s.whatsapp.net', { name: 'Updated' });

      expect(result.isSuccess).toBe(true);
    });
  });
});
