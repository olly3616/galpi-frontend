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
];
