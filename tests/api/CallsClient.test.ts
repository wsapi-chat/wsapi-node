import { describe, it, expect, beforeEach } from 'vitest';
import { CallsClient } from '../../src/ApiClient/CallsClient';
import { MockHttpClient, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';

describe('CallsClient', () => {
  let mockHttpClient: MockHttpClient;
  let callsClient: CallsClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    callsClient = new CallsClient(mockHttpClient as any);
  });

  describe('rejectCallAsync', () => {
    it('should reject a call', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);

      await callsClient.rejectCallAsync('call123', { callerId: '12025550123@s.whatsapp.net' });

      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('/calls/call123/reject', {
        callerId: '12025550123@s.whatsapp.net',
      });
    });
  });

  // Non-throwing methods
  describe('tryRejectCallAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await callsClient.tryRejectCallAsync('call123', { callerId: '12025550123@s.whatsapp.net' });

      expect(mockHttpClient.tryPostVoid).toHaveBeenCalledWith('/calls/call123/reject', {
        callerId: '12025550123@s.whatsapp.net',
      });
      expect(result.isSuccess).toBe(true);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createErrorResponse(404, 'Call not found'));

      const result = await callsClient.tryRejectCallAsync('invalid', { callerId: '12025550123@s.whatsapp.net' });

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });
});
