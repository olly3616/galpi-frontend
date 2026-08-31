import axios, { create, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { API_BASE_URL } from '@/config/env';
import { useAuthStore } from '@/stores/auth-store';

import { toApiError } from './errors';

/**
 * Shared axios instance for all `/api/*` calls.
 *  - request: attaches the current access token as `Authorization: Bearer …`
 *  - response: on 401, refreshes the token once and retries; otherwise normalizes to ApiError
 *
 * React Query hooks call through this instance; see project memory `project_galpi_api_stack`.
 */
export const api = create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Single-flight refresh: concurrent 401s share one refresh call.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken, setSession, clearSession } = useAuthStore.getState();
  if (!refreshToken) return null;
  try {
    // Uses a bare axios call (not `api`) to avoid the interceptor recursing on 401.
    // Refresh tokens ROTATE: the endpoint returns a new pair and invalidates the old refresh
    // token, so the new refreshToken must be stored — reusing the old one fails next time.
    const res = await axios.post<{ accessToken: string; refreshToken: string }>(
      `${API_BASE_URL}/api/auth/refresh`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } },
    );
    await setSession({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
    return res.data.accessToken;
  } catch {
    await clearSession();
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      // Only the creator clears the shared promise (via finally), so a 401 that arrives while a
      // refresh is in flight can't null out a newer refresh and trigger a duplicate call.
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }

    return Promise.reject(toApiError(error));
  },
);
