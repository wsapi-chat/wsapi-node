import { ApiResponse, ApiResponseImpl } from './ApiResponse.js';
import { ApiException } from './ApiException.js';
import { ProblemDetails } from './ProblemDetails.js';

export class HttpClientExtensions {
  static async readAsApiResponseJsonAsync<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      if (response.ok) {
        const result = await response.json() as T;
        return ApiResponseImpl.success(result);
      }

      const error = await this.tryReadProblemDetails(response);
      return ApiResponseImpl.failure<T>(error);
    } catch (ex) {
      return this.handleException<T>(ex);
    }
  }

  static async readAsApiResponseByteArrayAsync(response: Response): Promise<ApiResponse<ArrayBuffer>> {
    try {
      if (response.ok) {
        const result = await response.arrayBuffer();
        return ApiResponseImpl.success(result);
      }

      const error = await this.tryReadProblemDetails(response);
      return ApiResponseImpl.failure<ArrayBuffer>(error);
    } catch (ex) {
      return this.handleException<ArrayBuffer>(ex);
    }
  }

  static async readAsApiResponseAsync(response: Response): Promise<ApiResponse> {
    try {
      if (response.ok) {
        return ApiResponseImpl.success(undefined);
      }

      const error = await this.tryReadProblemDetails(response);
      return ApiResponseImpl.failure(error);
    } catch (ex) {
      return this.handleException(ex);
    }
  }

  static async ensureSuccessOrThrowJsonAsync<T>(response: Response): Promise<T> {
    if (response.ok) {
      const result = await response.json() as T;
      if (result === null || result === undefined) {
        throw new Error('Empty response');
      }
      return result;
    }

    await this.throwApiExceptionAsync(response);
    throw new Error('This should never be reached');
  }

  static async ensureSuccessOrThrowByteArrayAsync(response: Response): Promise<ArrayBuffer> {
    if (response.ok) {
      const result = await response.arrayBuffer();
      if (!result) {
        throw new Error('Empty response');
      }
      return result;
    }

    await this.throwApiExceptionAsync(response);
    throw new Error('This should never be reached');
  }

  static async ensureSuccessOrThrowAsync(response: Response): Promise<void> {
    if (response.ok) {
      return;
    }

    await this.throwApiExceptionAsync(response);
  }

  private static handleException<T>(ex: unknown): ApiResponse<T> {
    if (ex instanceof Error) {
      if (ex.name === 'AbortError') {
        return ApiResponseImpl.failure<T>({
          status: 408,
          title: 'Request Timeout',
          detail: 'The request timed out'
        });
      }

      if (ex.name === 'TypeError' && ex.message.includes('fetch')) {
        return ApiResponseImpl.failure<T>({
          status: 500,
          title: 'Request Failed',
          detail: ex.message
        });
      }

      return ApiResponseImpl.failure<T>({
        status: 500,
        title: 'Request Failed',
        detail: ex.message
      });
    }

    return ApiResponseImpl.failure<T>({
      status: 500,
      title: 'Request Failed',
      detail: 'An unknown error occurred'
    });
  }

  private static async tryReadProblemDetails(response: Response): Promise<ProblemDetails> {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json() as ProblemDetails;
      }
    } catch {
      // ignore
    }

    const content = await response.text();
    return {
      status: response.status,
      title: response.statusText,
      detail: content
    };
  }

  private static async throwApiExceptionAsync(response: Response): Promise<void> {
    const error = await this.tryReadProblemDetails(response);
    throw new ApiException(error);
  }
}
