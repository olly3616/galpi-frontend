import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { quoteKeys } from '@/features/quotes/queries';
import { nextPageParam } from '@/lib/api/pagination';

import {
  createSchedule,
  deleteSchedule,
  getMySchedules,
  updateSchedule,
  type CreateScheduleInput,
  type UpdateScheduleInput,
} from './api';

export const schedulesKeys = { me: ['schedules', 'me'] as const };

type QueryClient = ReturnType<typeof useQueryClient>;

// A schedule change touches: the 내 알림 목록, the owning quote's detail, and its book's list.
function invalidateAll(qc: QueryClient, quoteId?: number, workId?: number) {
  qc.invalidateQueries({ queryKey: schedulesKeys.me });
  if (quoteId != null && Number.isFinite(quoteId)) qc.invalidateQueries({ queryKey: quoteKeys.detail(quoteId) });
  if (workId != null && Number.isFinite(workId)) qc.invalidateQueries({ queryKey: quoteKeys.work(workId) });
}

/** 내 알림 목록, paginated. */
export function useMySchedules() {
  return useInfiniteQuery({
    queryKey: schedulesKeys.me,
    queryFn: ({ pageParam }) => getMySchedules(pageParam),
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
  });
}

export function useCreateSchedule(quoteId: number, workId?: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateScheduleInput) => createSchedule(quoteId, input),
    onSuccess: () => invalidateAll(qc, quoteId, workId),
  });
}

export function useUpdateSchedule(quoteId: number, workId?: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ scheduleId, patch }: { scheduleId: number; patch: UpdateScheduleInput }) =>
      updateSchedule(scheduleId, patch),
    onSuccess: () => invalidateAll(qc, quoteId, workId),
  });
}

export function useDeleteSchedule(quoteId: number, workId?: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (scheduleId: number) => deleteSchedule(scheduleId),
    onSuccess: () => invalidateAll(qc, quoteId, workId),
  });
}

/** Toggle a schedule's on/off from the 내 알림 목록 (quote id comes with each row). */
export function useToggleSchedule() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { scheduleId: number; isActive: boolean; quoteId: number; workId: number }) =>
      updateSchedule(v.scheduleId, { isActive: v.isActive }),
    onSuccess: (_data, v) => invalidateAll(qc, v.quoteId, v.workId),
  });
}
