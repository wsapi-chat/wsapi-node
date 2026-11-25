import { describe, it, expect, beforeEach } from 'vitest';
import { SessionClient } from '../../src/ApiClient/SessionClient';
import {
  MockHttpClient,
  createSuccessResponse,
  createVoidSuccessResponse,
  createErrorResponse,
} from '../mocks/MockHttpClient';
import type {
  SessionStatus,
  SessionPairCode,
  SessionQRCode,
  PasskeyState,
} from '../../src/Models/Entities/Session/index';
import type { PasskeyAssertion } from '../../src/Models/Requests/Session/index';

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
    code: 'data:image/png;base64,ABC123...',
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

      expect(mockHttpClient.getBinary).toHaveBeenCalledWith('/session/qr');
      expect(result).toBe(mockQRImage);
    });
  });

  describe('getLoginQRCodeAsync', () => {
    it('should get QR code', async () => {
      mockHttpClient.get.mockResolvedValue(mockQRCode);

      const result = await sessionClient.getLoginQRCodeAsync();

      expect(mockHttpClient.get).toHaveBeenCalledWith('/session/qr/text');
      expect(result).toEqual(mockQRCode);
    });
  });

  describe('getLoginPairCodeAsync', () => {
    it('should get pairing code', async () => {
      mockHttpClient.get.mockResolvedValue(mockPairCode);

      const result = await sessionClient.getLoginPairCodeAsync('+1234567890');

      expect(mockHttpClient.get).toHaveBeenCalledWith('/session/pair-code/+1234567890');
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

      expect(mockHttpClient.tryGetBinary).toHaveBeenCalledWith('/session/qr');
      expect(result.isSuccess).toBe(true);
      expect(result.data).toBe(mockQRImage);
    });
  });

  describe('tryGetLoginQRCodeAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(mockQRCode));

      const result = await sessionClient.tryGetLoginQRCodeAsync();

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/session/qr/text');
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

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/session/pair-code/+1234567890');
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

  describe('flushHistoryAsync', () => {
    it('should flush history', async () => {
      mockHttpClient.post.mockResolvedValue({ status: 'ok' });

      const result = await sessionClient.flushHistoryAsync();

      expect(mockHttpClient.post).toHaveBeenCalledWith('/session/flush-history');
      expect(result.status).toBe('ok');
    });
  });

  describe('tryFlushHistoryAsync', () => {
    it('should return success response', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse({ status: 'ok' }));

      const result = await sessionClient.tryFlushHistoryAsync();

      expect(mockHttpClient.tryPost).toHaveBeenCalledWith('/session/flush-history');
      expect(result.isSuccess).toBe(true);
    });
  });
  describe('passkey pairing', () => {
    const requiredState: PasskeyState = {
      status: 'required',
      source: 'notification',
      origin: 'https://web.whatsapp.com',
      challenge: {
        challenge: 'Y2hhbGxlbmdl',
        timeout: 60000,
        rpId: 'whatsapp.com',
        allowCredentials: [{ id: 'Y3JlZA', type: 'public-key', transports: ['internal'] }],
        userVerification: 'required',
      },
      requestedAt: '2026-11-25T10:00:00Z',
      expiresAt: '2026-11-25T10:05:00Z',
    };
    const assertion: PasskeyAssertion = {
      id: 'Y3JlZA',
      rawId: 'Y3JlZA',
      type: 'public-key',
      response: { clientDataJSON: 'e30', authenticatorData: 'YXV0aA', signature: 'c2ln', userHandle: null },
    };

    it('getPasskeyStateAsync gets the passkey state', async () => {
      mockHttpClient.get.mockResolvedValue(requiredState);
      expect(await sessionClient.getPasskeyStateAsync()).toEqual(requiredState);
      expect(mockHttpClient.get).toHaveBeenCalledWith('/session/passkey');
    });

    it('submitPasskeyAsync posts the assertion', async () => {
      mockHttpClient.post.mockResolvedValue({ status: 'submitted' });
      const result = await sessionClient.submitPasskeyAsync(assertion);
      expect(mockHttpClient.post).toHaveBeenCalledWith('/session/passkey', assertion);
      expect(result.status).toBe('submitted');
    });

    it('requestPasskeyAsync requests a challenge without a body', async () => {
      mockHttpClient.post.mockResolvedValue({ ...requiredState, source: 'requested' });
      const result = await sessionClient.requestPasskeyAsync();
      expect(mockHttpClient.post).toHaveBeenCalledWith('/session/passkey/request');
      expect(result.source).toBe('requested');
    });

    it('confirmPasskeyAsync posts the confirmation', async () => {
      mockHttpClient.postVoid.mockResolvedValue(undefined);
      await sessionClient.confirmPasskeyAsync();
      expect(mockHttpClient.postVoid).toHaveBeenCalledWith('/session/passkey/confirm');
    });

    it('try variants call the same routes', async () => {
      mockHttpClient.tryGet.mockResolvedValue(createSuccessResponse(requiredState));
      mockHttpClient.tryPost.mockResolvedValue(createSuccessResponse({ status: 'confirmation_required' }));
      mockHttpClient.tryPostVoid.mockResolvedValue(createVoidSuccessResponse());

      expect((await sessionClient.tryGetPasskeyStateAsync()).data).toEqual(requiredState);
      expect((await sessionClient.trySubmitPasskeyAsync(assertion)).isSuccess).toBe(true);
      expect((await sessionClient.tryRequestPasskeyAsync()).isSuccess).toBe(true);
      expect((await sessionClient.tryConfirmPasskeyAsync()).isSuccess).toBe(true);

      expect(mockHttpClient.tryGet).toHaveBeenCalledWith('/session/passkey');
      expect(mockHttpClient.tryPost).toHaveBeenCalledWith('/session/passkey', assertion);
      expect(mockHttpClient.tryPost).toHaveBeenCalledWith('/session/passkey/request');
      expect(mockHttpClient.tryPostVoid).toHaveBeenCalledWith('/session/passkey/confirm');
    });

    it('trySubmitPasskeyAsync surfaces 409 when no step is pending', async () => {
      mockHttpClient.tryPost.mockResolvedValue(createErrorResponse(409, 'no passkey verification pending'));
      const result = await sessionClient.trySubmitPasskeyAsync(assertion);
      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(409);
    });

    it('tryGetLoginQRCodeAsync surfaces 409 while a passkey step is pending', async () => {
      mockHttpClient.tryGet.mockResolvedValue(
        createErrorResponse(
          409,
          'passkey verification pending: complete it via /session/passkey or wait for it to expire',
        ),
      );
      const result = await sessionClient.tryGetLoginQRCodeAsync();
      expect(result.isSuccess).toBe(false);
      expect(result.statusCode).toBe(409);
    });
  });
});
