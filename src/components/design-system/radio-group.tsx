import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Colors, Layout, Radius, Typography } from '@/constants/theme';

const c = Colors.light;

export type RadioOption<T extends string> = { id: T; label: string; description?: string };

/** Stacked choice rows — e.g. 공개 범위(나만 보기/팔로워 공개). */
export function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <View>
      {label ? <Text style={styles.groupLabel}>{label}</Text> : null}
      <View style={styles.list}>
        {options.map((o) => {
          const on = o.id === value;
          return (
            <Pressable
              key={o.id}
              onPress={() => onChange(o.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              style={[styles.row, { borderColor: on ? c.primary : c.borderFocusSoft }]}>
              <View style={[styles.radio, { borderColor: on ? c.primary : c.borderStrong }]}>
                {on ? <View style={styles.radioDot} /> : null}
              </View>
              <View style={styles.textCol}>
                <Text style={[styles.optionLabel, on && styles.optionLabelOn]}>{o.label}</Text>
                {o.description ? <Text style={styles.optionDesc}>{o.description}</Text> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupLabel: {
    ...Typography.metaLg,
    fontFamily: BrandFonts.uiMedium,
    color: c.textPrimary,
    marginBottom: 8,
  },
  list: { gap: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: Layout.controlHeight,
    paddingHorizontal: 14,
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderRadius: Radius.control,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 9, height: 9, borderRadius: 4.5, backgroundColor: c.primary },
  textCol: { flex: 1, paddingVertical: 8 },
  optionLabel: { ...Typography.bodySm, color: c.textPrimary },
  optionLabelOn: { fontFamily: BrandFonts.uiMedium },
  optionDesc: { ...Typography.meta, color: c.textSecondary, marginTop: 2 },
});
