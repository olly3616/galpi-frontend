import { Plus } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

import { Colors, Layout, Shadows, Spacing } from '@/constants/theme';

const c = Colors.light;

/** The 우하단 [+] action on shelf/book-detail screens (S-03/S-05). Sits clear of the tab bar. */
export function FloatingButton({
  onPress,
  label,
  bottomInset = 0,
}: {
  onPress?: () => void;
  label: string;
  /** Extra offset for the safe-area / tab bar height so the FAB clears it. */
  bottomInset?: number;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.fab,
        { bottom: Layout.tabBarHeight + Spacing.four + bottomInset },
        pressed && styles.pressed,
      ]}>
      <Plus size={24} color={c.textOnPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: Layout.gutterScreen,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: c.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Shadows.lg as object),
  },
  pressed: { transform: [{ scale: 0.96 }], backgroundColor: c.primaryHover },
});
