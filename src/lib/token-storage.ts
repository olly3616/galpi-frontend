import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * JWT storage. Native uses expo-secure-store (iOS Keychain / Android Keystore). expo-secure-store
 * has NO web support, so web falls back to localStorage — good enough for RN-web dev/verification,
 * and tokens never live on a real device's web anyway.
 */
const KEYS = { access: 'galpi.accessToken', refresh: 'galpi.refreshToken' } as const;
const isWeb = Platform.OS === 'web';

async function setItem(key: string, value: string) {
  if (isWeb) {
    try {
      globalThis.localStorage?.setItem(key, value);
    } catch {
      // ignore (private mode / storage disabled)
    }
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string): Promise<string | null> {
  if (isWeb) {
    try {
      return globalThis.localStorage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }
  return SecureStore.getItemAsync(key);
}

async function removeItem(key: string) {
  if (isWeb) {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch {
      // ignore
    }
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export const tokenStorage = {
  async get(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    const [accessToken, refreshToken] = await Promise.all([getItem(KEYS.access), getItem(KEYS.refresh)]);
    return { accessToken, refreshToken };
  },
  async set(accessToken: string, refreshToken: string) {
    await Promise.all([setItem(KEYS.access, accessToken), setItem(KEYS.refresh, refreshToken)]);
  },
  async clear() {
    await Promise.all([removeItem(KEYS.access), removeItem(KEYS.refresh)]);
  },
};
