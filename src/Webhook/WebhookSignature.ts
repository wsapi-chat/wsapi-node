import { createHmac, timingSafeEqual } from 'node:crypto';

const SIGNATURE_PREFIX = 'sha256=';

/**
 * Verifies the HMAC-SHA256 signature of a webhook payload.
 *
 * @param rawBody - The raw request body bytes (must not be re-serialized)
 * @param secret - The signing secret configured for the instance
 * @param signatureHeader - The value of the X-Webhook-Signature header
 * @returns true if the signature is valid, false otherwise
 */
export function verifySignature(
  rawBody: Buffer | string,
  secret: string,
  signatureHeader: string | undefined | null,
): boolean {
  if (!signatureHeader) {
    return false;
  }

  const expected = SIGNATURE_PREFIX + createHmac('sha256', secret).update(rawBody).digest('hex');

  if (expected.length !== signatureHeader.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
}
