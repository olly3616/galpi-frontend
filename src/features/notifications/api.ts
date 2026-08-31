import { api } from '@/lib/api/client';

export type DevicePlatform = 'ANDROID' | 'IOS';

/** Register (upsert) this device's FCM/APNs token so the server can push scheduled 문장 alarms. */
export async function registerDeviceToken(input: { token: string; platform: DevicePlatform }): Promise<void> {
  await api.post('/api/device-tokens', input);
}

/** Per-user push preferences. `quoteAlarm=false` stops scheduled 문장 pushes server-side. */
export type NotificationSettings = { quoteAlarm: boolean; marketing: boolean };

export async function getNotificationSettings(): Promise<NotificationSettings> {
  const res = await api.get<NotificationSettings>('/api/users/me/notification-settings');
  return res.data;
}

export async function updateNotificationSettings(
  patch: Partial<NotificationSettings>,
): Promise<NotificationSettings> {
  const res = await api.patch<NotificationSettings>('/api/users/me/notification-settings', patch);
  return res.data;
}
