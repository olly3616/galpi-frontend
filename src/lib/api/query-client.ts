import { QueryClient } from '@tanstack/react-query';

import { ApiError } from './errors';

/**
 * Shared React Query client. Auth errors (401/403) shouldn't be retried — the axios interceptor
 * already handles token refresh, so a lingering 401 means the session is gone.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) return false;
        return failureCount < 2;
      },
    },
  },
});
