/**
 * Runtime config. The API base URL comes from an Expo public env var
 * (`EXPO_PUBLIC_API_URL`) so it can differ per environment without code changes.
 *
 * Dev default is the local Spring server. NOTE: `localhost` only works in the web/simulator;
 * a physical device must point at the machine's LAN IP — set EXPO_PUBLIC_API_URL for that
 * (e.g. `EXPO_PUBLIC_API_URL=http://192.168.0.10:8080`).
 */
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080';
