/**
 * Authenticator response part of a WebAuthn assertion. Binary fields are base64url-encoded.
 */
export interface PasskeyAssertionResponse {
  /** Client data JSON (base64url) */
  clientDataJSON: string;
  /** Authenticator data (base64url) */
  authenticatorData?: string;
  /** Assertion signature (base64url) */
  signature: string;
  /** User handle (base64url), if returned by the authenticator */
  userHandle?: string | null;
}

/**
 * WebAuthn assertion as produced by `PublicKeyCredential.toJSON()` in the browser,
 * submitted with `POST /session/passkey`.
 */
export interface PasskeyAssertion {
  /** Credential ID */
  id?: string;
  /** Raw credential ID (base64url) */
  rawId: string;
  /** Credential type, e.g. `public-key` */
  type?: string;
  /** Authenticator response */
  response: PasskeyAssertionResponse;
}
