import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors, Layout, Radius, Spacing } from '@/constants/theme';

const c = Colors.light;

/** Skeleton is the default loading treatment; it breathes by opacity (galpi-shimmer, 1.4s). */
export function Skeleton({
  width,
  height = 16,
  radius = Radius.control,
  style,
}: {
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  radius?: number;
  style?: ViewStyle;
}) {
  const [opacity] = useState(() => new Animated.Value(0.55));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.95, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.55, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width: width ?? '100%', height, borderRadius: radius, backgroundColor: c.surfaceSkeleton, opacity },
        style,
      ]}
    />
  );
}

/** The shelf-grid loading shape (S-03): cover placeholder + title line + count pill, per cell. */
export function SkeletonBookGrid({ count = 6, columns = 3 }: { count?: number; columns?: number }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.cell, { width: `${100 / columns}%` }]}>
          <Skeleton height={undefined} radius={Radius.cover} style={styles.cover} />
          <Skeleton height={12} width="80%" />
          <Skeleton height={18} width={48} radius={Radius.badge} />
        </View>
      ))}
    </View>
  );
}

/** The quote-list loading shape (S-05): a card with stacked text lines. */
export function SkeletonQuoteList({ count = 3 }: { count?: number }) {
  return (
    <View style={styles.quoteList}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.quoteCard}>
          <Skeleton height={11} width={56} />
          <Skeleton height={15} />
          <Skeleton height={15} width="88%" />
          <Skeleton height={15} width="62%" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { paddingHorizontal: Spacing.two, marginBottom: Layout.gapElementLg, gap: Spacing.two },
  cover: { aspectRatio: 2 / 3, width: '100%' },
  quoteList: { gap: Spacing.three },
  quoteCard: {
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: Radius.card,
    padding: Layout.padCard,
    gap: Spacing.two,
  },
});
