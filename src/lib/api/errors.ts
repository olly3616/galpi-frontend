import { isAxiosError } from 'axios';

/** Server error envelope — the API always returns `{ error: { code, message } }` on failure. */
export type ApiErrorBody = { error?: { code?: string; message?: string } };

/** Normalized error thrown by the API layer, so UI/React Query can branch on `code`/`status`. */
export class ApiError extends Error {
  readonly code: string;
  readonly status?: number;

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

/** Convert any thrown value (axios error, network failure, …) into an ApiError. */
export function toApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;

  if (isAxiosError(err)) {
    const status = err.response?.status;
    const body = err.response?.data as ApiErrorBody | undefined;
    if (body?.error) {
      return new ApiError(body.error.message ?? '요청을 처리하지 못했어요.', body.error.code ?? 'UNKNOWN', status);
    }
    if (err.code === 'ECONNABORTED') {
      return new ApiError('요청 시간이 초과됐어요.', 'TIMEOUT', status);
    }
    if (!err.response) {
      return new ApiError('네트워크에 연결할 수 없어요.', 'NETWORK', status);
    }
    return new ApiError(err.message, 'HTTP_ERROR', status);
  }

  return new ApiError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요.', 'UNKNOWN');
}
