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
    // Per the API spec, refresh returns ONLY a new accessToken; the refreshToken is reused.
    const res = await axios.post<{ accessToken: string }>(
      `${API_BASE_URL}/api/auth/refresh`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } },
    );
    const accessToken = res.data.accessToken;
    await setSession({ accessToken, refreshToken });
    return accessToken;
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
      refreshPromise = refreshPromise ?? refreshAccessToken();
      const newToken = await refreshPromise;
      refreshPromise = null;
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }

    return Promise.reject(toApiError(error));
  },
);
