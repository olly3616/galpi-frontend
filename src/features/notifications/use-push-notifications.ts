import * as Notifications from 'expo-notifications';
import { type Href, router } from 'expo-router';
import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth-store';

import { registerForPushNotificationsAsync } from './push';

/**
 * App-wide push wiring: register the device token once authenticated, and route a tapped
 * notification to its 문장 (when the payload carries a quoteId). Mount once, high in the tree.
 */
export function usePushNotifications() {
  const status = useAuthStore((s) => s.status);

  useEffect(() => {
    if (status === 'authenticated') {
      registerForPushNotificationsAsync().catch(() => {
        // best-effort — a missing permission or dev-build requirement shouldn't crash the app
      });
    }
  }, [status]);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as { quoteId?: number | string } | undefined;
      const quoteId = data?.quoteId;
      if (quoteId != null) router.push(`/quote/${quoteId}` as Href);
    });
    return () => sub.remove();
  }, []);
}
