import { useLocalSearchParams, useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { Bell, ChevronDown, ChevronUp, Ellipsis, StickyNote } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, PanResponder, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Button,
  Calendar,
  Card,
  ErrorState,
  GalpiText,
  ScreenHeader,
  Segmented,
  Switch,
  WeekdayPicker,
  type Weekday,
} from '@/components/design-system';
import { BrandFonts, Colors, Layout, Spacing, Typography } from '@/constants/theme';
import type { ScheduleSummary } from '@/features/quotes/api';
import { useDeleteQuote, useQuoteDetail } from '@/features/quotes/queries';

const c = Colors.light;

type RepeatType = 'daily' | 'weekly' | 'once';
type Alarm = { time: string; repeat: string };

// Format a server schedule into the compact "time · repeat" display used in the alarm list.
function scheduleLabel(s: ScheduleSummary): string {
  if (s.repeatType === 'DAILY') return '매일';
  if (s.repeatType === 'WEEKLY') return s.daysOfWeek?.split(',').join('·') ?? '매주';
  return '한 번';
}

export default function QuoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const quoteId = Number(id);

  const detail = useQuoteDetail(quoteId);
  const removeQuote = useDeleteQuote();
  const quote = detail.data;
  const book = quote?.work;

  // Alarm editor is still local markup — real schedule CRUD lands in the 알림(schedules) branch.
  // The list below is seeded from the quote's real schedules for display.
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [seededId, setSeededId] = useState<number | null>(null);
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [repeat, setRepeat] = useState<RepeatType>('daily');
  const [days, setDays] = useState<Weekday[]>(['월', '수', '금']);
  const [onceDate, setOnceDate] = useState(() => new Date());
  const [on, setOn] = useState(true);

  // Seed the alarm list from the loaded quote once (React's "adjust state during render" pattern).
  if (quote && seededId !== quote.quoteId) {
    setSeededId(quote.quoteId);
    setAlarms(quote.schedules.map((s) => ({ time: s.sendTime, repeat: scheduleLabel(s) })));
  }

  const goEdit = () => router.push(`/quote/new?quoteId=${quoteId}` as Href);
  const confirmDelete = () => {
    Alert.alert('문장 삭제', '이 문장을 삭제할까요? 되돌릴 수 없어요.', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => removeQuote.mutate({ quoteId, workId: book?.workId ?? NaN }, { onSuccess: () => router.back() }),
      },
    ]);
  };
  const openMenu = () => {
    Alert.alert('문장', undefined, [
      { text: '수정', onPress: goEdit },
      { text: '삭제', style: 'destructive', onPress: confirmDelete },
      { text: '취소', style: 'cancel' },
    ]);
  };

  const saveAlarm = () => {
    const repeatText =
      repeat === 'daily'
        ? '매일'
        : repeat === 'weekly'
          ? days.join('·')
          : `${onceDate.getMonth() + 1}월 ${onceDate.getDate()}일`;
    setAlarms((prev) => [...prev, { time: `${hour}:${minute}`, repeat: repeatText }]);
  };

  if (detail.isPending) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="문장" onBack={() => router.back()} />
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (detail.isError || !quote) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="문장" onBack={() => router.back()} />
        <View style={styles.centered}>
          <ErrorState
            title="문장을 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => detail.refetch()}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="문장"
        onBack={() => router.back()}
        trailing={
          <Pressable onPress={openMenu} hitSlop={8} accessibilityRole="button" accessibilityLabel="수정·삭제">
            <Ellipsis size={22} color={c.textSecondary} />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Quote — the protagonist */}
        <View>
          {quote.characterName ? <Text style={styles.character}>{quote.characterName}</Text> : null}
          <Text style={styles.quote}>
            <Text style={styles.openQuote}>“</Text>
            {quote.content}
          </Text>
          {book ? (
            <GalpiText variant="meta" color={c.textSecondary} style={styles.source}>
              {book.title}
              {book.author ? ` · ${book.author}` : ''}
            </GalpiText>
          ) : null}
        </View>

        {/* Memo */}
        {quote.memo ? (
          <Card sunken>
            <View style={styles.memoHead}>
              <StickyNote size={14} color={c.textSecondary} />
              <GalpiText variant="meta" color={c.textSecondary}>
                메모
              </GalpiText>
            </View>
            <GalpiText variant="bodySm" style={styles.memoText}>
              {quote.memo}
            </GalpiText>
          </Card>
        ) : null}

        {/* Alarm setting — the highlight (editor persistence arrives in the schedules branch) */}
        <View>
          <Text style={styles.sectionTitle}>이 문장을 언제 만날까요?</Text>
          {alarms.length === 0 ? (
            <GalpiText variant="metaLg" color={c.textSecondary} style={styles.alarmHint}>
              알림을 설정하면 이 문장을 다시 만날 수 있어요
            </GalpiText>
          ) : null}

          <Card style={styles.alarmCard}>
            <View style={styles.timeRow}>
              <TimeField value={hour} onChange={setHour} max={23} />
              <Text style={styles.colon}>:</Text>
              <TimeField value={minute} onChange={setMinute} max={59} step={5} />
            </View>

            <Segmented
              options={[
                { id: 'daily', label: '매일' },
                { id: 'weekly', label: '특정 요일' },
                { id: 'once', label: '한 번' },
              ]}
              value={repeat}
              onChange={setRepeat}
            />

            {repeat === 'weekly' ? <WeekdayPicker value={days} onChange={setDays} /> : null}
            {repeat === 'once' ? <Calendar value={onceDate} onChange={setOnceDate} /> : null}

            <Switch label="알림 켜기" checked={on} onChange={setOn} />

            <Button label="알림 저장" fullWidth onPress={saveAlarm} />
          </Card>

          {alarms.length > 0 ? (
            <View style={styles.alarmList}>
              {alarms.map((a, i) => (
                <View key={i} style={styles.alarmItem}>
                  <Bell size={16} color={c.accentStrong} />
                  <Text style={styles.alarmTime}>{a.time}</Text>
                  <GalpiText variant="meta" color={c.textSecondary}>
                    {a.repeat}
                  </GalpiText>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DRAG_PX_PER_STEP = 18; // vertical pixels of drag per one step change

function TimeField({
  value,
  onChange,
  max,
  step = 1,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  max: number;
  step?: number;
}) {
  const wrapFmt = (n: number) => String(((n % (max + 1)) + (max + 1)) % (max + 1)).padStart(2, '0');
  const bump = (dir: number) => onChange((p) => wrapFmt(parseInt(p, 10) + dir * step));

  const [pan] = useState(() => {
    let dragged = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dy) > 3,
      onPanResponderGrant: () => {
        dragged = 0;
      },
      onPanResponderMove: (_e, g) => {
        const steps = Math.round(-g.dy / DRAG_PX_PER_STEP);
        const delta = steps - dragged;
        if (delta !== 0) {
          dragged = steps;
          onChange((p) => wrapFmt(parseInt(p, 10) + delta * step));
        }
      },
    });
  });

  return (
    <View style={styles.timeField}>
      <Pressable onPress={() => bump(1)} hitSlop={6} accessibilityLabel="증가">
        <ChevronUp size={16} color={c.textMuted} />
      </Pressable>
      <View {...pan.panHandlers} accessibilityLabel="위아래로 드래그하여 값 변경">
        <Text style={styles.timeValue}>{value}</Text>
      </View>
      <Pressable onPress={() => bump(-1)} hitSlop={6} accessibilityLabel="감소">
        <ChevronDown size={16} color={c.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.six,
  },
  character: {
    ...Typography.metaLg,
    fontFamily: BrandFonts.uiSemibold,
    color: c.textSecondary,
    marginBottom: Spacing.three,
  },
  quote: { fontFamily: BrandFonts.quote, fontSize: 24, lineHeight: 40, color: c.textPrimary },
  openQuote: { color: '#C7A98F' },
  source: { marginTop: Spacing.four },
  memoHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  memoText: { lineHeight: 24 },
  sectionTitle: { fontFamily: BrandFonts.quote, fontSize: 18, color: c.textPrimary, marginBottom: Spacing.two },
  alarmHint: { marginBottom: Spacing.three },
  alarmCard: { gap: Spacing.four },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  timeField: { alignItems: 'center', gap: 2 },
  timeValue: {
    fontFamily: BrandFonts.uiSemibold,
    fontSize: 34,
    color: c.textPrimary,
    minWidth: 56,
    textAlign: 'center',
  },
  colon: { fontFamily: BrandFonts.ui, fontSize: 26, color: c.textMuted },
  alarmList: { marginTop: Spacing.three, gap: Spacing.two },
  alarmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 12,
  },
  alarmTime: { ...Typography.bodySm, fontFamily: BrandFonts.uiMedium, color: c.textPrimary },
});
