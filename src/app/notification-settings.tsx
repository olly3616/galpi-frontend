import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, ErrorState, ScreenHeader, Switch } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { useNotificationSettings, useUpdateNotificationSettings } from '@/features/notifications/queries';

const c = Colors.light;

// Notification preferences (opened from 프로필 → 알림 설정). Two independent categories so a
// user can keep quote alarms while turning marketing off. Persisted via /api/users/me/notification-settings.
export default function NotificationSettingsScreen() {
  const router = useRouter();
  const settings = useNotificationSettings();
  const update = useUpdateNotificationSettings();
  const data = settings.data;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="알림 설정" onBack={() => router.back()} />

      {settings.isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : settings.isError || !data ? (
        <View style={styles.centered}>
          <ErrorState
            title="설정을 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => settings.refetch()}
          />
        </View>
      ) : (
        <View style={styles.body}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <Switch
                label="문장 알림"
                description="예약한 문장을 설정한 시간에 알려드려요"
                checked={data.quoteAlarm}
                onChange={(v) => update.mutate({ quoteAlarm: v })}
              />
            </View>
            <View style={styles.rowLast}>
              <Switch
                label="마케팅·소식 알림"
                description="혜택과 새 소식을 받아볼게요"
                checked={data.marketing}
                onChange={(v) => update.mutate({ marketing: v })}
              />
            </View>
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.four },
  card: { padding: 0, overflow: 'hidden' },
  row: { padding: Layout.padCard, borderBottomWidth: 1, borderBottomColor: c.border },
  rowLast: { padding: Layout.padCard },
});
