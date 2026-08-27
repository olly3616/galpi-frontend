# 갈피 모바일 앱 — UI 키트

A click-through recreation of the 갈피 app as specified in `uploads/02_화면설계서.md` (S-01 … S-09) and `uploads/03_워크플로우.md` (WF-01 … WF-10). 390×844 phone frame; every screen is composed from the design-system components — nothing is re-implemented locally.

## Files

- `index.html` — mount + phone frame. Open this.
- `data.js` — mock shelf, quotes, feed (`window.GalpiData`). Public-domain works only.
- `kakaoBooks.js` — Kakao 책 검색 API adapter (`window.KakaoBooks`): `mapDocument` / `map(res)` turn a `{meta, documents[]}` response into the book shape the components expect, and `search(q)` returns a mocked response in that exact shape. Field mapping: `title` → title, `authors[]` → author (comma-joined), `thumbnail` → cover (empty → typographic fallback), ISBN13 from `isbn` → id, `publisher` / `datetime[0:4]` → the row's meta line, `status !== "정상판매"` → `soldOut`. Replace `search()` with a real `fetch('https://dapi.kakao.com/v3/search/book?query=…', {headers:{Authorization:'KakaoAK …'}})` and nothing else changes.
- `AuthScreens.jsx` — `Screen` scaffold, `Wordmark`, S-01 로그인, S-02 회원가입.
- `ShelfScreens.jsx` — S-03 내 책장, S-04 책 추가.
- `QuoteScreens.jsx` — S-05 책 상세, S-06 대사 작성, S-07 대사 상세 + 알림 설정, `CoverThumb`.
- `SocialScreens.jsx` — S-08 피드, S-09 프로필·설정.
- `App.jsx` — routing (auth stack ↔ tab stack), mock mutations, and the preview rail.

## What you can click

- **WF-03** 로그인: password under 4 chars → inline error banner; otherwise a button spinner then 내 책장.
- **WF-02** 회원가입: live validation (email format, 8-char password, 닉네임 "갈피" is taken); 가입하기 stays disabled until valid.
- **WF-04/05** 책 추가: type to search (a query containing "웹" returns the empty result that pushes you to 직접 등록); [추가] shelves the book and returns to S-03; already-shelved rows read 책장에 있음.
- **WF-06** 대사 기록: 책 표지 → S-05 → [+] → write a 대사 → 저장 → it appears at the top of the list and the shelf count increments.
- **WF-07** 알림 설정: tap a quote card → S-07 → set time / 반복 → 알림 저장 → the alarm is listed with a gold bell.
- **WF-09** 피드: tap a card to toggle 좋아요.
- **WF-10** 로그아웃: 프로필 → 로그아웃 → back to S-01.

The rail to the right of the phone is **not part of the product** — it jumps to screens and to the 빈 화면 / 로딩(스켈레톤) / 에러 states the spec requires.

## Known gaps

- No cover imagery is bundled, so books fall back to the typographic cover. Real covers arrive as `thumbnail` from the Kakao API and flow into `cover` on `Bookshelf` / `BookRow` / `BookCard`.
- 사용자 검색 (WF-08) and the read-only feed detail are stubbed: the buttons exist, the screens were not specified in enough detail to recreate.
