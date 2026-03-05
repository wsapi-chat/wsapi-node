import { describe, it, expect } from 'vitest';
import { createHmac } from 'node:crypto';
import { verifySignature } from '../../src/Webhook/WebhookSignature';

function sign(body: string, secret: string): string {
  return 'sha256=' + createHmac('sha256', secret).update(body).digest('hex');
}

describe('verifySignature', () => {
  const secret = 'test-secret-key';
  const body = '{"eventType":"message","instanceId":"ins_123"}';

  it('should return true for a valid signature', () => {
    const signature = sign(body, secret);
    expect(verifySignature(body, secret, signature)).toBe(true);
  });

  it('should return true when body is a Buffer', () => {
    const buffer = Buffer.from(body);
    const signature = sign(body, secret);
    expect(verifySignature(buffer, secret, signature)).toBe(true);
  });

  it('should return false for an invalid signature', () => {
    expect(
      verifySignature(body, secret, 'sha256=0000000000000000000000000000000000000000000000000000000000000000'),
    ).toBe(false);
  });

  it('should return false for a wrong secret', () => {
    const signature = sign(body, 'wrong-secret');
    expect(verifySignature(body, secret, signature)).toBe(false);
  });

  it('should return false when signature header is empty', () => {
    expect(verifySignature(body, secret, '')).toBe(false);
  });

  it('should return false when signature header is undefined', () => {
    expect(verifySignature(body, secret, undefined)).toBe(false);
  });

  it('should return false when signature header is null', () => {
    expect(verifySignature(body, secret, null)).toBe(false);
  });

  it('should return false when signature has wrong prefix', () => {
    const hex = createHmac('sha256', secret).update(body).digest('hex');
    expect(verifySignature(body, secret, 'md5=' + hex)).toBe(false);
  });

  it('should return false when signature has different length', () => {
    expect(verifySignature(body, secret, 'sha256=abcd')).toBe(false);
  });

  it('should handle UTF-8 body content', () => {
    const utf8Body = '{"text":"Hello 你好 🌍"}';
    const signature = sign(utf8Body, secret);
    expect(verifySignature(utf8Body, secret, signature)).toBe(true);
  });
});
