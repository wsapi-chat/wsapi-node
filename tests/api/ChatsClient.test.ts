import { describe, it, expect, beforeEach } from 'vitest';
import { ChatsClient } from '../../src/ApiClient/ChatsClient';
import {
  MockHttpClient,
  createSuccessResponse,
  createVoidSuccessResponse,
  createErrorResponse,
} from '../mocks/MockHttpClient';
import type { ChatListItem, ChatPicture, ChatBusinessProfile } from '../../src/Models/Entities/Chats/index';

describe('ChatsClient', () => {
  let mockHttpClient: MockHttpClient;
  let chatsClient: ChatsClient;

  const mockChatInfo: ChatListItem = {
    id: '1234567890@s.whatsapp.net',
    isGroup: false,
    isArchived: false,
    isPinned: false,
    isMuted: false,
    pushName: 'Test Chat',
  };

  const mockChatPicture: ChatPicture = {
    pictureId: 'pic123',
    pictureUrl: 'https://example.com/picture.jpg',
  };

  const mockBusinessProfile: ChatBusinessProfile = {
    description: 'Business description',
    website: 'https://example.com',
    email: 'contact@example.com',
    categories: ['Technology'],
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    chatsClient = new ChatsClient(mockHttpClient as any);
  });

  describe('listAsync', () => {
    it('should list all chats', async () => {
      mockHttpClient.get.mockResolvedValue([mockChatInfo]);

      const result = await chatsClient.listAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/chats');
      expect(result).toEqual([mockChatInfo]);
    });
  });

  describe('getAsync', () => {
    it('should get chat by id', async () => {
      mockHttpClient.get.mockResolvedValue(mockChatInfo);

      const result = await chatsClient.getAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net');
      expect(result).toEqual(mockChatInfo);
    });
  });

  describe('getPictureAsync', () => {
    it('should get chat picture', async () => {
      mockHttpClient.get.mockResolvedValue(mockChatPicture);

      const result = await chatsClient.getPictureAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/picture');
      expect(result).toEqual(mockChatPicture);
    });
  });

  describe('getBusinessProfileAsync', () => {
    it('should get business profile', async () => {
      mockHttpClient.get.mockResolvedValue(mockBusinessProfile);

      const result = await chatsClient.getBusinessProfileAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/business');
      expect(result).toEqual(mockBusinessProfile);
    });
  });

  describe('setPresenceAsync', () => {
    it('should set presence', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await chatsClient.setPresenceAsync('1234567890@s.whatsapp.net', { presence: 'composing' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/presence/set', {
        presence: 'composing',
      });
    });
  });

  describe('subscribePresenceAsync', () => {
    it('should subscribe to presence', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await chatsClient.subscribePresenceAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/presence/subscribe');
    });
  });

  describe('updateEphemeralAsync', () => {
    it('should update ephemeral settings', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await chatsClient.updateEphemeralAsync('1234567890@s.whatsapp.net', { ephemeralExpiration: '24h' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/ephemeral', {
        ephemeralExpiration: '24h',
      });
    });
  });

  describe('updateMuteAsync', () => {
    it('should update mute settings', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await chatsClient.updateMuteAsync('1234567890@s.whatsapp.net', { mute: true, duration: '8h' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/mute', {
        mute: true,
        duration: '8h',
      });
    });
  });

  describe('updatePinAsync', () => {
    it('should update pin settings', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await chatsClient.updatePinAsync('1234567890@s.whatsapp.net', { pin: true });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/pin', { pin: true });
    });
  });

  describe('updateArchiveAsync', () => {
    it('should update archive settings', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await chatsClient.updateArchiveAsync('1234567890@s.whatsapp.net', { archive: true });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/archive', {
        archive: true,
      });
    });
  });

  describe('updateReadAsync', () => {
    it('should update read status', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await chatsClient.updateReadAsync('1234567890@s.whatsapp.net', { read: true });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/read', { read: true });
    });
  });

  describe('deleteChatAsync', () => {
    it('should delete chat', async () => {
      mockHttpClient.deleteVoid.mockResolvedValue(undefined);

      await chatsClient.deleteChatAsync('1234567890@s.whatsapp.net');

      expect(mockHttpClient.deleteVoid).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net');
    });
  });

  // Non-throwing methods
  describe('tryListAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse([mockChatInfo]));

      const result = await chatsClient.tryListAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual([mockChatInfo]);
    });
  });

  describe('tryGetAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockChatInfo));

      const result = await chatsClient.tryGetAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockChatInfo);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'Chat not found'));

      const result = await chatsClient.tryGetAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('tryGetPictureAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockChatPicture));

      const result = await chatsClient.tryGetPictureAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockChatPicture);
    });
  });

  describe('tryGetBusinessProfileAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockBusinessProfile));

      const result = await chatsClient.tryGetBusinessProfileAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockBusinessProfile);
    });
  });

  describe('trySetPresenceAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.trySetPresenceAsync('1234567890@s.whatsapp.net', { presence: 'composing' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('trySubscribePresenceAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.trySubscribePresenceAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdateEphemeralAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.tryUpdateEphemeralAsync('1234567890@s.whatsapp.net', {
        ephemeralExpiration: '7d',
      });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdateMuteAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.tryUpdateMuteAsync('1234567890@s.whatsapp.net', { mute: true });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdatePinAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.tryUpdatePinAsync('1234567890@s.whatsapp.net', { pin: true });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdateArchiveAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.tryUpdateArchiveAsync('1234567890@s.whatsapp.net', { archive: true });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdateReadAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.tryUpdateReadAsync('1234567890@s.whatsapp.net', { read: true });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryDeleteChatAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryDeleteVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await chatsClient.tryDeleteChatAsync('1234567890@s.whatsapp.net');

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('requestMessagesAsync', () => {
    it('should request messages', async () => {
      mockHttpClient.post.mockResolvedValue({ status: 'ok' });

      const result = await chatsClient.requestMessagesAsync('1234567890@s.whatsapp.net', {
        lastMessageId: 'msg123',
        lastMessageSenderId: 'sender123',
        count: 50,
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/chats/1234567890@s.whatsapp.net/messages', {
        lastMessageId: 'msg123',
        lastMessageSenderId: 'sender123',
        count: 50,
      });
      expect(result.status).toBe('ok');
    });
  });

  describe('tryRequestMessagesAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse({ status: 'ok' }));

      const result = await chatsClient.tryRequestMessagesAsync('1234567890@s.whatsapp.net', {
        lastMessageId: 'msg123',
        lastMessageSenderId: 'sender123',
      });

      expect(result.isSuccess).toBe(true);
    });
  });
});
