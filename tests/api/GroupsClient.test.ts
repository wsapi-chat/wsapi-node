import { describe, it, expect, beforeEach } from 'vitest';
import { GroupsClient } from '../../src/ApiClient/GroupsClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { GroupInfo, GroupCreated, GroupPictureUpdated, GroupInviteInfo } from '../../src/Models/Entities/Groups/index';

describe('GroupsClient', () => {
  let mockHttpClient: MockHttpClient;
  let groupsClient: GroupsClient;

  const mockGroupInfo: GroupInfo = {
    id: '1234567890@g.us',
    name: 'Test Group',
    description: 'Test Description',
    participants: [],
  };

  const mockGroupCreated: GroupCreated = {
    id: '1234567890@g.us',
    inviteCode: 'ABC123',
  };

  const mockPictureUpdated: GroupPictureUpdated = {
    pictureId: 'pic123',
  };

  const mockInviteInfo: GroupInviteInfo = {
    id: '1234567890@g.us',
    name: 'Test Group',
  };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    groupsClient = new GroupsClient(mockHttpClient as any);
  });

  describe('listAsync', () => {
    it('should list all groups', async () => {
      mockHttpClient.get.mockResolvedValue([mockGroupInfo]);

      const result = await groupsClient.listAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/groups');
      expect(result).toEqual([mockGroupInfo]);
    });
  });

  describe('getAsync', () => {
    it('should get group by id', async () => {
      mockHttpClient.get.mockResolvedValue(mockGroupInfo);

      const result = await groupsClient.getAsync('1234567890@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/groups/1234567890@g.us');
      expect(result).toEqual(mockGroupInfo);
    });
  });

  describe('createAsync', () => {
    it('should create a group', async () => {
      mockHttpClient.post.mockResolvedValue(mockGroupCreated);

      const result = await groupsClient.createAsync({
        name: 'New Group',
        participants: ['1234567890@s.whatsapp.net'],
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/groups', {
        name: 'New Group',
        participants: ['1234567890@s.whatsapp.net'],
      });
      expect(result).toEqual(mockGroupCreated);
    });
  });

  describe('updateDescriptionAsync', () => {
    it('should update group description', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await groupsClient.updateDescriptionAsync('1234567890@g.us', { description: 'New Description' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith(
        '/groups/1234567890@g.us/description',
        { description: 'New Description' }
      );
    });
  });

  describe('updateNameAsync', () => {
    it('should update group name', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await groupsClient.updateNameAsync('1234567890@g.us', { name: 'New Name' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith(
        '/groups/1234567890@g.us/name',
        { name: 'New Name' }
      );
    });
  });

  describe('updatePictureAsync', () => {
    it('should update group picture', async () => {
      mockHttpClient.post.mockResolvedValue(mockPictureUpdated);

      const result = await groupsClient.updatePictureAsync('1234567890@g.us', { picture: 'base64data' });

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/groups/1234567890@g.us/picture',
        { picture: 'base64data' }
      );
      expect(result).toEqual(mockPictureUpdated);
    });
  });

  describe('getInviteLinkAsync', () => {
    it('should get group invite link', async () => {
      mockHttpClient.get.mockResolvedValue('https://chat.whatsapp.com/ABC123');

      const result = await groupsClient.getInviteLinkAsync('1234567890@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/groups/1234567890@g.us/invite-link');
      expect(result).toBe('https://chat.whatsapp.com/ABC123');
    });
  });

  describe('getJoinRequestsAsync', () => {
    it('should get group join requests', async () => {
      const requests = ['1111111111@s.whatsapp.net', '2222222222@s.whatsapp.net'];
      mockHttpClient.get.mockResolvedValue(requests);

      const result = await groupsClient.getJoinRequestsAsync('1234567890@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/groups/1234567890@g.us/requests');
      expect(result).toEqual(requests);
    });
  });

  describe('updateParticipantsAsync', () => {
    it('should update group participants', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await groupsClient.updateParticipantsAsync('1234567890@g.us', {
        participants: ['1111111111@s.whatsapp.net'],
      });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith(
        '/groups/1234567890@g.us/participants',
        { participants: ['1111111111@s.whatsapp.net'] }
      );
    });
  });

  describe('getInviteInfoAsync', () => {
    it('should get invite info', async () => {
      mockHttpClient.get.mockResolvedValue(mockInviteInfo);

      const result = await groupsClient.getInviteInfoAsync('ABC123');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/groups/invite/ABC123');
      expect(result).toEqual(mockInviteInfo);
    });
  });

  // Non-throwing methods
  describe('tryListAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse([mockGroupInfo]));

      const result = await groupsClient.tryListAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual([mockGroupInfo]);
    });
  });

  describe('tryGetAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockGroupInfo));

      const result = await groupsClient.tryGetAsync('1234567890@g.us');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockGroupInfo);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'Group not found'));

      const result = await groupsClient.tryGetAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('tryCreateAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockGroupCreated));

      const result = await groupsClient.tryCreateAsync({
        name: 'New Group',
        participants: ['1234567890@s.whatsapp.net'],
      });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockGroupCreated);
    });
  });

  describe('tryUpdateDescriptionAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await groupsClient.tryUpdateDescriptionAsync('1234567890@g.us', { description: 'New' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdateNameAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await groupsClient.tryUpdateNameAsync('1234567890@g.us', { name: 'New Name' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryUpdatePictureAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockPictureUpdated));

      const result = await groupsClient.tryUpdatePictureAsync('1234567890@g.us', { picture: 'base64' });

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockPictureUpdated);
    });
  });

  describe('tryGetInviteLinkAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse('https://chat.whatsapp.com/ABC123'));

      const result = await groupsClient.tryGetInviteLinkAsync('1234567890@g.us');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toBe('https://chat.whatsapp.com/ABC123');
    });
  });

  describe('tryGetJoinRequestsAsync', () => {
    it('should return success response', async () => {
      const requests = ['1111111111@s.whatsapp.net'];
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(requests));

      const result = await groupsClient.tryGetJoinRequestsAsync('1234567890@g.us');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(requests);
    });
  });

  describe('tryUpdateParticipantsAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await groupsClient.tryUpdateParticipantsAsync('1234567890@g.us', {
        participants: ['1111111111@s.whatsapp.net'],
      });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryGetInviteInfoAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockInviteInfo));

      const result = await groupsClient.tryGetInviteInfoAsync('ABC123');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockInviteInfo);
    });
  });

  describe('getParticipantsAsync', () => {
    it('should get group participants', async () => {
      const participants = [{ id: '1234567890@s.whatsapp.net', phone: '1234567890' }];
      mockHttpClient.get.mockResolvedValue(participants);

      const result = await groupsClient.getParticipantsAsync('1234567890@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/groups/1234567890@g.us/participants');
      expect(result).toEqual(participants);
    });
  });

  describe('tryGetParticipantsAsync', () => {
    it('should return success response', async () => {
      const participants = [{ id: '1234567890@s.whatsapp.net' }];
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(participants));

      const result = await groupsClient.tryGetParticipantsAsync('1234567890@g.us');

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(participants);
    });
  });
});
