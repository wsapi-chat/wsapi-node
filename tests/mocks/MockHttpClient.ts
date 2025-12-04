import { vi } from 'vitest';
import type { ApiResponse } from '../../src/ApiClient/ApiResponse';

/**
 * Mock implementation of HttpClient for testing
 */
export class MockHttpClient {
  get = vi.fn();
  post = vi.fn();
  put = vi.fn();
  delete = vi.fn();
  getVoid = vi.fn();
  postVoid = vi.fn();
  putVoid = vi.fn();
  deleteVoid = vi.fn();
  getBinary = vi.fn();
  postBinary = vi.fn();
  tryGet = vi.fn();
  tryPost = vi.fn();
  tryPut = vi.fn();
  tryDelete = vi.fn();
  tryGetVoid = vi.fn();
  tryPostVoid = vi.fn();
  tryPutVoid = vi.fn();
  tryDeleteVoid = vi.fn();
  tryGetBinary = vi.fn();
  tryPostBinary = vi.fn();

  /**
   * Reset all mocks
   */
  reset(): void {
    this.get.mockReset();
    this.post.mockReset();
    this.put.mockReset();
    this.delete.mockReset();
    this.getVoid.mockReset();
    this.postVoid.mockReset();
    this.putVoid.mockReset();
    this.deleteVoid.mockReset();
    this.getBinary.mockReset();
    this.postBinary.mockReset();
    this.tryGet.mockReset();
    this.tryPost.mockReset();
    this.tryPut.mockReset();
    this.tryDelete.mockReset();
    this.tryGetVoid.mockReset();
    this.tryPostVoid.mockReset();
    this.tryPutVoid.mockReset();
    this.tryDeleteVoid.mockReset();
    this.tryGetBinary.mockReset();
    this.tryPostBinary.mockReset();
  }
}

/**
 * Creates a successful ApiResponse
 */
export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    isSuccess: true,
    statusCode: 200,
    data,
    error: undefined,
  };
}

/**
 * Creates an error ApiResponse
 */
export function createErrorResponse(statusCode: number, error: string): ApiResponse<never> {
  return {
    isSuccess: false,
    statusCode,
    data: undefined as never,
    error: {
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
      title: 'Error',
      status: statusCode,
      detail: error,
    },
  };
}

/**
 * Creates a void success ApiResponse
 */
export function createVoidSuccessResponse(): ApiResponse<void> {
  return {
    isSuccess: true,
    statusCode: 200,
    data: undefined,
    error: undefined,
  };
}
