import { Bell, StickyNote } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Colors, Radius, Shadows, Spacing, Typography } from '@/constants/theme';

const c = Colors.light;

/**
 * The quote is the protagonist: serif, large, generous leading, a 3px left rule as furniture.
 * Used in 책 상세 (S-05) as a tappable preview; the bell/note icons hint schedule/memo state.
 */
export function QuoteCard({
  characterName,
  content,
  source,
  hasSchedule = false,
  hasMemo = false,
  clamp = 3,
  onPress,
}: {
  characterName?: string;
  content: string;
  /** Source line (e.g. "데미안 · 헤르만 헤세") — shown in cross-book lists like 내 문장 전체. */
  source?: string;
  hasSchedule?: boolean;
  hasMemo?: boolean;
  clamp?: number;
  onPress?: () => void;
}) {
  const showFooter = hasSchedule || hasMemo;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [styles.card, pressed && onPress ? styles.pressed : null]}>
      <View style={styles.rule} />
      {characterName || showFooter ? (
        <View style={styles.header}>
          {characterName ? (
            <Text style={styles.character} numberOfLines={1}>
              {characterName}
            </Text>
          ) : null}
          {showFooter ? (
            <View style={styles.marks}>
              {hasSchedule ? <Bell size={15} color={c.accentStrong} /> : null}
              {hasMemo ? <StickyNote size={15} color={c.textSecondary} /> : null}
            </View>
          ) : null}
        </View>
      ) : null}
      <Text style={styles.quote} numberOfLines={clamp}>
        {content}
      </Text>
      {source ? (
        <Text style={styles.source} numberOfLines={1}>
          {source}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: Radius.card,
    padding: Spacing.three,
    paddingLeft: 20,
    ...(Shadows.md as object),
  },
  pressed: { transform: [{ scale: 0.995 }], backgroundColor: c.bgPageAlt },
  rule: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 3,
    borderRadius: 3,
    backgroundColor: '#C7A98F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  character: {
    ...Typography.meta,
    fontFamily: BrandFonts.uiSemibold,
    color: c.textSecondary,
    flexShrink: 1,
  },
  // Status marks sit to the right of the character name (bell = scheduled, note = memo).
  marks: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginLeft: 'auto' },
  quote: { fontFamily: BrandFonts.quote, fontSize: 20, lineHeight: 32, color: c.textPrimary },
  source: { ...Typography.meta, color: c.textSecondary, marginTop: Spacing.three },
});
