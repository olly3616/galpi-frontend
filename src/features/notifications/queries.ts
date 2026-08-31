import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getNotificationSettings, updateNotificationSettings, type NotificationSettings } from './api';

export const notificationKeys = { settings: ['notification-settings'] as const };

/** The signed-in user's push preferences (알림 설정 화면). */
export function useNotificationSettings() {
  return useQuery({ queryKey: notificationKeys.settings, queryFn: getNotificationSettings });
}

/** Toggle a preference with an optimistic flip, reverted on error and reconciled from the server. */
export function useUpdateNotificationSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<NotificationSettings>) => updateNotificationSettings(patch),
    onMutate: async (patch) => {
      await qc.cancelQueries({ queryKey: notificationKeys.settings });
      const prev = qc.getQueryData<NotificationSettings>(notificationKeys.settings);
      if (prev) qc.setQueryData<NotificationSettings>(notificationKeys.settings, { ...prev, ...patch });
      return { prev };
    },
    onError: (_err, _patch, ctx) => {
      if (ctx?.prev) qc.setQueryData(notificationKeys.settings, ctx.prev);
    },
    onSuccess: (data) => qc.setQueryData(notificationKeys.settings, data),
  });
}
