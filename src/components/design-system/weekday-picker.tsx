import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Colors, Radius, Typography } from '@/constants/theme';

const c = Colors.light;

const DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;
export type Weekday = (typeof DAYS)[number];

/** Day-of-week toggles for a WEEKLY schedule (S-07). */
export function WeekdayPicker({
  value,
  onChange,
}: {
  value: Weekday[];
  onChange: (next: Weekday[]) => void;
}) {
  const toggle = (d: Weekday) =>
    onChange(value.includes(d) ? value.filter((x) => x !== d) : [...value, d]);

  return (
    <View style={styles.row}>
      {DAYS.map((d) => {
        const on = value.includes(d);
        return (
          <Pressable
            key={d}
            onPress={() => toggle(d)}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            style={[
              styles.day,
              { backgroundColor: on ? c.primary : c.surfaceCard, borderColor: on ? c.primary : c.border },
            ]}>
            <Text style={[styles.label, { color: on ? c.textOnPrimary : c.textSecondary }, on && styles.labelOn]}>
              {d}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  day: {
    flex: 1,
    height: 40,
    borderRadius: Radius.badge,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { ...Typography.bodySm },
  labelOn: { fontFamily: BrandFonts.uiSemibold },
});
