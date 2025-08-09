import { ApiResponse } from './ApiResponse.js';
import { HttpClientExtensions } from './HttpClientExtensions.js';

export interface HttpClientOptions {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * Options for WSApi-first usage, where consumers provide instanceId/apiKey
 * and do not need to know headers or the base URL.
 */
export interface WSApiClientOptions {
  instanceId: string;
  apiKey: string;
  /** Optional override, defaults to the WSApi base URL */
  baseUrl?: string;
  timeout?: number;
}

export const DEFAULT_WSAPI_BASE_URL = 'https://api.wsapi.chat';

export class HttpClient {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;
  private readonly timeout: number;

  // Overloads: support both the generic shape and WSApi-specific shape
  constructor(options: HttpClientOptions);
  constructor(options: WSApiClientOptions);
  constructor(options: HttpClientOptions | WSApiClientOptions) {
    if (isWSApiOptions(options)) {
      const base = (options.baseUrl ?? DEFAULT_WSAPI_BASE_URL);
      this.baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;
      this.headers = {
        'Content-Type': 'application/json',
        'X-Instance-Id': options.instanceId,
        'X-API-Key': options.apiKey,
      };
      this.timeout = options.timeout || 30000;
      return;
    }

    // Backwards-compatible constructor
    this.baseUrl = options.baseUrl.endsWith('/')
      ? options.baseUrl.slice(0, -1)
      : options.baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    this.timeout = options.timeout || 30000;
  }

  async get<T>(path: string): Promise<T> {
    const response = await this.makeRequest(path, { method: 'GET' });
    return HttpClientExtensions.ensureSuccessOrThrowJsonAsync<T>(response);
  }

  async post<T>(path: string, data?: any): Promise<T> {
    const requestOptions: RequestInit = { method: 'POST' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.ensureSuccessOrThrowJsonAsync<T>(response);
  }

  async put<T>(path: string, data?: any): Promise<T> {
    const requestOptions: RequestInit = { method: 'PUT' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.ensureSuccessOrThrowJsonAsync<T>(response);
  }

  async delete<T>(path: string): Promise<T> {
    const response = await this.makeRequest(path, { method: 'DELETE' });
    return HttpClientExtensions.ensureSuccessOrThrowJsonAsync<T>(response);
  }

  async getVoid(path: string): Promise<void> {
    const response = await this.makeRequest(path, { method: 'GET' });
    return HttpClientExtensions.ensureSuccessOrThrowAsync(response);
  }

  async postVoid(path: string, data?: any): Promise<void> {
    const requestOptions: RequestInit = { method: 'POST' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.ensureSuccessOrThrowAsync(response);
  }

  async putVoid(path: string, data?: any): Promise<void> {
    const requestOptions: RequestInit = { method: 'PUT' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.ensureSuccessOrThrowAsync(response);
  }

  async deleteVoid(path: string): Promise<void> {
    const response = await this.makeRequest(path, { method: 'DELETE' });
    return HttpClientExtensions.ensureSuccessOrThrowAsync(response);
  }

  /**
   * Makes a GET request and returns binary data.
   * @param path - The endpoint path
   * @returns Promise resolving to ArrayBuffer
   * @throws {ApiException} When the request fails
   */
  async getBinary(path: string): Promise<ArrayBuffer> {
    const response = await this.makeRequest(path, { method: 'GET' });
    return HttpClientExtensions.ensureSuccessOrThrowByteArrayAsync(response);
  }

  // Non-throwing variants
  async tryGet<T>(path: string): Promise<ApiResponse<T>> {
    const response = await this.makeRequest(path, { method: 'GET' });
    return HttpClientExtensions.readAsApiResponseJsonAsync<T>(response);
  }

  /**
   * Makes a GET request and returns binary data with error handling.
   * @param path - The endpoint path
   * @returns Promise resolving to ApiResponse<ArrayBuffer>
   */
  async tryGetBinary(path: string): Promise<ApiResponse<ArrayBuffer>> {
    const response = await this.makeRequest(path, { method: 'GET' });
    return HttpClientExtensions.readAsApiResponseByteArrayAsync(response);
  }

  async tryPost<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const requestOptions: RequestInit = { method: 'POST' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.readAsApiResponseJsonAsync<T>(response);
  }

  async tryPut<T>(path: string, data?: any): Promise<ApiResponse<T>> {
    const requestOptions: RequestInit = { method: 'PUT' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.readAsApiResponseJsonAsync<T>(response);
  }

  async tryDelete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await this.makeRequest(path, { method: 'DELETE' });
    return HttpClientExtensions.readAsApiResponseJsonAsync<T>(response);
  }

  async tryGetVoid(path: string): Promise<ApiResponse> {
    const response = await this.makeRequest(path, { method: 'GET' });
    return HttpClientExtensions.readAsApiResponseAsync(response);
  }

  async tryPostVoid(path: string, data?: any): Promise<ApiResponse> {
    const requestOptions: RequestInit = { method: 'POST' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.readAsApiResponseAsync(response);
  }

  async tryPutVoid(path: string, data?: any): Promise<ApiResponse> {
    const requestOptions: RequestInit = { method: 'PUT' };
    if (data) {
      requestOptions.body = JSON.stringify(data);
    }
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.readAsApiResponseAsync(response);
  }

  async tryDeleteVoid(path: string): Promise<ApiResponse> {
    const response = await this.makeRequest(path, { method: 'DELETE' });
    return HttpClientExtensions.readAsApiResponseAsync(response);
  }

  /**
   * Makes a POST request and returns binary data.
   * @param path - The endpoint path
   * @param body - Request body
   * @returns Promise resolving to ArrayBuffer
   * @throws {ApiException} When the request fails
   */
  async postBinary<TRequest>(path: string, body: TRequest): Promise<ArrayBuffer> {
    const requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body)
    };
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.ensureSuccessOrThrowByteArrayAsync(response);
  }

  /**
   * Makes a POST request and returns binary data with error handling.
   * @param path - The endpoint path
   * @param body - Request body
   * @returns Promise resolving to ApiResponse<ArrayBuffer>
   */
  async tryPostBinary<TRequest>(path: string, body: TRequest): Promise<ApiResponse<ArrayBuffer>> {
    const requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body)
    };
    const response = await this.makeRequest(path, requestOptions);
    return HttpClientExtensions.readAsApiResponseByteArrayAsync(response);
  }

  private async makeRequest(path: string, options: RequestInit): Promise<Response> {
    const url = `${this.baseUrl}/${path.startsWith('/') ? path.slice(1) : path}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers
        },
        signal: controller.signal
      });

      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

function isWSApiOptions(options: HttpClientOptions | WSApiClientOptions): options is WSApiClientOptions {
  return (
    (options as WSApiClientOptions).instanceId !== undefined &&
    (options as WSApiClientOptions).apiKey !== undefined
  );
}
