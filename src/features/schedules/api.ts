import type { ScheduleSummary } from '@/features/quotes/api';
import { api } from '@/lib/api/client';
import type { PageResponse } from '@/lib/api/pagination';

/** A schedule shares the quote-detail schedule shape. */
export type Schedule = ScheduleSummary;

/** A schedule with its owning quote (내 알림 목록, GET /api/schedules/me). */
export type ScheduleWithQuote = Schedule & {
  quote: {
    quoteId: number;
    content: string;
    characterName?: string;
    work: { workId: number; title: string; author?: string; coverUrl?: string | null };
  };
};

export type RepeatType = 'DAILY' | 'WEEKLY' | 'ONCE';

export type CreateScheduleInput = {
  sendTime: string; // "HH:mm"
  repeatType: RepeatType;
  daysOfWeek?: string; // "MON,WED,FRI" — required when WEEKLY
  sendDate?: string; // "YYYY-MM-DD" — required when ONCE
};

export type UpdateScheduleInput = {
  sendTime?: string;
  repeatType?: RepeatType;
  daysOfWeek?: string;
  sendDate?: string;
  isActive?: boolean;
};

export async function getMySchedules(page = 0, size = 20): Promise<PageResponse<ScheduleWithQuote>> {
  const res = await api.get<PageResponse<ScheduleWithQuote>>('/api/schedules/me', { params: { page, size } });
  return res.data;
}

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
