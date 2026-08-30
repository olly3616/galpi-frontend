# FCM 푸시 알림 설정 가이드

프론트 코드는 연결돼 있습니다(권한 요청 → 디바이스 토큰 획득 → `POST /api/device-tokens` 등록 → 탭 시 해당 문장으로 이동). 다만 **원격 푸시는 아래 설정과 개발 빌드가 있어야 실제로 동작**합니다.

## ⚠️ 핵심 제약

- **Android 원격 푸시는 Expo Go에서 동작하지 않습니다(SDK 53+).** 반드시 **개발 빌드(dev build)** 가 필요합니다.
- iOS 원격 푸시는 Expo Go에서 되지만, 실제 배포/FCM 연동은 개발 빌드 + APNs 설정이 필요합니다.
- 에뮬레이터/시뮬레이터에서는 디바이스 토큰을 못 받습니다(코드가 `Device.isDevice`로 건너뜀). **실기기 필요.**

## 1) Firebase(안드로이드 FCM)

1. Firebase 프로젝트 생성 → Android 앱 추가(패키지명은 `app.json`의 android 패키지와 일치).
2. `google-services.json` 다운로드 → 프로젝트 루트에 두기.
3. `app.json`의 `expo.android`에 추가:
   ```json
   "android": { "googleServicesFile": "./google-services.json", ... }
   ```
   (`google-services.json`은 비밀은 아니지만 보통 커밋하지 않습니다 — `.gitignore` 권장, EAS Secret로 주입 가능)

## 2) iOS APNs (배포 시)

- Apple Developer에서 APNs 키 발급 → EAS 빌드 시 자격증명 등록.
- FCM로 iOS까지 보낼 거면 Firebase에 APNs 키 업로드가 필요합니다. **참고**: 현재 프론트는 `getDevicePushTokenAsync()`로 iOS에선 **APNs 토큰**을 보냅니다. 백엔드가 FCM로 iOS에 보낸다면 FCM 등록 토큰이 필요할 수 있으니, iOS 전송 방식(FCM vs APNs)을 백엔드와 맞춰주세요.

## 3) 개발 빌드 만들기

```bash
npx expo install expo-dev-client
eas build --profile development --platform android
```
(EAS 계정/설정 필요. 로컬 빌드도 가능하나 Android SDK 환경 필요)

## 4) 백엔드 푸시 페이로드 (탭 → 문장 이동)

알림을 탭하면 해당 문장으로 이동하도록, 푸시 **data 페이로드에 `quoteId`를 포함**해 주세요.
```json
{ "notification": { "title": "…", "body": "…" }, "data": { "quoteId": "123" } }
```
프론트는 `data.quoteId`를 읽어 `/quote/{quoteId}`로 이동합니다.

## 동작 요약(코드)

- `features/notifications/push.ts` — 권한 요청, 채널 생성(Android), 디바이스 토큰 획득 후 `POST /api/device-tokens { token, platform }`
- `features/notifications/use-push-notifications.ts` — 로그인(인증) 시 토큰 등록, 알림 탭 시 `quoteId`로 이동. `AppProviders`에서 마운트.
- `app.json` — `expo-notifications` 플러그인 추가됨.
