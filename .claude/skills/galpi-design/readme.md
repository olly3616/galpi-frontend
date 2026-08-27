# 갈피 (Galpi) — Design System

**갈피** means *bookmark*: a quiet, warm place to keep the lines you love. The product is a Korean-language mobile reading-record app — you shelve a book, copy out the 대사 (line/quote) that stayed with you, and set a time to meet it again. A follow feed lets readers share lines with attribution.

The whole system follows one rule: **the 대사 is the protagonist, and the UI steps back.** Paper-toned surfaces, serif quotes, brown leather accents, no noise.

## Sources

Everything here was derived from three documents supplied by the user (no codebase, Figma file, or logo asset was provided):

- `uploads/02_화면설계서.md` — screen specification, S-01 … S-09, with required empty/loading/error states.
- `uploads/03_워크플로우.md` — navigation graph and user workflows WF-01 … WF-10.
- The brand/design brief pasted in chat (색상·타이포·간격·컴포넌트 규칙, tone & microcopy guidance).

There is now a brand mark at `assets/logo.svg` — a book with a gold bookmark tucked between its pages, drawn as a geometric outline at Lucide's stroke weight (2.6 on a 48 grid) so it sits beside the icon set. The full lockup pairs it with 갈피 set in the serif face (`Wordmark` in `ui_kits/galpi-app/AuthScreens.jsx`). It is a simple constructed mark, not a finished identity: if a designed logo exists, drop it in over this file.

## Products

One product surface exists today: the **갈피 mobile app** (iOS/Android, 390×844 reference). Three tabs — 내 책장 / 피드 / 프로필 — plus an auth stack. No marketing site, docs site, or deck template has been specified, so none is built here.

---

## CONTENT FUNDAMENTALS

**Language.** Korean, always. English appears only in code identifiers, never in UI copy.

**Voice: 다정하고 담백하게** — warm but plain. The app speaks like a considerate librarian, not a marketer and not a system log.

- **Invite, don't report.** Empty states end in `-보세요` / `-요`, not `없습니다`. "첫 책을 책장에 꽂아보세요", not "등록된 책이 없습니다".
- **Softened statements** use `-어요` (해요체): "아직 이 책에 담은 대사가 없어요", "검색 결과가 없어요. 직접 등록해보세요".
- **Formal `-습니다` is reserved for failures** the user did not cause: "책장을 불러오지 못했습니다", "이메일 또는 비밀번호가 올바르지 않습니다". The politeness shift is deliberate: errors are stated plainly, then paired with a way out.
- **Questions to invite an action**, especially around notifications: "이 대사를 언제 다시 만날까요?" — the feature is framed as meeting a line again, never as "알림 설정하기".
- **The product's own vocabulary**: 대사 (a line), 책장 (shelf), 꽂다 (to shelve), 담다 (to keep/hold), 만나다 (to meet a line again). Prefer these over generic 저장/등록/추가 wherever a human would use them.
- **No exclamation marks. No emoji. No ALL-CAPS. No exhortation** ("지금 바로!", "무료로 시작하기"). Numbers stay bare: "3권 · 대사 12개".
- **Buttons are short verb phrases**: 로그인, 가입하기, 책 추가, 대사 담기, 알림 저장, 다시 시도. Never "저장하기 →" or "확인!".
- **Labels are nouns**: 이메일, 비밀번호, 닉네임, 등장인물, 메모, 공개 범위. Hints are one short clause: "8자 이상", "2~20자", "선택 · 없으면 제목으로 기본 표지를 만들어요".
- **Attribution is copy, not decoration.** Every shared quote must show 출처 (title · author). This is a copyright requirement from the spec, not a styling choice.

Serif is used for warm human sentences (quotes, empty-state invitations, the wordmark); sans for every label, button, title, and meta line. That split is itself a content rule.

---

## VISUAL FOUNDATIONS

**Mood.** Paper, ink, warm leather. A bookshop at closing time. Nothing cold, mechanical, saturated, or social-feed loud.

**Color.** Ivory page `--bg-page #FBF9F4`; white cards `--surface-card`; warm greys for text (`--ink-900 #2E2A26` body, `--ink-400 #8A817A` secondary). One filled action color — brown `--primary #8B5E3C` (hover/press `--brown-700 #6E4930`). Gold `--accent #C9A227` is a *point* accent only: the 대사 N개 badge, an active bell. Never a gold surface, never gold text on gold. Error `#C0492F` and success `#5B7A5B` are desaturated to sit on paper. At most two background tones on a screen (ivory page + white card); `--paper-200` for sunken tracks and inset blocks. No gradients anywhere — flat tinted fills only.

**Type.** Two families. **Nanum Myeongjo** (serif, `--font-quote`) for 대사 at 20–24px / line-height 1.6, plus empty-state titles and the 갈피 wordmark. **Pretendard** (sans, `--font-ui`) for everything else: screen titles 26/700, section headers 19/600, body 16/400, meta 13–14/400, buttons 16/600. Titles tighten to `-0.01em`; Korean body text keeps tracking at 0. Line-height 1.3 titles, 1.45 body, 1.6 quotes. Minimum text size in app screens is 11px (tab labels) — body never below 13.

**Spacing & layout.** 4-multiple scale (4 8 12 16 20 24 32 40 48). Screen gutter 20, card padding 16, element gap 12–16, section gap 28. Fixed elements: status bar (44), header (52), bottom tab bar (56) + 22 home-indicator strip, FAB pinned bottom-right clearing the tab bar. Shelf grid is 3 columns with 16px gaps and a locked 2:3 cover ratio; quote lists are single-column with 12px gaps.

**Corners.** Cover 8, control/button/input 12, card 16, sheet 20, badge/day-pill fully round. Nothing square, nothing over 20 except pills.

**Shadows.** Paper lifted a hair off the desk, three levels only: `--shadow-1` (0 1px 2px / 5%) for list rows and segmented thumbs, `--shadow-2` (0 2px 6px / 6%) for cards and covers, `--shadow-3` (0 6px 16px / 8%) for the FAB. All shadows are warm-black `rgba(46,42,38,…)`, never neutral or blue. Cards always pair a shadow with a hairline `--border` — the border does the work, the shadow only hints. No inner shadows.

**Interaction.** Hover darkens brown (`--brown-700`) or lightens a row to `--paper-200`; press adds `scale(.98)`; focus is a 1px brown border plus a 3px `rgba(139,94,60,.16)` ring (`--shadow-focus`) — never a blue browser outline. Disabled = grey fill `--paper-300` + `--ink-300` text at 45% opacity.

**Animation.** Quiet and short: 120ms for control feedback, 200ms for toggles and tab changes, 320ms for a content fade-up (`galpi-fade-up`, 6px rise). Easing is `cubic-bezier(.32,.72,0,1)`. Skeletons breathe by opacity (`galpi-shimmer`, 1.4s) rather than sliding a highlight. No bounce, no spring, no parallax, no page-flip metaphors.

**Loading, empty, error.** Skeletons first for any list or grid; spinners exist **only** inside a Button or a search field. Empty states are centred: a soft brown medallion with a thin-line icon, a serif invitation, a plain description, one button. Errors always carry a retry — no dead ends.

**Imagery.** Book covers come from the **Kakao 책 검색 API** (`documents[].thumbnail`, mapped in `ui_kits/galpi-app/kakaoBooks.js`); when the field is empty or the book was 직접 등록된 웹소설 a typographic fallback cover is generated — paper-toned fill, 5px `--brown-300` spine on the left edge, title set in serif. On 내 책장 the covers stand on plank ledges (`Bookshelf`) with a contact shadow and a 4px lift on hover. No stock photography, no illustration library, no full-bleed hero imagery. Transparency and blur are unused: surfaces are opaque. Decoration is limited to a 3px left rule on quote cards and an opening `“` on 대사 상세.

---

## ICONOGRAPHY

No icon set was supplied with the brief, and the brief asks for **thin outline icons**. **Substitution flagged: [Lucide](https://lucide.dev) (1.5px outline, 24px grid) is loaded from CDN** — `https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/<name>.svg`. If 갈피 has its own icon set, drop the SVGs into `assets/icons/` and repoint `components/core/Icon.jsx`.

- Icons are rendered as **CSS masks** (`Icon.jsx`), so they inherit `currentColor` — tint via the parent's color, not by editing SVG.
- Sizes: 16 in meta rows, 18 inside buttons/fields, 20 default, 22 in the tab bar, 24–30 in FAB and empty-state medallions.
- Core glyphs: `library` (내 책장), `users` (피드), `user` (프로필), `bookmark` (brand mark, quotes), `bell` (알림), `heart` (좋아요), `plus` (추가), `search` (검색), `sticky-note` (메모), `quote`, `chevron-left/right/up/down`, `rotate-cw` (다시 시도), `cloud-off` (에러), `eye`/`eye-off` (비밀번호 보기), `image-plus` (표지 업로드), `ellipsis` (더보기).
- **Emoji are never used in the UI.** The spec's 🔔 shorthand is rendered as the `bell` glyph. Unicode characters are used only as typographic furniture: `“` on the quote detail and `·` as a meta separator.

---

## Index

Root manifest:

- `styles.css` — the single entry point consumers link. `@import`s only.
- `tokens/` — `fonts.css` (Pretendard + Nanum Myeongjo via CDN), `colors.css`, `typography.css`, `spacing.css`, `radius-shadow.css`, `motion.css`.
- `guidelines/` — 19 specimen cards (Colors, Type, Spacing, Brand) plus `card.css`, the shared card styling.
- `components/` — see below; each directory has a `*.card.html` specimen.
- `ui_kits/galpi-app/` — the mobile app recreation. `README.md`, `index.html`, `data.js`, `kakaoBooks.js` (Kakao 책 검색 API adapter), `AuthScreens.jsx`, `ShelfScreens.jsx`, `QuoteScreens.jsx`, `SocialScreens.jsx`, `App.jsx`.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — Agent Skills wrapper.
- `assets/` — `logo.svg` (book + bookmark mark). No other brand imagery was supplied.

### Components

`components/core/` — **Button**, **IconButton**, **FloatingButton**, **Badge**, **Card**, **Icon**
`components/forms/` — **Input** (input + textarea), **Switch**, **RadioGroup**, **WeekdayPicker**
`components/content/` — **Bookshelf**, **BookCard**, **BookRow**, **QuoteCard**
`components/navigation/` — **ScreenHeader**, **Segmented**, **TabBar**
`components/feedback/` — **EmptyState**, **ErrorState** (+ **ErrorBanner**), **Skeleton** (+ **SkeletonBookGrid**, **SkeletonQuoteList**)

Each component ships `<Name>.jsx`, `<Name>.d.ts` (props contract), and `<Name>.prompt.md` (what/when + usage).

**Intentional additions** — beyond the families named in the brief:

- **Bookshelf** — 내 책장 is a 가판대: covers stand face-out on wooden planks, three to a row, and tapping one opens that book's 대사 모음. `BookCard` stays for flat-grid and list contexts.
- **Icon** — a glyph wrapper, needed because no icon set was supplied; keeps every icon consistent and tintable.
- **FloatingButton** — the spec's 우하단 [+] on S-03 and S-05, promoted to a component.
- **ScreenHeader** — every screen in the spec has a header (large title or back + centred title); factored out rather than repeated.
- **ErrorBanner** — the spec's inline form error ("이메일 또는 비밀번호가 올바르지 않습니다"), shipped alongside the full-screen ErrorState.
- **SkeletonBookGrid / SkeletonQuoteList** — the two skeleton shapes the spec requires, as presets over `Skeleton`.

### Screens covered (from `02_화면설계서.md`)

S-01 로그인 · S-02 회원가입 · S-03 내 책장 (기본/빈/로딩/에러) · S-04 책 추가 (검색·직접등록, 검색 전/중/결과없음) · S-05 책 상세 · S-06 대사 작성 · S-07 대사 상세 + 알림 설정 · S-08 피드 (기본/빈/로딩) · S-09 프로필·설정.
