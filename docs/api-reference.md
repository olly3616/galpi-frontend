# 갈피 백엔드 API 레퍼런스

> 백엔드(Spring Boot)에서 받은 명세를 옮긴 것. 실행 중 서버의 대화형 문서는 `/swagger-ui.html`.

## 공통

- **Base URL**: `http://localhost:8080` (개발). 모든 경로는 `/api`로 시작.
- **인증**: `/api/auth/*`를 제외한 모든 요청에 `Authorization: Bearer <accessToken>` 필요.
- **Content-Type**: `application/json`
- **시각 형식**: `HH:mm` (예: `08:00`)
- **페이지네이션**: `?page=0&size=20` (0-based). 목록 응답은 `{ items, page, hasNext }`.
- **에러 형식**: 실패 시 4xx/5xx + `{ "error": { "code", "message" } }`

### Enums

- **Visibility**: `PRIVATE`(기본) · `FOLLOWERS` — 대사 공개 범위
- **RepeatType**: `DAILY` · `WEEKLY`(→ `daysOfWeek` 필수) · `ONCE`
- **Book source**: `API` · `MANUAL`(직접 등록/웹소설) — **type**: `NOVEL` · `WEBNOVEL`
- **Platform**: `ANDROID` · `IOS` (FCM 토큰 등록 시)

### 에러 코드

| code | HTTP | 상황 |
|---|---|---|
| `VALIDATION_ERROR` | 400 | 입력값 형식/길이 오류 |
| `EMAIL_DUPLICATED` | 409 | 이메일 중복 |
| `NICKNAME_DUPLICATED` | 409 | 닉네임 중복 |
| `INVALID_CREDENTIALS` | 401 | 로그인 실패 |
| `INVALID_REFRESH_TOKEN` | 401 | Refresh 토큰 무효/만료 |
| `UNAUTHORIZED` | 401 | 토큰 없음/만료 |
| `FORBIDDEN` | 403 | 권한 없음(남의 대사·알림 접근) |
| `ALREADY_IN_SHELF` | 409 | 이미 책장에 있는 책 |
| `NOT_FOUND` | 404 | 리소스 없음 |
| `INTERNAL_SERVER_ERROR` | 500 | 서버 내부 오류 |

---

## 인증 (토큰 불필요)

### `POST /api/auth/signup` → 201
계정 생성 + 토큰 발급(자동 로그인).
- Body: `email`(req), `password`(req, 8자 이상), `nickname`(req, 2~20자, 중복 불가)
- Res: `{ userId, email, nickname, accessToken, refreshToken }`
- Errors: `EMAIL_DUPLICATED`, `NICKNAME_DUPLICATED`, `VALIDATION_ERROR`

### `POST /api/auth/login` → 200
- Body: `email`(req), `password`(req)
- Res: `{ userId, email, nickname, accessToken, refreshToken }`
- Errors: `INVALID_CREDENTIALS`, `VALIDATION_ERROR`

### `POST /api/auth/refresh` → 200
- Body: `refreshToken`(req)
- Res: `{ accessToken }` — **새 accessToken만 반환**(refreshToken은 그대로 재사용)
- Errors: `INVALID_REFRESH_TOKEN`

> 로그아웃 엔드포인트는 없음 → 클라이언트에서 토큰 삭제로 처리.

---

## 디바이스 토큰

### `POST /api/device-tokens` → 200
FCM 토큰 등록(같은 토큰 재전송 시 소유자/플랫폼만 갱신).
- Body: `token`(req), `platform`(req, `ANDROID|IOS`)
- Res: `{ success: true }`

---

## 도서 검색 · 책장

### `GET /api/books/search` → 200
카카오 도서 API 프록시 검색.
- Query: `query`(req), `page`(opt, 0), `size`(opt, 20)
- Res: `{ items: [{ title, author, publisher, coverUrl, isbn }], page, hasNext }`

### `POST /api/bookshelf` → 201
검색한 책(API) 또는 직접 등록(MANUAL)을 책장에 추가.
- Body: `source`(req, `API|MANUAL`), `title`(req), `type`(req, `NOVEL|WEBNOVEL`), `author`(opt), `publisher`(opt), `coverUrl`(opt), `isbn`(opt, API 책 중복 판정)
- Res: `{ workId, addedToShelf }`
- Errors: `ALREADY_IN_SHELF`

### `GET /api/bookshelf/me` → 200
내 책장(최근 추가순), 각 책의 대사 개수 포함.
- Query: `page`(opt), `size`(opt)
- Res: `{ items: [{ workId, title, author, coverUrl, quoteCount }], page, hasNext }`

### `DELETE /api/bookshelf/{workId}` → 200
- Res: `{ removed: true }` · Errors: `NOT_FOUND`

### `GET /api/works/{id}` → 200
책 상세.
- Res: `{ workId, title, author, coverUrl, type, source }` · Errors: `NOT_FOUND`

### `GET /api/works/{id}/quotes` → 200
책 상세 = 대사 모아보기(그 책의 내 대사 전부).
- Res: `{ work: { workId, title, author, coverUrl }, quotes: [{ quoteId, characterName, content, memo, hasSchedule, visibility }] }`
- Errors: `NOT_FOUND`

---

## 대사 (Quotes)

### `POST /api/quotes` → 201
- Body: `workId`(req), `content`(req), `characterName`(opt), `memo`(opt), `visibility`(opt, 기본 `PRIVATE`)
- Res: `{ quoteId, content, characterName, memo, visibility, work: {…}, schedules: [] }`
- Errors: `NOT_FOUND`, `VALIDATION_ERROR`

### `GET /api/quotes/{id}` → 200
대사 상세(출처 + 알림). 본인 대사만.
- Res: `{ quoteId, content, characterName, memo, visibility, work: {…}, schedules: [{ scheduleId, sendTime, repeatType, daysOfWeek, isActive }] }`
- Errors: `NOT_FOUND`, `FORBIDDEN`

### `PATCH /api/quotes/{id}` → 200
부분 수정(전달 필드만). 본인만.
- Body: `content`(opt), `memo`(opt), `characterName`(opt), `visibility`(opt)
- Res: `{ quoteId, content, visibility, work: {…}, schedules: [] }` · Errors: `NOT_FOUND`, `FORBIDDEN`

### `DELETE /api/quotes/{id}` → 200
연결된 알림도 함께 삭제. 본인만.
- Res: `{ deleted: true }` · Errors: `NOT_FOUND`, `FORBIDDEN`

---

## 예약 알림 (Schedules)

### `POST /api/quotes/{id}/schedules` → 201
대사에 알림 설정. WEEKLY는 `daysOfWeek` 필수.
- Body: `sendTime`(req, `"HH:mm"`), `repeatType`(req, `DAILY|WEEKLY|ONCE`), `daysOfWeek`(opt, `"MON,WED,FRI"`)
- Res: `{ scheduleId, sendTime, repeatType, daysOfWeek, isActive }`
- Errors: `NOT_FOUND`, `FORBIDDEN`, `VALIDATION_ERROR`

### `GET /api/schedules/me` → 200
내 모든 알림(대사 정보 포함). **배열 반환**.
- Res: `[{ scheduleId, sendTime, repeatType, daysOfWeek, isActive, quote: { quoteId, content, characterName, work: {…} } }]`

### `PATCH /api/schedules/{id}` → 200
시간/반복/on-off 부분 수정. 본인만.
- Body: `sendTime`(opt), `repeatType`(opt), `daysOfWeek`(opt), `isActive`(opt)
- Res: `{ scheduleId, sendTime, repeatType, daysOfWeek, isActive }` · Errors: `NOT_FOUND`, `FORBIDDEN`, `VALIDATION_ERROR`

### `DELETE /api/schedules/{id}` → 200
- Res: `{ deleted: true }` · Errors: `NOT_FOUND`, `FORBIDDEN`

---

## 소셜 (Follow · Profile · Feed · Like)

### `GET /api/users/search` → 200
닉네임 검색(본인 제외), 팔로우 여부 포함.
- Query: `query`(req)
- Res: `{ items: [{ userId, nickname, bio, isFollowing }] }`

### `GET /api/users/{id}` → 200
프로필 + FOLLOWERS 공개 대사(본인/팔로우 중일 때만). 출처 포함.
- Res: `{ userId, nickname, bio, followerCount, followingCount, isFollowing, quotes: [{ quoteId, content, characterName, work: { title, author } }] }`
- Errors: `NOT_FOUND`

### `POST /api/users/{id}/follow` → 200
팔로우(자기 자신 불가, 멱등).
- Res: `{ following: true }` · Errors: `NOT_FOUND`, `VALIDATION_ERROR`

### `DELETE /api/users/{id}/follow` → 200
언팔로우(멱등).
- Res: `{ following: false }`

### `GET /api/feed` → 200
팔로우한 사람들의 FOLLOWERS 공개 대사(최신순). **모든 대사에 출처 포함**.
- Query: `page`(opt), `size`(opt)
- Res: `{ items: [{ quoteId, content, characterName, author: { userId, nickname }, work: { title, author }, likeCount, isLiked }], page, hasNext }`

### `POST /api/quotes/{id}/like` → 200
좋아요(멱등), 갱신된 개수 반환.
- Res: `{ liked: true, likeCount }` · Errors: `NOT_FOUND`

### `DELETE /api/quotes/{id}/like` → 200
좋아요 취소(멱등).
- Res: `{ liked: false, likeCount }`
