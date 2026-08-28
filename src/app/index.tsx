import { Redirect } from 'expo-router';

import { useAuthStore } from '@/stores/auth-store';

// WF-01 app entry. Waits for the session to hydrate, then routes by auth state:
// a stored token → /home, otherwise → /login.
export default function Index() {
  const status = useAuthStore((s) => s.status);
  if (status === 'loading') return null; // splash stays up until hydration resolves
  return <Redirect href={status === 'authenticated' ? '/home' : '/login'} />;
}
