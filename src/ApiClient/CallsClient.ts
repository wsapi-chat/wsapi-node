import type { HttpClient } from './HttpClient.js';
import type { ICallsClient } from './ICallsClient.js';
import type { ApiResponse } from './ApiResponse.js';
import type { RejectCallRequest } from '../Models/index.js';

/**
 * Client for the Calls API.
 * Provides methods to manage voice calls.
 */
export class CallsClient implements ICallsClient {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Rejects an incoming call.
   * @param callId The ID of the call to reject
   * @param rejectCallRequest The call rejection details
   * @returns Promise that resolves when the call is rejected
   * @throws {ApiException} When the request fails
   */
  async rejectCallAsync(callId: string, rejectCallRequest: RejectCallRequest): Promise<void> {
    await this.httpClient.putVoid(`/calls/${callId}/reject`, rejectCallRequest);
  }

  /**
   * Rejects an incoming call with error handling.
   * @param callId The ID of the call to reject
   * @param rejectCallRequest The call rejection details
   * @returns Promise that resolves to an ApiResponse containing success or error details
   */
  async tryRejectCallAsync(callId: string, rejectCallRequest: RejectCallRequest): Promise<ApiResponse<void>> {
    return await this.httpClient.tryPutVoid(`/calls/${callId}/reject`, rejectCallRequest);
  }
}
