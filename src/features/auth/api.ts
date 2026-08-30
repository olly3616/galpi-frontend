import { api } from '@/lib/api/client';
import { ApiError } from '@/lib/api/errors';

/** Login/signup both return the session + user summary. */
export type AuthResult = {
  userId: number;
  email: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

export type LoginInput = { email: string; password: string };
export type SignupInput = { email: string; password: string; nickname: string };

export async function login(input: LoginInput): Promise<AuthResult> {
  const res = await api.post<AuthResult>('/api/auth/login', input);
  return res.data;
}

export async function signup(input: SignupInput): Promise<AuthResult> {
  const res = await api.post<AuthResult>('/api/auth/signup', input);
  return res.data;
}

/** Revoke a refresh token server-side (idempotent). Called on logout. */
export async function logout(refreshToken: string): Promise<void> {
  await api.post('/api/auth/logout', { refreshToken });
}

/** Map an auth error to a Korean, user-facing message by its API error code. */
export function authErrorMessage(error: unknown): string {
  const code = error instanceof ApiError ? error.code : 'UNKNOWN';
  switch (code) {
    case 'INVALID_CREDENTIALS':
      return '이메일 또는 비밀번호가 올바르지 않습니다.';
    case 'EMAIL_DUPLICATED':
      return '이미 사용 중인 이메일입니다.';
    case 'NICKNAME_DUPLICATED':
      return '이미 사용 중인 닉네임입니다.';
    case 'VALIDATION_ERROR':
      return '입력값을 다시 확인해주세요.';
    case 'NETWORK':
      return '네트워크에 연결할 수 없어요.';
    case 'TIMEOUT':
      return '요청 시간이 초과됐어요. 다시 시도해주세요.';
    default:
      return error instanceof ApiError ? error.message : '문제가 발생했어요. 잠시 후 다시 시도해주세요.';
  }
}
