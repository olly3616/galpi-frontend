# 갈피 백엔드 API 레퍼런스

> 백엔드(Spring Boot)에서 받은 명세(v0.0.1, 문서 생성 2026-08-30)를 옮긴 것. 실행 중 서버의 대화형 문서는 `/swagger-ui.html`. 총 20개 엔드포인트.

## 공통

- **Base URL**: `http://localhost:8080` (개발). 모든 경로는 `/api`로 시작.
- **인증**: `/api/auth/**`(4개)만 토큰 없이 호출. 나머지는 모두 `Authorization: Bearer <accessToken>` 필요.
- **토큰**: 로그인/회원가입 시 `accessToken`(수명 1시간) + `refreshToken`(수명 14일) 발급. `userId`는 토큰에서 추출되므로 "내 것" 요청에 id를 보내지 않음.
- **Content-Type**: `application/json` · **시각**: `HH:mm`
- **페이지네이션**: `?page=0&size=20`(0-based). 목록 응답은 항상 `PageResponse<T>` = `{ items, page, hasNext }` (전체 개수/페이지 수 없음, 무한 스크롤용).
- **성공 응답**: 생성 계열(회원가입·책장추가·대사작성·알림생성)은 `201`, 그 외 `200`. 반환 데이터 없는 요청(삭제·등록·로그아웃)은 `SuccessResponse` = `{ "success": true }`.
- **에러**: 4xx/5xx 공통 `{ "error": { "code", "message" } }`. 검증 실패(400) message는 `"필드명: 사유"` 형식.

### Enums

- **BookSource**: `API`(검색으로 담음) · `MANUAL`(직접 등록)
- **BookType**: `NOVEL` · `WEBNOVEL`
- **Visibility**: `PRIVATE`(기본) · `FOLLOWERS`
- **RepeatType**: `DAILY` · `WEEKLY`(→ `daysOfWeek` 필수) · `ONCE`
- **Platform**: `ANDROID` · `IOS`

### 에러 코드

| code | HTTP | 상황 |
|---|---|---|
| `VALIDATION_ERROR` | 400 | 입력값 검증 실패(본문·쿼리) |
| `INVALID_CREDENTIALS` | 401 | 이메일/비밀번호 불일치(계정 존재 여부 미노출) |
| `INVALID_REFRESH_TOKEN` | 401 | 만료·회전·로그아웃된 리프레시 토큰 |
| `UNAUTHORIZED` | 401 | 토큰 없음/만료 |
| `FORBIDDEN` | 403 | 권한 없음(남의 리소스·못 보는 대사) |
| `NOT_FOUND` | 404 | 리소스 없음 |
| `EMAIL_DUPLICATED` | 409 | 이미 가입된 이메일 |
| `NICKNAME_DUPLICATED` | 409 | 이미 사용 중인 닉네임 |
| `ALREADY_IN_SHELF` | 409 | 이미 책장에 있는 책 |
| `ALREADY_LIKED` | 409 | 이미 좋아요한 대사 |
| `INTERNAL_SERVER_ERROR` | 500 | 서버 내부 오류 |

---

## 인증 (`/api/auth/**` — 토큰 불필요)

### `POST /api/auth/signup` → 201 · AuthResponse
- Body: `email`(req), `password`(req, 8~64자), `nickname`(req, 2~20자, 중복 불가)
- Res: `{ userId, email, nickname, accessToken, refreshToken }`
- Errors: `EMAIL_DUPLICATED`, `NICKNAME_DUPLICATED`(409), `VALIDATION_ERROR`(400)

### `POST /api/auth/login` → 200 · AuthResponse
- Body: `email`(req), `password`(req)
- Res: signup과 동일한 `AuthResponse`
- Errors: 계정 없음·비번 불일치 모두 `INVALID_CREDENTIALS`(401)

### `POST /api/auth/refresh` → 200 · RefreshResponse
- Body: `refreshToken`(req)
- Res: **`{ accessToken, refreshToken }`** — 리프레시 토큰은 **1회용(회전)**. 사용 즉시 폐기되고 새 쌍 발급 → **새 refreshToken을 반드시 교체 저장**.
- Errors: `INVALID_REFRESH_TOKEN`(401)

### `POST /api/auth/logout` → 200 · SuccessResponse
- Body: `refreshToken`(req) — 전달한 refreshToken 폐기(멱등)
- Res: `{ success: true }`

---

## 도서 검색 · 책장 · 책

### `GET /api/books/search` → 200 · PageResponse\<BookItem\>
카카오 도서 API 프록시 검색.
- Query: `query`(req), `page`(opt, 0), `size`(opt, 20)
- Item: `{ title, author, publisher, coverUrl, isbn }`

### `POST /api/bookshelf` → 201
- Body: `source`(req, `API|MANUAL`), `title`(req), `type`(req, `NOVEL|WEBNOVEL`), `author`(opt), `publisher`(opt), `coverUrl`(opt), `isbn`(opt, API 책 중복 판정)
- Res: **`{ workId }`** (담긴 Work ID — 이후 대사 작성에 사용)
- Errors: `ALREADY_IN_SHELF`(409)

### `GET /api/bookshelf/me` → 200 · PageResponse\<BookshelfItem\>
내 책장(최근 추가순), 각 책 대사 수 포함.
- Query: `page`, `size`
- Item: `{ workId, title, author, coverUrl, quoteCount }`

### `DELETE /api/bookshelf/{workId}` → 200 · SuccessResponse
책장에서 빼기(대사는 유지). 본인만. Errors: `NOT_FOUND`, `FORBIDDEN`

### `GET /api/works/{workId}` → 200 · WorkResponse
- Res: `{ workId, title, author, coverUrl, type, source }`

### `GET /api/works/{workId}/quotes` → 200 · WorkQuotesResponse
책 상세 = 대사 모아보기. **대사는 페이지네이션.**
- Path: `workId` · Query: `page`, `size`
- Res: `{ work: { workId, title, author, coverUrl }, quotes: PageResponse<{ quoteId, characterName, content, memo, hasSchedule, visibility }> }`

---

## 대사 (Quotes) — 조회·수정·삭제는 본인만

### `POST /api/quotes` → 201 · QuoteResponse
- Body: `workId`(req), `content`(req), `characterName`(opt), `memo`(opt), `visibility`(opt, 기본 `PRIVATE`)
- Res: `{ quoteId, content, characterName, memo, visibility, work: {workId,title,author,coverUrl}, schedules: ScheduleResponse[] }`

### `GET /api/quotes/{quoteId}` → 200 · QuoteResponse
작성 응답과 동일(출처 + 설정된 알림 포함). Errors: `NOT_FOUND`, `FORBIDDEN`

### `PATCH /api/quotes/{quoteId}` → 200 · QuoteResponse
부분 수정(전달 필드만, 생략=유지). Body(all opt): `content`, `memo`, `characterName`, `visibility`

### `DELETE /api/quotes/{quoteId}` → 200 · SuccessResponse
소프트 딜리트. 연결된 알림·좋아요도 삭제. Errors: `NOT_FOUND`, `FORBIDDEN`

---

## 예약 알림 (Schedules)

### `POST /api/quotes/{quoteId}/schedules` → 201 · ScheduleResponse
WEEKLY면 `daysOfWeek` 필수.
- Body: `sendTime`(req, `"HH:mm"`), `repeatType`(req, `DAILY|WEEKLY|ONCE`), `daysOfWeek`(WEEKLY 시 필수, `"MON,WED,FRI"`)
- Res: `{ scheduleId, sendTime, repeatType, daysOfWeek, isActive }`

### `GET /api/schedules/me` → 200 · PageResponse\<ScheduleWithQuoteResponse\>
내 알림 목록(대사 정보 포함). **페이지네이션.**
- Item: `{ scheduleId, sendTime, repeatType, daysOfWeek, isActive, quote: { quoteId, content, characterName, work: {workId,title,author,coverUrl} } }`

### `PATCH /api/schedules/{scheduleId}` → 200 · ScheduleResponse
부분 수정. Body(all opt): `sendTime`, `repeatType`, `daysOfWeek`(최종 WEEKLY면 필수), `isActive`

### `DELETE /api/schedules/{scheduleId}` → 200 · SuccessResponse
본인만.

---

## 소셜 (피드 · 좋아요 · 팔로우)

### `GET /api/feed` → 200 · PageResponse\<FeedItem\>
팔로우한 사용자의 `FOLLOWERS` 공개 대사(최신순).
- Item: `{ quoteId, content, characterName, author: { userId, nickname }, work: { title, author }, likeCount, isLiked }`

### `POST /api/quotes/{quoteId}/like` → 200 · LikeResponse
**1인 1회.** 이미 눌렀으면 `ALREADY_LIKED`(409), 못 보는 대사면 `FORBIDDEN`(403).
- Res: `{ liked: true, likeCount }`

### `DELETE /api/quotes/{quoteId}/like` → 200 · LikeResponse
멱등. Res: `{ liked: false, likeCount }`

### `GET /api/users/search` → 200 · PageResponse\<UserSearchItem\>
닉네임 부분 일치(본인 제외).
- Query: `query`(req), `page`, `size`
- Item: `{ userId, nickname, bio, isFollowing }`

### `GET /api/users/{userId}` → 200 · ProfileResponse
본인/팔로우 중일 때만 FOLLOWERS 공개 대사 노출(그 외 빈 목록). 대사는 페이지네이션.
- Path: `userId` · Query: `page`, `size`
- Res: `{ userId, nickname, bio, followerCount, followingCount, isFollowing, quotes: PageResponse<{ quoteId, content, characterName, work: {title,author} }> }`

### `POST /api/users/{userId}/follow` → 200 · FollowResponse
자기 자신 불가, 멱등. Res: `{ following: true }`

### `DELETE /api/users/{userId}/follow` → 200 · FollowResponse
멱등. Res: `{ following: false }`

---

## 디바이스 토큰

### `POST /api/device-tokens` → 200 · SuccessResponse
FCM 토큰 등록(같은 토큰 재전송 시 소유자/플랫폼만 upsert).
- Body: `token`(req), `platform`(req, `ANDROID|IOS`)
