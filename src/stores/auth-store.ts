import { create } from 'zustand';

import { tokenStorage } from '@/lib/token-storage';

/** Signed-in user summary (from the login/signup response). */
export type SessionUser = {
  userId: number;
  email: string;
  nickname: string;
  bio?: string;
} | null;

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  accessToken: string | null;
  refreshToken: string | null;
  user: SessionUser;
  /** Load tokens from secure storage on app start. */
  hydrate: () => Promise<void>;
  /** Persist a new session (after login / token refresh). */
  setSession: (input: { accessToken: string; refreshToken: string; user?: SessionUser }) => Promise<void>;
  /** Clear the session (logout / failed refresh). */
  clearSession: () => Promise<void>;
};

/**
 * Client-side auth state (Zustand). Holds the session in memory and mirrors tokens to secure
 * storage. Server data (책장/문장/피드…) lives in React Query, not here — see project memory
 * `project_galpi_api_stack`.
 */
export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  accessToken: null,
  refreshToken: null,
  user: null,

  hydrate: async () => {
    const { accessToken, refreshToken } = await tokenStorage.get();
    set({ accessToken, refreshToken, status: accessToken ? 'authenticated' : 'unauthenticated' });
  },

  setSession: async ({ accessToken, refreshToken, user }) => {
    await tokenStorage.set(accessToken, refreshToken);
    set((prev) => ({ accessToken, refreshToken, user: user ?? prev.user, status: 'authenticated' }));
  },

  clearSession: async () => {
    await tokenStorage.clear();
    set({ accessToken: null, refreshToken: null, user: null, status: 'unauthenticated' });
  },
}));
