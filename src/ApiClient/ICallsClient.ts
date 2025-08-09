import type { ApiResponse } from './ApiResponse.js';
import type { RejectCallRequest } from '../Models/index.js';

/**
 * Interface for the Calls API client.
 * Provides methods to manage voice calls.
 */
export interface ICallsClient {
  /**
   * Rejects an incoming call.
   * @param callId The ID of the call to reject
   * @param rejectCallRequest The call rejection details
   * @returns Promise that resolves when the call is rejected
   * @throws {ApiException} When the request fails
   */
  rejectCallAsync(callId: string, rejectCallRequest: RejectCallRequest): Promise<void>;

  /**
   * Rejects an incoming call with error handling.
   * @param callId The ID of the call to reject
   * @param rejectCallRequest The call rejection details
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  tryRejectCallAsync(callId: string, rejectCallRequest: RejectCallRequest): Promise<ApiResponse<void>>;
}
