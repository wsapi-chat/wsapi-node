/**
 * Request to update chat ephemeral message expiration
 */
export interface ChatUpdateEphemeralExpirationRequest {
  /**
   * The expiration time for ephemeral messages.
   * Possible values: 'off', '24h', '7d', '90d'
   */
  ephemeralExpiration: string;
}
