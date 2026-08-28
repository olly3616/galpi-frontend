import { useLocalSearchParams, useRouter } from 'expo-router';
import { Bell, ChevronDown, ChevronUp, Ellipsis, StickyNote } from 'lucide-react-native';
import { useState } from 'react';
import { PanResponder, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Button,
  Calendar,
  Card,
  GalpiText,
  ScreenHeader,
  Segmented,
  Switch,
  WeekdayPicker,
  type Weekday,
} from '@/components/design-system';
import { BrandFonts, Colors, Layout, Spacing, Typography } from '@/constants/theme';
import { MOCK_BOOKS, MOCK_QUOTES } from '@/data/mock';

const c = Colors.light;

type RepeatType = 'daily' | 'weekly' | 'once';
type Alarm = { time: string; repeat: string };

export default function QuoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const quote = MOCK_QUOTES.find((q) => q.id === id);
  const book = quote ? MOCK_BOOKS.find((b) => b.id === quote.bookId) : undefined;

  // Markup phase: seed an existing alarm for quotes flagged hasSchedule so the list state shows.
  const [alarms, setAlarms] = useState<Alarm[]>(
    quote?.hasSchedule ? [{ time: '07:30', repeat: '매일' }] : [],
  );
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [repeat, setRepeat] = useState<RepeatType>('daily');
  const [days, setDays] = useState<Weekday[]>(['월', '수', '금']);
  const [onceDate, setOnceDate] = useState(() => new Date());
  const [on, setOn] = useState(true);

  if (!quote) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="문장" onBack={() => router.back()} />
        <View style={styles.centered}>
          <GalpiText variant="body" color={c.textSecondary}>
            문장을 찾을 수 없어요
          </GalpiText>
        </View>
      </SafeAreaView>
    );
  }

  const saveAlarm = () => {
    // Markup phase: append locally. Real create (F-10 POST /quotes/{id}/schedules) is wired later.
    const repeatLabel =
      repeat === 'daily'
        ? '매일'
        : repeat === 'weekly'
          ? days.join('·')
          : `${onceDate.getMonth() + 1}월 ${onceDate.getDate()}일`;
    setAlarms((prev) => [...prev, { time: `${hour}:${minute}`, repeat: repeatLabel }]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="문장"
        onBack={() => router.back()}
        trailing={
          <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="수정·삭제">
            <Ellipsis size={22} color={c.textSecondary} />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Quote — the protagonist */}
        <View>
          {quote.characterName ? (
            <Text style={styles.character}>{quote.characterName}</Text>
          ) : null}
          <Text style={styles.quote}>
            <Text style={styles.openQuote}>“</Text>
            {quote.content}
          </Text>
          {book ? (
            <GalpiText variant="meta" color={c.textSecondary} style={styles.source}>
              {book.title} · {book.author}
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

  // Drag the number vertically to change it: up increases, down decreases (minutes by `step`).
  // Deltas apply incrementally (via a closure accumulator) so no stale value is read.
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
      {/* Drag up/down on the number to change it (minutes by 5). */}
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
