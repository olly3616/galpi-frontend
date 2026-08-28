import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, ScreenHeader, Switch } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';

const c = Colors.light;

// Notification preferences (opened from 프로필 → 알림 설정). Two independent categories so a
// user can keep quote alarms while turning marketing off. Persisted via the API pass later.
export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [quoteNotif, setQuoteNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="알림 설정" onBack={() => router.back()} />
      <View style={styles.body}>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Switch
              label="문장 알림"
              description="예약한 문장을 설정한 시간에 알려드려요"
              checked={quoteNotif}
              onChange={setQuoteNotif}
            />
          </View>
          <View style={styles.rowLast}>
            <Switch
              label="마케팅·소식 알림"
              description="혜택과 새 소식을 받아볼게요"
              checked={marketingNotif}
              onChange={setMarketingNotif}
            />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  body: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.four },
  card: { padding: 0, overflow: 'hidden' },
  row: { padding: Layout.padCard, borderBottomWidth: 1, borderBottomColor: c.border },
  rowLast: { padding: Layout.padCard },
});
