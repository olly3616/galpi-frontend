import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Colors, Radius, Shadows, Typography } from '@/constants/theme';

const c = Colors.light;

export type SegmentOption<T extends string> = { id: T; label: string };

/** Segmented control — 검색으로 추가 / 직접 등록, repeat cadence, etc. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <View style={styles.track}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <Pressable
            key={o.id}
            onPress={() => onChange(o.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            style={[styles.segment, on && styles.segmentOn]}>
            <Text style={[styles.label, on ? styles.labelOn : styles.labelOff]} numberOfLines={1}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    gap: 2,
    padding: 3,
    backgroundColor: c.surfaceSunken,
    borderRadius: Radius.control,
  },
  segment: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentOn: { backgroundColor: c.surfaceCard, ...(Shadows.sm as object) },
  label: { ...Typography.bodySm },
  labelOn: { fontFamily: BrandFonts.uiSemibold, color: c.textPrimary },
  labelOff: { color: c.textSecondary },
});
