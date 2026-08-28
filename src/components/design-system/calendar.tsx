import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Colors, Typography } from '@/constants/theme';

const c = Colors.light;
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/** Compact month calendar for picking a single date (S-07 "한 번" schedule). */
export function Calendar({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  const [view, setView] = useState({ y: value.getFullYear(), m: value.getMonth() });

  const startDay = new Date(view.y, view.m, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);

  const isSelected = (d: number) =>
    value.getFullYear() === view.y && value.getMonth() === view.m && value.getDate() === d;
  const prev = () => setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }));
  const next = () => setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }));

  return (
    <View>
      <View style={styles.head}>
        <Pressable onPress={prev} hitSlop={8} accessibilityRole="button" accessibilityLabel="이전 달">
          <ChevronLeft size={20} color={c.textSecondary} />
        </Pressable>
        <Text style={styles.title}>{`${view.y}년 ${view.m + 1}월`}</Text>
        <Pressable onPress={next} hitSlop={8} accessibilityRole="button" accessibilityLabel="다음 달">
          <ChevronRight size={20} color={c.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.week}>
        {WEEKDAYS.map((w) => (
          <Text key={w} style={styles.weekday}>
            {w}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((d, i) => (
          <View key={i} style={styles.cell}>
            {d ? (
              <Pressable
                onPress={() => onChange(new Date(view.y, view.m, d))}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected(d) }}
                style={[styles.day, isSelected(d) && styles.daySelected]}>
                <Text style={[styles.dayText, isSelected(d) && styles.dayTextSelected]}>{d}</Text>
              </Pressable>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { ...Typography.bodySm, fontFamily: BrandFonts.uiSemibold, color: c.textPrimary },
  week: { flexDirection: 'row' },
  weekday: {
    flex: 1,
    textAlign: 'center',
    ...Typography.meta,
    color: c.textMuted,
    paddingVertical: 4,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 2 },
  day: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: { backgroundColor: c.primary },
  dayText: { ...Typography.bodySm, color: c.textPrimary },
  dayTextSelected: { color: c.textOnPrimary, fontFamily: BrandFonts.uiSemibold },
});
