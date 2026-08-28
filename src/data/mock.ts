/**
 * Mock content for the markup phase (no API yet). Titles/quotes are public-domain works.
 * Replaced by real server data (F-06 /api/bookshelf/me etc.) in the API pass.
 * See project memory `project_galpi_build_phasing`.
 */
import { Colors } from '@/constants/theme';

const c = Colors.light;

export type MockBook = {
  id: string;
  workId: number;
  title: string;
  author: string;
  coverUrl?: string | null;
  tint?: string;
  quoteCount: number;
};

export const MOCK_BOOKS: MockBook[] = [
  { id: 'b1', workId: 1, title: '데미안', author: '헤르만 헤세', tint: c.primarySoft, quoteCount: 3 },
  { id: 'b2', workId: 2, title: '위대한 개츠비', author: 'F. 스콧 피츠제럴드', tint: c.bgPageAlt, quoteCount: 2 },
  { id: 'b3', workId: 3, title: '어린 왕자', author: '앙투안 드 생텍쥐페리', tint: c.accentSoft, quoteCount: 5 },
  { id: 'b4', workId: 4, title: '노인과 바다', author: '어니스트 헤밍웨이', tint: c.surfaceSkeleton, quoteCount: 1 },
  { id: 'b5', workId: 5, title: '달빛 아래 첫 문장', author: '이서린', tint: c.successSoft, quoteCount: 4 },
  { id: 'b6', workId: 6, title: '지킬 박사와 하이드', author: '로버트 루이스 스티븐슨', tint: c.primarySoft, quoteCount: 2 },
  { id: 'b7', workId: 7, title: '이방인', author: '알베르 카뮈', tint: c.bgPageAlt, quoteCount: 3 },
  { id: 'b8', workId: 8, title: '변신', author: '프란츠 카프카', tint: c.accentSoft, quoteCount: 1 },
  { id: 'b9', workId: 9, title: '오만과 편견', author: '제인 오스틴', tint: c.successSoft, quoteCount: 6 },
];

export type MockSearchResult = {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  coverUrl?: string | null;
  /** Marks results already in the shelf → row shows "책장에 있음" instead of 추가. */
  inShelf?: boolean;
};

/**
 * Stand-in for the 도서 검색 API (F-04 /api/books/search) during the markup phase.
 * add-book filters these by the typed query; a query containing "웹" returns nothing so the
 * "검색 결과 없음 → 직접 등록" funnel (web-novel case) is reviewable.
 */
export const MOCK_SEARCH_RESULTS: MockSearchResult[] = [
  { id: 's1', title: '데미안', author: '헤르만 헤세', publisher: '민음사', inShelf: true },
  { id: 's2', title: '수레바퀴 아래서', author: '헤르만 헤세', publisher: '민음사' },
  { id: 's3', title: '싯다르타', author: '헤르만 헤세', publisher: '문학동네' },
  { id: 's4', title: '어린 왕자', author: '앙투안 드 생텍쥐페리', publisher: '열린책들', inShelf: true },
  { id: 's5', title: '1984', author: '조지 오웰', publisher: '민음사' },
  { id: 's6', title: '동물농장', author: '조지 오웰', publisher: '민음사' },
];

export type MockQuote = {
  id: string;
  bookId: string;
  characterName?: string;
  content: string;
  memo?: string;
  hasSchedule?: boolean;
  visibility?: 'PRIVATE' | 'FOLLOWERS';
};

/**
 * Stand-in for the 대사 data (F-07 /api/works/{id}/quotes) during the markup phase.
 * 책 상세(S-05) reads the quotes for a book by filtering on bookId. Public-domain quotes.
 */
export const MOCK_QUOTES: MockQuote[] = [
  {
    id: 'q1',
    bookId: 'b1',
    characterName: '싱클레어',
    content: '새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 한 세계를 파괴해야 한다.',
    memo: '처음 읽었을 때 한참 멈춰 있었던 문장.',
    hasSchedule: true,
    visibility: 'PRIVATE',
  },
  {
    id: 'q2',
    bookId: 'b1',
    characterName: '데미안',
    content:
      '우리가 어떤 사람을 미워한다면, 우리는 그의 모습 속에서 우리 자신 안에 있는 무엇인가를 미워하는 것이다.',
    visibility: 'PRIVATE',
  },
  { id: 'q3', bookId: 'b1', content: '내 안에서 솟아나는 것, 그것을 살아보려 했다.', visibility: 'PRIVATE' },
  {
    id: 'q6',
    bookId: 'b3',
    characterName: '여우',
    content: '가장 중요한 것은 눈에 보이지 않아.',
    memo: '친구에게 그대로 보내줬다.',
    hasSchedule: true,
    visibility: 'FOLLOWERS',
  },
  {
    id: 'q7',
    bookId: 'b3',
    characterName: '어린 왕자',
    content: '네가 오후 네 시에 온다면, 나는 세 시부터 행복해지기 시작할 거야.',
    visibility: 'PRIVATE',
  },
  { id: 'q8', bookId: 'b4', content: '인간은 파괴될 수 있지만 패배하지 않는다.', hasSchedule: true, visibility: 'PRIVATE' },
];
