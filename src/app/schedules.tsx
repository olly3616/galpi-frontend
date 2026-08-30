import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { BellRing } from 'lucide-react-native';
import {
  ActivityIndicator,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, ErrorState, GalpiText, ScreenHeader, Switch } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import type { ScheduleWithQuote } from '@/features/schedules/api';
import { useMySchedules, useToggleSchedule } from '@/features/schedules/queries';

const c = Colors.light;

function repeatLabel(s: ScheduleWithQuote): string {
  if (s.repeatType === 'DAILY') return '매일';
  if (s.repeatType === 'WEEKLY') return s.daysOfWeek?.split(',').join('·') ?? '매주';
  return '한 번';
}

// 내 알림 목록 (S-07) — every scheduled 문장 alarm, opened from the profile screen.
export default function SchedulesScreen() {
  const router = useRouter();
  const q = useMySchedules();
  const toggle = useToggleSchedule();

  const items = q.data?.pages.flatMap((p) => p.items) ?? [];

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 320;
    if (nearBottom && q.hasNextPage && !q.isFetchingNextPage) q.fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="내 알림" onBack={() => router.back()} />

      {q.isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : q.isError ? (
        <View style={styles.centered}>
          <ErrorState
            title="알림을 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => q.refetch()}
          />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            icon={BellRing}
            title="예약한 알림이 없어요"
            description="문장에서 알림을 설정하면 여기 모여요"
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={200}>
          {items.map((s) => (
            <Pressable
              key={s.scheduleId}
              onPress={() => router.push(`/quote/${s.quote.quoteId}` as Href)}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              accessibilityRole="button">
              <BellRing size={18} color={s.isActive ? c.accentStrong : c.textMuted} />
              <View style={styles.itemBody}>
                <View style={styles.itemTop}>
                  <Text style={[styles.time, !s.isActive && styles.off]}>{s.sendTime}</Text>
                  <GalpiText variant="meta" color={c.textSecondary}>
                    {repeatLabel(s)}
                  </GalpiText>
                </View>
                <Text style={styles.quote} numberOfLines={1}>
                  {s.quote.content}
                </Text>
                <Text style={styles.source} numberOfLines={1}>
                  {s.quote.characterName ? `${s.quote.characterName} · ` : ''}
                  {s.quote.work.title}
                  {s.quote.work.author ? ` · ${s.quote.work.author}` : ''}
                </Text>
              </View>
              <Switch
                checked={s.isActive}
                onChange={() =>
                  toggle.mutate({
                    scheduleId: s.scheduleId,
                    isActive: !s.isActive,
                    quoteId: s.quote.quoteId,
                    workId: s.quote.work.workId,
                  })
                }
              />
            </Pressable>
          ))}
          {q.isFetchingNextPage ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator color={c.primary} />
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Layout.padCard,
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: Radius.card,
  },
  itemPressed: { backgroundColor: c.bgPageAlt },
  itemBody: { flex: 1, minWidth: 0, gap: 3 },
  itemTop: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.two },
  time: { fontFamily: BrandFonts.uiSemibold, fontSize: 18, color: c.textPrimary },
  off: { color: c.textMuted },
  quote: { ...Typography.bodySm, color: c.textPrimary },
  source: { ...Typography.meta, color: c.textMuted },
  footerLoading: { paddingVertical: Spacing.four, alignItems: 'center' },
});
