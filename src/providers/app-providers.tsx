import { QueryClientProvider } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';

import { usePushNotifications } from '@/features/notifications/use-push-notifications';
import { queryClient } from '@/lib/api/query-client';
import { useAuthStore } from '@/stores/auth-store';

/** App-wide providers: React Query, auth-session hydration, and push-notification wiring. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    // Session cleared mid-session (e.g. a refresh failure calls clearSession) → return to login.
    // index.tsx only routes at the entry, so without this a user sitting on a deep screen would be
    // stranded on erroring screens with no way back to login.
    return useAuthStore.subscribe((state, prev) => {
      if (prev.status === 'authenticated' && state.status === 'unauthenticated') {
        router.replace('/login');
      }
    });
  }, []);

  usePushNotifications();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
