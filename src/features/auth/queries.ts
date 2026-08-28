import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/stores/auth-store';

import { login, signup, type AuthResult } from './api';

/** Shape the login/signup response into the auth store's session payload. */
function toSession(data: AuthResult) {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: { userId: data.userId, email: data.email, nickname: data.nickname },
  };
}

/** Log in; on success the session is persisted (screen handles navigation). */
export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => setSession(toSession(data)),
  });
}

/** Sign up (auto-login); on success the session is persisted. */
export function useSignup() {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => setSession(toSession(data)),
  });
}
