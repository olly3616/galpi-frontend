import type { ScheduleSummary } from '@/features/quotes/api';
import { api } from '@/lib/api/client';

/** A schedule shares the quote-detail schedule shape. */
export type Schedule = ScheduleSummary;

export type RepeatType = 'DAILY' | 'WEEKLY' | 'ONCE';

export type CreateScheduleInput = {
  sendTime: string; // "HH:mm"
  repeatType: RepeatType;
  daysOfWeek?: string; // "MON,WED,FRI" — required when WEEKLY
};

export type UpdateScheduleInput = {
  sendTime?: string;
  repeatType?: RepeatType;
  daysOfWeek?: string;
  isActive?: boolean;
};

export async function createSchedule(quoteId: number, input: CreateScheduleInput): Promise<Schedule> {
  const res = await api.post<Schedule>(`/api/quotes/${quoteId}/schedules`, input);
  return res.data;
}

export async function updateSchedule(scheduleId: number, patch: UpdateScheduleInput): Promise<Schedule> {
  const res = await api.patch<Schedule>(`/api/schedules/${scheduleId}`, patch);
  return res.data;
}

export async function deleteSchedule(scheduleId: number): Promise<void> {
  await api.delete(`/api/schedules/${scheduleId}`);
}
