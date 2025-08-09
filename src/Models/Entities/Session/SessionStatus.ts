/**
 * Represents the current session status.
 */
export interface SessionStatus {
  /** Whether the instance is connected */
  connected: boolean;
  
  /** Whether the user is logged in */
  isLoggedIn: boolean;
}
