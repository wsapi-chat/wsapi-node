import { ProblemDetails } from './ProblemDetails.js';

export interface ApiResponse<T = void> {
  result?: T | undefined;
  error?: ProblemDetails | undefined;
  readonly isSuccess: boolean;
}

export class ApiResponseImpl<T = void> implements ApiResponse<T> {
  public result?: T | undefined;
  public error?: ProblemDetails | undefined;

  public get isSuccess(): boolean {
    return this.error === undefined;
  }

  constructor(result?: T | undefined, error?: ProblemDetails | undefined) {
    this.result = result;
    this.error = error;
  }

  public static success<T>(result: T): ApiResponse<T> {
    return new ApiResponseImpl<T>(result);
  }

  public static failure<T>(error: ProblemDetails): ApiResponse<T> {
    return new ApiResponseImpl<T>(undefined, error);
  }
}
