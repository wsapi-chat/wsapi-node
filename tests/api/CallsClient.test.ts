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
      mockHttpClient.putVoid.mockResolvedValue(undefined);

      await callsClient.rejectCallAsync('call123', { reason: 'busy' });

      expect(mockHttpClient.putVoid).toHaveBeenCalledWith('/calls/call123/reject', { reason: 'busy' });
    });
  });

  // Non-throwing methods
  describe('tryRejectCallAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await callsClient.tryRejectCallAsync('call123', { reason: 'busy' });

      expect(mockHttpClient.tryPutVoid).toHaveBeenCalledWith('/calls/call123/reject', { reason: 'busy' });
      expect(result.isSuccess).toBe(true);
    });

    it('should return error response on failure', async () => {
      mockHttpClient.tryPutVoid.mockResolvedValue(createErrorResponse(404, 'Call not found'));

      const result = await callsClient.tryRejectCallAsync('invalid', { reason: 'busy' });

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(404);
    });
  });
});
