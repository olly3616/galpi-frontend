/**
 * Mock content for the markup phase (no API yet). Titles/quotes are public-domain works.
 * Replaced by real server data (F-06 /api/bookshelf/me etc.) in the API pass.
 * See project memory `project_galpi_build_phasing`.
 */
import { Colors } from '@/constants/theme';

const c = Colors.light;

/** Stand-in for the signed-in user (profile screen S-09). Real data comes from auth in the API pass. */
export const MOCK_USER = {
  nickname: '서린',
  bio: '접어둔 문장을 다시 펼쳐보는 사람',
  followerCount: 18,
  followingCount: 12,
};

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

export type MockFeedItem = {
  id: string;
  /** The followed user who shared this 문장. */
  nickname: string;
  timeAgo: string;
  characterName?: string;
  content: string;
  /** Source work — ALWAYS shown in the feed (copyright/attribution rule). */
  bookTitle: string;
  bookAuthor: string;
  likeCount: number;
  /** Whether the signed-in user has already liked it (seed state for the toggle). */
  likedByMe?: boolean;
};

/**
 * Stand-in for the 팔로잉 피드 (F-09 /api/feed) during the markup phase — 문장 shared by people
 * the user follows. Every item carries its source work (title + author): the feed must never
 * surface a quote without attribution. Public-domain quotes.
 */
export const MOCK_FEED: MockFeedItem[] = [
  {
    id: 'f1',
    nickname: '도윤',
    timeAgo: '방금 전',
    characterName: '여우',
    content: '네가 길들인 것에 대해 너는 언제까지나 책임이 있어. 너는 네 장미에 대해 책임이 있어.',
    bookTitle: '어린 왕자',
    bookAuthor: '앙투안 드 생텍쥐페리',
    likeCount: 12,
    likedByMe: false,
  },
  {
    id: 'f2',
    nickname: '하람',
    timeAgo: '2시간 전',
    content: '그래서 우리는 계속 앞으로 나아가는 것이다. 물결을 거스르는 배처럼, 끊임없이 과거로 떠밀리면서도.',
    bookTitle: '위대한 개츠비',
    bookAuthor: 'F. 스콧 피츠제럴드',
    likeCount: 34,
    likedByMe: true,
  },
  {
    id: 'f3',
    nickname: '지오',
    timeAgo: '어제',
    characterName: '뫼르소',
    content: '나는 처음으로 세계의 정다운 무관심에 마음을 열었다.',
    bookTitle: '이방인',
    bookAuthor: '알베르 카뮈',
    likeCount: 8,
    likedByMe: false,
  },
  {
    id: 'f4',
    nickname: '민서',
    timeAgo: '2일 전',
    characterName: '싱클레어',
    content: '내 안에서 저절로 우러나오려는 것, 나는 그것을 살아보려 했다. 그것이 왜 그토록 어려웠을까.',
    bookTitle: '데미안',
    bookAuthor: '헤르만 헤세',
    likeCount: 21,
    likedByMe: false,
  },
  {
    id: 'f5',
    nickname: '유나',
    timeAgo: '3일 전',
    content: '허영과 자만은 흔히 같은 뜻으로 쓰이지만, 사실은 서로 다른 것이다.',
    bookTitle: '오만과 편견',
    bookAuthor: '제인 오스틴',
    likeCount: 5,
    likedByMe: false,
  },
];

export type MockPerson = {
  id: string;
  nickname: string;
  bio?: string;
  /** Whether the signed-in user currently follows this person (seed state for the toggle). */
  following?: boolean;
};

/**
 * Stand-ins for the 팔로워/팔로잉 목록 (F-08 /api/users/{id}/followers · /following) during the
 * markup phase — opened from the 팔로워 stat on the profile screen. The follow button toggles
 * locally; wired to /api/users/{id}/follow in the API pass.
 */
export const MOCK_FOLLOWERS: MockPerson[] = [
  { id: 'u1', nickname: '도윤', bio: '매일 한 문장씩 모으는 중', following: true },
  { id: 'u2', nickname: '하람', bio: '소설 속 마지막 문장을 좋아해요', following: false },
  { id: 'u3', nickname: '지오', bio: '카뮈와 카프카 사이', following: true },
  { id: 'u4', nickname: '민서', bio: '데미안을 세 번 읽었습니다', following: false },
  { id: 'u5', nickname: '유나', bio: '고전에서 위로를 찾는 사람', following: false },
  { id: 'u6', nickname: '태오', bio: '', following: true },
];

export const MOCK_FOLLOWING: MockPerson[] = [
  { id: 'u1', nickname: '도윤', bio: '매일 한 문장씩 모으는 중', following: true },
  { id: 'u3', nickname: '지오', bio: '카뮈와 카프카 사이', following: true },
  { id: 'u6', nickname: '태오', bio: '', following: true },
  { id: 'u7', nickname: '세나', bio: '밑줄 긋는 습관', following: true },
  { id: 'u8', nickname: '하연', bio: '시와 산문 사이 어딘가', following: true },
];
