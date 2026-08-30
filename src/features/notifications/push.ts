import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { registerDeviceToken } from './api';

const CHANNEL_ID = 'default';

// Foreground behavior — show a banner while the app is open. (Native only; no-op on web.)
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/**
 * Ask for permission, get the native device push token (FCM on Android / APNs on iOS), and
 * register it with the backend. No-op on web and simulators. Best-effort — callers swallow errors.
 *
 * Requires a development build with FCM credentials (Expo Go can't get Android push tokens on
 * SDK 53+). See docs/push-setup.md.
 */
export async function registerForPushNotificationsAsync(): Promise<void> {
  if (Platform.OS === 'web' || !Device.isDevice) return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: '문장 알림',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const existing = await Notifications.getPermissionsAsync();
  let granted = existing.granted;
  if (!granted) {
    const requested = await Notifications.requestPermissionsAsync();
    granted = requested.granted;
  }
  if (!granted) return;

  const deviceToken = await Notifications.getDevicePushTokenAsync();
  const platform = deviceToken.type === 'android' ? 'ANDROID' : 'IOS';
  await registerDeviceToken({ token: String(deviceToken.data), platform });
}
