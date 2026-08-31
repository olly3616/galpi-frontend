import { useLocalSearchParams, useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { Bell, ChevronDown, ChevronUp, Ellipsis, StickyNote, Trash2 } from 'lucide-react-native';
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
import { useCreateSchedule, useDeleteSchedule, useUpdateSchedule } from '@/features/schedules/queries';

const c = Colors.light;

type RepeatType = 'daily' | 'weekly' | 'once';

const DAY_ORDER: Weekday[] = ['월', '화', '수', '목', '금', '토', '일'];
const DAY_TO_API: Record<Weekday, string> = { 월: 'MON', 화: 'TUE', 수: 'WED', 목: 'THU', 금: 'FRI', 토: 'SAT', 일: 'SUN' };
const daysToApi = (days: Weekday[]) => DAY_ORDER.filter((d) => days.includes(d)).map((d) => DAY_TO_API[d]).join(',');

// Format a server schedule into the compact "repeat" label shown next to its time.
function scheduleLabel(s: ScheduleSummary): string {
  if (s.repeatType === 'DAILY') return '매일';
  if (s.repeatType === 'WEEKLY') return s.daysOfWeek?.split(',').join('·') ?? '매주';
  return '한 번';
}

const REPEAT_TO_API = { daily: 'DAILY', weekly: 'WEEKLY', once: 'ONCE' } as const;

const pad2 = (n: number) => String(n).padStart(2, '0');
const toDateStr = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export default function QuoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const quoteId = Number(id);

  const detail = useQuoteDetail(quoteId);
  const removeQuote = useDeleteQuote();
  const quote = detail.data;
  const book = quote?.work;

  const createSchedule = useCreateSchedule(quoteId, book?.workId);
  const updateSchedule = useUpdateSchedule(quoteId, book?.workId);
  const removeSchedule = useDeleteSchedule(quoteId, book?.workId);

  // Alarm editor state (the schedule list itself is the quote's real `schedules`).
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [repeat, setRepeat] = useState<RepeatType>('daily');
  const [days, setDays] = useState<Weekday[]>(['월', '수', '금']);
  const [onceDate, setOnceDate] = useState(() => new Date());
  const [alarmError, setAlarmError] = useState('');

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
    if (createSchedule.isPending) return;
    if (repeat === 'weekly' && days.length === 0) {
      setAlarmError('요일을 하나 이상 선택해주세요.');
      return;
    }
    setAlarmError('');
    createSchedule.mutate(
      {
        sendTime: `${hour}:${minute}`,
        repeatType: REPEAT_TO_API[repeat],
        daysOfWeek: repeat === 'weekly' ? daysToApi(days) : undefined,
        sendDate: repeat === 'once' ? toDateStr(onceDate) : undefined,
      },
      {
        onError: () => setAlarmError('알림을 저장하지 못했어요. 다시 시도해주세요.'),
      },
    );
  };

  const toggleActive = (s: ScheduleSummary) =>
    updateSchedule.mutate({ scheduleId: s.scheduleId, patch: { isActive: !s.isActive } });

  const confirmDeleteSchedule = (s: ScheduleSummary) =>
    Alert.alert('알림 삭제', '이 알림을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: () => removeSchedule.mutate(s.scheduleId) },
    ]);

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

        {/* Alarm setting — the highlight */}
        <View>
          <Text style={styles.sectionTitle}>이 문장을 언제 만날까요?</Text>
          {quote.schedules.length === 0 ? (
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

            {alarmError ? (
              <GalpiText variant="meta" color={c.error}>
                {alarmError}
              </GalpiText>
            ) : null}

            <Button label="알림 저장" fullWidth loading={createSchedule.isPending} onPress={saveAlarm} />
          </Card>

          {quote.schedules.length > 0 ? (
            <View style={styles.alarmList}>
              {quote.schedules.map((s) => (
                <View key={s.scheduleId} style={styles.alarmItem}>
                  <Bell size={16} color={s.isActive ? c.accentStrong : c.textMuted} />
                  <View style={styles.alarmTextCol}>
                    <Text style={[styles.alarmTime, !s.isActive && styles.alarmTimeOff]}>{s.sendTime}</Text>
                    <GalpiText variant="meta" color={c.textSecondary}>
                      {scheduleLabel(s)}
                    </GalpiText>
                  </View>
                  <Switch checked={s.isActive} onChange={() => toggleActive(s)} />
                  <Pressable
                    onPress={() => confirmDeleteSchedule(s)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="알림 삭제">
                    <Trash2 size={18} color={c.textMuted} />
                  </Pressable>
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
  alarmTextCol: { flex: 1 },
  alarmTime: { ...Typography.bodySm, fontFamily: BrandFonts.uiMedium, color: c.textPrimary },
  alarmTimeOff: { color: c.textMuted },
});
