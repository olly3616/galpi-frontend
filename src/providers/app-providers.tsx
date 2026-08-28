import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import { queryClient } from '@/lib/api/query-client';
import { useAuthStore } from '@/stores/auth-store';

/** App-wide providers: React Query, plus auth-session hydration from secure storage on start. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
