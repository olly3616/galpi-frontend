import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors, Layout, Radius, Shadows } from '@/constants/theme';

const c = Colors.light;

/** Surface container. `sunken` uses the inset paper tone with no shadow (e.g. a memo block). */
export function Card({
  children,
  sunken = false,
  style,
}: {
  children: React.ReactNode;
  sunken?: boolean;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, sunken ? styles.sunken : styles.raised, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.card,
    padding: Layout.padCard,
  },
  raised: {
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    ...(Shadows.md as object),
  },
  sunken: {
    backgroundColor: c.surfaceSunken,
  },
});
