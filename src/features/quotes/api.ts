import { api } from '@/lib/api/client';
import type { PageResponse } from '@/lib/api/pagination';

export type Visibility = 'PRIVATE' | 'FOLLOWERS';

export type WorkSummary = { workId: number; title: string; author?: string; coverUrl?: string | null };

/** A work's basic info (책 상세 헤더). */
export type Work = WorkSummary & { type?: string; source?: string };

/** A quote as it appears in a book's list. */
export type QuoteListItem = {
  quoteId: number;
  characterName?: string;
  content: string;
  memo?: string;
  hasSchedule: boolean;
  visibility: Visibility;
};

export type ScheduleSummary = {
  scheduleId: number;
  sendTime: string;
  repeatType: 'DAILY' | 'WEEKLY' | 'ONCE';
  daysOfWeek: string | null;
  isActive: boolean;
};

/** Full quote detail (출처 + 설정된 알림 포함). */
export type QuoteDetail = {
  quoteId: number;
  content: string;
  characterName?: string;
  memo?: string;
  visibility: Visibility;
  work: WorkSummary;
  schedules: ScheduleSummary[];
};

export type WorkQuotesResponse = { work: WorkSummary; quotes: PageResponse<QuoteListItem> };

/** A quote in 내 문장 전체 목록 — same as a list item but carries its owning work. */
export type MyQuoteItem = QuoteListItem & { work: WorkSummary };

export type CreateQuoteInput = {
  workId: number;
  content: string;
  characterName?: string;
  memo?: string;
  visibility?: Visibility;
};

export type UpdateQuoteInput = {
  content?: string;
  memo?: string;
  characterName?: string;
  visibility?: Visibility;
};

export async function getWork(workId: number): Promise<Work> {
  const res = await api.get<Work>(`/api/works/${workId}`);
  return res.data;
}

export async function getWorkQuotes(workId: number, page = 0, size = 20): Promise<WorkQuotesResponse> {
  const res = await api.get<WorkQuotesResponse>(`/api/works/${workId}/quotes`, { params: { page, size } });
  return res.data;
}

export async function getMyQuotes(page = 0, size = 20): Promise<PageResponse<MyQuoteItem>> {
  const res = await api.get<PageResponse<MyQuoteItem>>('/api/quotes/me', { params: { page, size } });
  return res.data;
}

export async function getQuote(quoteId: number): Promise<QuoteDetail> {
  const res = await api.get<QuoteDetail>(`/api/quotes/${quoteId}`);
  return res.data;
}

export async function createQuote(input: CreateQuoteInput): Promise<QuoteDetail> {
  const res = await api.post<QuoteDetail>('/api/quotes', input);
  return res.data;
}

export async function updateQuote(quoteId: number, patch: UpdateQuoteInput): Promise<QuoteDetail> {
  const res = await api.patch<QuoteDetail>(`/api/quotes/${quoteId}`, patch);
  return res.data;
}

export async function deleteQuote(quoteId: number): Promise<void> {
  await api.delete(`/api/quotes/${quoteId}`);
}
