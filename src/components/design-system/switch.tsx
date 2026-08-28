import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Shadows, Typography } from '@/constants/theme';
import { GalpiText } from './galpi-text';

const c = Colors.light;

export function Switch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  description?: string;
}) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      accessibilityRole="switch"
      accessibilityState={{ checked }}
      style={styles.row}>
      {label || description ? (
        <View style={styles.textCol}>
          {label ? <GalpiText variant="body">{label}</GalpiText> : null}
          {description ? (
            <GalpiText variant="meta" color={c.textSecondary} style={styles.desc}>
              {description}
            </GalpiText>
          ) : null}
        </View>
      ) : null}
      <View style={[styles.track, { backgroundColor: checked ? c.primary : c.borderStrong }]}>
        <View style={[styles.thumb, { left: checked ? 21 : 3 }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  textCol: { flex: 1 },
  desc: { ...Typography.meta, marginTop: 2 },
  track: { width: 46, height: 28, borderRadius: 999 },
  thumb: {
    position: 'absolute',
    top: 3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    ...(Shadows.sm as object),
  },
});
