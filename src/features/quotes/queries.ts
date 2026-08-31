import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { bookshelfKeys } from '@/features/bookshelf/queries';
import { schedulesKeys } from '@/features/schedules/queries';
import { nextPageParam } from '@/lib/api/pagination';

import {
  createQuote,
  deleteQuote,
  getQuote,
  getWork,
  getWorkQuotes,
  updateQuote,
  type UpdateQuoteInput,
} from './api';

export const quoteKeys = {
  work: (workId: number) => ['works', workId, 'quotes'] as const,
  workInfo: (workId: number) => ['works', workId] as const,
  detail: (quoteId: number) => ['quotes', quoteId] as const,
};

/** A work's basic info (used by the compose screen's book row). */
export function useWork(workId: number) {
  return useQuery({
    queryKey: quoteKeys.workInfo(workId),
    queryFn: () => getWork(workId),
    enabled: Number.isFinite(workId),
  });
}

/** A book's quotes, paginated (책 상세 = 대사 모아보기). `work` is on each page. */
export function useWorkQuotes(workId: number) {
  return useInfiniteQuery({
    queryKey: quoteKeys.work(workId),
    queryFn: ({ pageParam }) => getWorkQuotes(workId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => nextPageParam(last.quotes),
    enabled: Number.isFinite(workId),
  });
}

export function useQuoteDetail(quoteId: number) {
  return useQuery({
    queryKey: quoteKeys.detail(quoteId),
    queryFn: () => getQuote(quoteId),
    enabled: Number.isFinite(quoteId),
  });
}

/** Create a quote; refresh the book's list and the shelf (quoteCount changes). */
export function useCreateQuote(workId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: quoteKeys.work(workId) });
      qc.invalidateQueries({ queryKey: bookshelfKeys.me });
    },
  });
}

/** Patch a quote; update its detail cache and refresh the book's list. */
export function useUpdateQuote(quoteId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: UpdateQuoteInput) => updateQuote(quoteId, patch),
    onSuccess: (data) => {
      qc.setQueryData(quoteKeys.detail(quoteId), data);
      qc.invalidateQueries({ queryKey: quoteKeys.work(data.work.workId) });
      // 내 알림 목록 embeds the quote's content/work, so edits must refresh it too.
      qc.invalidateQueries({ queryKey: schedulesKeys.me });
    },
  });
}

/** Delete a quote; refresh the book's list and the shelf, and drop its now-dead caches. */
export function useDeleteQuote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ quoteId }: { quoteId: number; workId: number }) => deleteQuote(quoteId),
    onSuccess: (_res, { quoteId, workId }) => {
      qc.invalidateQueries({ queryKey: quoteKeys.work(workId) });
      qc.invalidateQueries({ queryKey: bookshelfKeys.me });
      // Refresh 내 알림 목록 (a deleted quote must not leave a phantom alarm row) and drop the
      // stale detail cache so nothing navigates to a dead /quote/{id}.
      qc.invalidateQueries({ queryKey: schedulesKeys.me });
      qc.removeQueries({ queryKey: quoteKeys.detail(quoteId) });
    },
  });
}
