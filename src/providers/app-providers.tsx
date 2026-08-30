import { QueryClientProvider } from '@tanstack/react-query';
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

  usePushNotifications();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
