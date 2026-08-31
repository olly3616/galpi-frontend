# 갈피 (Galpi) 📖

> 책에서 마음에 남은 **문장**을 옮겨 적고, 원하는 시간에 다시 만나고, 함께 읽는 사람들과 나누는 앱.

책을 읽다 보면 밑줄을 긋고 싶은 문장을 만납니다. 갈피는 그 문장을 책장에 모으고, 스스로 정한 시간에 **푸시 알림**으로 다시 꺼내 보여주며, 팔로우한 사람들의 문장을 **피드**에서 함께 읽게 해줍니다.

---

## ✨ 주요 기능

### 📚 내 책장
- 책 검색(외부 API)으로 추가하거나, 표지 이미지와 함께 **직접 등록**
- 책별로 모아 둔 문장을 한눈에 보기

### ✍️ 문장 기록
- 등장인물·문장 본문·메모를 기록하고 수정
- **공개 범위** 설정: `나만 보기` / `팔로워에게 공개`

### ⏰ 문장 알림 (핵심 기능)
- 문장마다 **원하는 시간에 푸시 알림** 예약
- 반복 방식: **매일 / 매주(요일 선택) / 한 번(날짜 지정)**
- 알림을 탭하면 해당 문장 상세로 바로 이동
- FCM(Android) · APNs(iOS) 기반

### 👥 팔로잉 피드 & 소셜
- 팔로우한 사람들이 공개한 문장을 최신순 피드로 열람, **좋아요**
- 닉네임으로 **사람 찾기** → 팔로우
- 프로필, 팔로워/팔로잉 목록

---

## 🛠️ 기술 스택

| 영역 | 사용 기술 |
|---|---|
| **런타임** | [Expo](https://expo.dev) SDK 57, React Native 0.86, React 19.2 |
| **언어** | TypeScript (React Compiler 사용) |
| **라우팅** | [expo-router](https://docs.expo.dev/router/introduction) (파일 기반, typed routes) |
| **서버 상태** | [TanStack Query v5](https://tanstack.com/query) (`@tanstack/react-query`) |
| **클라이언트 상태** | [Zustand](https://zustand-demo.pmnd.rs/) (세션/인증) |
| **HTTP** | [axios](https://axios-http.com) (토큰 주입·리프레시 인터셉터) |
| **보안 저장소** | `expo-secure-store` (액세스/리프레시 토큰) |
| **푸시 알림** | `expo-notifications` + Firebase Cloud Messaging |
| **이미지** | `expo-image`, `expo-image-picker` |
| **아이콘/폰트** | `lucide-react-native`, Pretendard |
| **빌드/배포** | [EAS Build](https://docs.expo.dev/build/introduction) |

### 아키텍처 원칙
- **Feature-first 구조**: 도메인별로 `api.ts`(HTTP) + `queries.ts`(React Query 훅)를 묶음
- **서버 데이터는 React Query, 앱/세션 상태는 Zustand**로 역할 분리
- 공용 인프라(axios 클라이언트, 페이지네이션, 토큰 저장소)는 `src/lib`에 집약

---

## 📂 프로젝트 구조

```
src/
├─ app/                  # 화면 (expo-router 파일 기반 라우팅)
│  ├─ (tabs)/            #   책장 · 피드 · 프로필 탭
│  ├─ book/[id].tsx      #   책 상세 (문장 모아보기)
│  ├─ quote/[id].tsx     #   문장 상세 + 알림 설정
│  ├─ quote/new.tsx      #   문장 기록/수정
│  └─ user/[id].tsx      #   다른 사용자 프로필
├─ features/             # 도메인별 API + React Query 훅
│  ├─ auth/  bookshelf/  quotes/
│  ├─ schedules/  social/  users/  notifications/
├─ components/           # 디자인 시스템 + 콘텐츠 컴포넌트
├─ lib/api/              # axios 클라이언트, 인터셉터, 페이지네이션, 업로드
├─ stores/               # Zustand (인증 세션)
├─ config/               # 런타임 환경 설정
└─ constants/            # 테마 (색상·타이포·간격)
```

---

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수

`.env` 파일에 백엔드 API 주소를 지정합니다 (`.env.example` 참고):

```bash
EXPO_PUBLIC_API_URL=http://localhost:8080
```

> ⚠️ **실기기 테스트 시**: `localhost`는 폰 자신을 가리키므로 접속되지 않습니다. PC의 **LAN IP**로 바꿔주세요 — 예: `http://192.168.0.10:8080`.

### 3. 개발 서버 실행

```bash
npx expo start
```

---

## 📱 개발 빌드 (실기기 테스트)

FCM 푸시 등 네이티브 기능은 Expo Go로 테스트할 수 없어, **개발 빌드(dev client)** 가 필요합니다.

```bash
# EAS 로그인 (최초 1회)
eas login

# Android 개발 빌드 (APK)
eas build --profile development --platform android
```

빌드된 APK를 폰에 설치한 뒤, 개발 중에는:

```bash
npx expo start --dev-client
```

로 개발 서버에 연결해 코드를 실시간 반영합니다.

### 자격증명 관리
- `google-services.json`은 커밋하지 않고 **EAS Secret**(`GOOGLE_SERVICES_JSON`)으로 주입합니다.
- Android keystore는 **EAS 관리형**으로 자동 생성·보관됩니다.

---

## 📜 스크립트

| 명령 | 설명 |
|---|---|
| `npm start` | 개발 서버 시작 |
| `npm run android` | Android에서 실행 |
| `npm run ios` | iOS에서 실행 |
| `npm run lint` | ESLint 검사 |
