import { describe, it, expect, beforeEach } from 'vitest';
import { CommunitiesClient } from '../../src/ApiClient/CommunitiesClient';
import {
  MockHttpClient,
  createSuccessResponse,
  createVoidSuccessResponse,
  createErrorResponse,
} from '../mocks/MockHttpClient';
import type { CommunityInfo } from '../../src/Models/Entities/Communities/index';

describe('CommunitiesClient', () => {
  let mockHttpClient: MockHttpClient;
  let communitiesClient: CommunitiesClient;

  const mockCommunity: CommunityInfo = {
    id: 'community123@g.us',
    name: 'Test Community',
  };

  const mockMessageCreated = { id: 'msg123', timestamp: '2025-01-01T00:00:00Z' };

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    communitiesClient = new CommunitiesClient(mockHttpClient as any);
  });

  describe('listCommunitiesAsync', () => {
    it('should list communities', async () => {
      mockHttpClient.get.mockResolvedValue([mockCommunity]);

      const result = await communitiesClient.listCommunitiesAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/communities');
      expect(result).toEqual([mockCommunity]);
    });
  });

  describe('createCommunityAsync', () => {
    it('should create a community', async () => {
      mockHttpClient.post.mockResolvedValue(mockMessageCreated);

      const result = await communitiesClient.createCommunityAsync({ name: 'New Community' });

      expect(mockHttpClient.post).toHaveBeenCalledWith('/communities', { name: 'New Community' });
      expect(result).toEqual(mockMessageCreated);
    });
  });

  describe('getCommunityAsync', () => {
    it('should get community by id', async () => {
      mockHttpClient.get.mockResolvedValue(mockCommunity);

      const result = await communitiesClient.getCommunityAsync('community123@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/communities/community123@g.us');
      expect(result).toEqual(mockCommunity);
    });
  });

  describe('leaveCommunityAsync', () => {
    it('should leave a community', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);

      await communitiesClient.leaveCommunityAsync('community123@g.us');

      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('/communities/community123@g.us/leave');
    });
  });

  describe('setCommunityNameAsync', () => {
    it('should set community name', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await communitiesClient.setCommunityNameAsync('community123@g.us', 'New Name');

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/communities/community123@g.us/name', { name: 'New Name' });
    });
  });

  describe('setCommunityDescriptionAsync', () => {
    it('should set community description', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await communitiesClient.setCommunityDescriptionAsync('community123@g.us', 'New Desc');

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/communities/community123@g.us/description', {
        description: 'New Desc',
      });
    });
  });

  describe('setCommunityPictureAsync', () => {
    it('should set community picture', async () => {
      mockHttpClient.post.mockResolvedValue({ pictureId: 'pic123' });

      const result = await communitiesClient.setCommunityPictureAsync('community123@g.us', 'base64data');

      expect(mockHttpClient.post).toHaveBeenCalledWith('/communities/community123@g.us/picture', {
        data: 'base64data',
      });
      expect(result.pictureId).toBe('pic123');
    });
  });

  describe('setCommunityLockedAsync', () => {
    it('should set community locked', async () => {
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await communitiesClient.setCommunityLockedAsync('community123@g.us', true);

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/communities/community123@g.us/settings/locked', {
        enabled: true,
      });
    });
  });

  describe('getCommunityParticipantsAsync', () => {
    it('should get participants', async () => {
      const participants = [{ id: '123@s.whatsapp.net' }];
      mockHttpClient.get.mockResolvedValue(participants);

      const result = await communitiesClient.getCommunityParticipantsAsync('community123@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/communities/community123@g.us/participants');
      expect(result).toEqual(participants);
    });
  });

  describe('getCommunityInviteLinkAsync', () => {
    it('should get invite link', async () => {
      mockHttpClient.get.mockResolvedValue({ link: 'https://chat.whatsapp.com/ABC' });

      const result = await communitiesClient.getCommunityInviteLinkAsync('community123@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/communities/community123@g.us/invite-link');
      expect(result.link).toBe('https://chat.whatsapp.com/ABC');
    });
  });

  describe('getCommunitySubGroupsAsync', () => {
    it('should get sub-groups', async () => {
      const subGroups = [{ id: 'group1@g.us', name: 'Sub Group 1' }];
      mockHttpClient.get.mockResolvedValue(subGroups);

      const result = await communitiesClient.getCommunitySubGroupsAsync('community123@g.us');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/communities/community123@g.us/groups');
      expect(result).toEqual(subGroups);
    });
  });

  describe('unlinkGroupFromCommunityAsync', () => {
    it('should unlink a group', async () => {
      mockHttpClient.deleteVoid.mockResolvedValue(undefined);

      await communitiesClient.unlinkGroupFromCommunityAsync('community123@g.us', 'group1@g.us');

      expect(mockHttpClient.deleteVoid).toHaveBeenCalledWith('/communities/community123@g.us/groups/group1@g.us');
    });
  });

  // Non-throwing methods
  describe('tryListCommunitiesAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse([mockCommunity]));

      const result = await communitiesClient.tryListCommunitiesAsync();

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual([mockCommunity]);
    });
  });

  describe('tryGetCommunityAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockCommunity));

      const result = await communitiesClient.tryGetCommunityAsync('community123@g.us');

      expect(result.isSuccess).toBe(true);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(404, 'Not found'));

      const result = await communitiesClient.tryGetCommunityAsync('invalid');

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });

  describe('tryCreateCommunityAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse(mockMessageCreated));

      const result = await communitiesClient.tryCreateCommunityAsync({ name: 'Test' });

      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryLeaveCommunityAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await communitiesClient.tryLeaveCommunityAsync('community123@g.us');

      expect(result.isSuccess).toBe(true);
    });
  });
});
