import { useMutation, useQueryClient } from '@tanstack/react-query';

import { quoteKeys } from '@/features/quotes/queries';

import { createSchedule, deleteSchedule, updateSchedule, type CreateScheduleInput, type UpdateScheduleInput } from './api';

// Schedule changes affect the owning quote (its schedules list) and its book's list (hasSchedule flag).
function invalidators(quoteId: number, workId?: number) {
  return (qc: ReturnType<typeof useQueryClient>) => {
    qc.invalidateQueries({ queryKey: quoteKeys.detail(quoteId) });
    if (workId != null && Number.isFinite(workId)) qc.invalidateQueries({ queryKey: quoteKeys.work(workId) });
  };
}

export function useCreateSchedule(quoteId: number, workId?: number) {
  const qc = useQueryClient();
  const invalidate = invalidators(quoteId, workId);
  return useMutation({
    mutationFn: (input: CreateScheduleInput) => createSchedule(quoteId, input),
    onSuccess: () => invalidate(qc),
  });
}

export function useUpdateSchedule(quoteId: number, workId?: number) {
  const qc = useQueryClient();
  const invalidate = invalidators(quoteId, workId);
  return useMutation({
    mutationFn: ({ scheduleId, patch }: { scheduleId: number; patch: UpdateScheduleInput }) =>
      updateSchedule(scheduleId, patch),
    onSuccess: () => invalidate(qc),
  });
}

export function useDeleteSchedule(quoteId: number, workId?: number) {
  const qc = useQueryClient();
  const invalidate = invalidators(quoteId, workId);
  return useMutation({
    mutationFn: (scheduleId: number) => deleteSchedule(scheduleId),
    onSuccess: () => invalidate(qc),
  });
}
