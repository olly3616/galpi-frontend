import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Colors, Layout } from '@/constants/theme';

const c = Colors.light;

export type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  /** Large left-aligned title for tab roots; default is the compact centered pushed-screen title. */
  large?: boolean;
  /** Custom left element (e.g. a 취소 text button), used instead of the back chevron. */
  leading?: React.ReactNode;
  /** Optional trailing control (e.g. a save action). */
  trailing?: React.ReactNode;
};

export function ScreenHeader({ title, onBack, large = false, leading, trailing }: ScreenHeaderProps) {
  const centered = !large && (onBack !== undefined || leading !== undefined);
  return (
    <View style={styles.header}>
      {leading ? (
        <View style={styles.leading}>{leading}</View>
      ) : onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="뒤로"
          style={styles.back}>
          <ChevronLeft size={26} color={c.textSecondary} />
        </Pressable>
      ) : null}
      <Text
        style={[
          styles.title,
          large ? styles.titleLarge : styles.titleCompact,
          centered && styles.titleCentered,
        ]}
        numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.trailing}>{trailing}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 52,
    paddingHorizontal: Layout.gutterScreen,
    paddingVertical: 6,
    backgroundColor: c.bgPage,
  },
  back: { marginLeft: -8 },
  leading: { justifyContent: 'center' },
  title: {
    flex: 1,
    color: c.textPrimary,
    letterSpacing: -0.17,
  },
  titleLarge: { fontFamily: BrandFonts.uiBold, fontSize: 26, textAlign: 'left' },
  titleCompact: { fontFamily: BrandFonts.uiSemibold, fontSize: 17 },
  titleCentered: { textAlign: 'center' },
  // Keeps the centered title optically centered by balancing the back button's width.
  trailing: { minWidth: 26, alignItems: 'flex-end' },
});
