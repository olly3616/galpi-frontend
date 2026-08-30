import { api } from '@/lib/api/client';

export type DevicePlatform = 'ANDROID' | 'IOS';

/** Register (upsert) this device's FCM/APNs token so the server can push scheduled 문장 alarms. */
export async function registerDeviceToken(input: { token: string; platform: DevicePlatform }): Promise<void> {
  await api.post('/api/device-tokens', input);
}
