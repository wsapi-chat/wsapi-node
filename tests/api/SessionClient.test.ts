import { describe, it, expect, beforeEach } from 'vitest';
import { SessionClient } from '../../src/ApiClient/SessionClient';
import { MockHttpClient, createSuccessResponse, createVoidSuccessResponse, createErrorResponse } from '../mocks/MockHttpClient';
import type { SessionStatus, SessionPairCode, SessionQRCode } from '../../src/Models/Entities/Session/index';

describe('SessionClient', () => {
  let mockHttpClient: MockHttpClient;
  let sessionClient: SessionClient;

  const mockSessionStatus: SessionStatus = {
    status: 'connected',
    phoneNumber: '+1234567890',
  };

  const mockPairCode: SessionPairCode = {
    code: '12345678',
  };

  const mockQRCode: SessionQRCode = {
    qrCode: 'data:image/png;base64,ABC123...',
  };

  const mockQRImage = new ArrayBuffer(100);

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    sessionClient = new SessionClient(mockHttpClient as any);
  });

  describe('getLoginQRImageAsync', () => {
    it('should get QR code image', async () => {
      mockHttpClient.getBinary.mockResolvedValue(mockQRImage);

      const result = await sessionClient.getLoginQRImageAsync();

      expect(mockHttpClient.getBinary).toHaveBeenCalledWith('/session/login/qr/image');
      expect(result).toBe(mockQRImage);
    });
  });

  describe('getLoginQRCodeAsync', () => {
    it('should get QR code', async () => {
      mockHttpClient.get.mockResolvedValue(mockQRCode);

      const result = await sessionClient.getLoginQRCodeAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/session/login/qr/code');
      expect(result).toEqual(mockQRCode);
    });
  });

  describe('getLoginPairCodeAsync', () => {
    it('should get pairing code', async () => {
      mockHttpClient.get.mockResolvedValue(mockPairCode);

      const result = await sessionClient.getLoginPairCodeAsync('+1234567890');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/session/login/code/+1234567890');
      expect(result).toEqual(mockPairCode);
    });
  });

  describe('logoutAsync', () => {
    it('should logout', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);

      await sessionClient.logoutAsync();

      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('/session/logout');
    });
  });

  describe('getSessionStatusAsync', () => {
    it('should get session status', async () => {
      mockHttpClient.get.mockResolvedValue(mockSessionStatus);

      const result = await sessionClient.getSessionStatusAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/session/status');
      expect(result).toEqual(mockSessionStatus);
    });
  });

  // Non-throwing methods
  describe('tryGetLoginQRImageAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGetBinary.mockResolvedValue(createSuccessResponse(mockQRImage));

      const result = await sessionClient.tryGetLoginQRImageAsync();

      expect(mockHttpClient.tryGetBinary).toHaveBeenCalledWith('/session/login/qr/image');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toBe(mockQRImage);
    });
  });

  describe('tryGetLoginQRCodeAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockQRCode));

      const result = await sessionClient.tryGetLoginQRCodeAsync();

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/session/login/qr/code');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockQRCode);
    });

    it('should return error response when not ready', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createErrorResponse(503, 'Session not ready'));

      const result = await sessionClient.tryGetLoginQRCodeAsync();

      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(503);
    });
  });

  describe('tryGetLoginPairCodeAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockPairCode));

      const result = await sessionClient.tryGetLoginPairCodeAsync('+1234567890');

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/session/login/code/+1234567890');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockPairCode);
    });
  });

  describe('tryLogoutAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      const result = await sessionClient.tryLogoutAsync();

      expect(mockHttpClient.tryPostVoid).toHaveBeenCalledWith('/session/logout');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('tryGetSessionStatusAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockSessionStatus));

      const result = await sessionClient.tryGetSessionStatusAsync();

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/session/status');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockSessionStatus);
    });
  });
});
