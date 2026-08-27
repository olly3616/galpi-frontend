import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/components/design-system';
import { BrandFonts, Colors, Radius, Shadows, Spacing, Typography } from '@/constants/theme';

const c = Colors.light;

export type ShelfBook = {
  id: string;
  title: string;
  author?: string;
  coverUrl?: string | null;
  /** Fallback tint for cover-less (manually-added) books. */
  tint?: string;
  quoteCount: number;
};

/** 내 책장 — book covers standing face-out on wooden planks, `perRow` to a row (S-03). */
export function Bookshelf({
  books,
  perRow = 3,
  onSelect,
}: {
  books: ShelfBook[];
  perRow?: number;
  onSelect?: (id: string) => void;
}) {
  const rows: ShelfBook[][] = [];
  for (let i = 0; i < books.length; i += perRow) rows.push(books.slice(i, i + perRow));

  return (
    <View style={styles.shelf}>
      {rows.map((row, ri) => (
        <View key={ri}>
          <View style={styles.row}>
            {row.map((book) => (
              <View key={book.id} style={[styles.cell, { width: `${100 / perRow}%` }]}>
                <ShelfBookItem book={book} onPress={() => onSelect?.(book.id)} />
              </View>
            ))}
            {/* pad the last row so covers keep their column width */}
            {row.length < perRow
              ? Array.from({ length: perRow - row.length }).map((_, i) => (
                  <View key={`pad-${i}`} style={[styles.cell, { width: `${100 / perRow}%` }]} />
                ))
              : null}
          </View>
          <Plank />
        </View>
      ))}
    </View>
  );
}

function ShelfBookItem({ book, onPress }: { book: ShelfBook; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={book.title}
      style={({ pressed }) => [styles.book, pressed && styles.bookPressed]}>
      <View style={[styles.cover, { backgroundColor: book.tint ?? c.primarySoft }]}>
        {book.coverUrl ? (
          <Image source={{ uri: book.coverUrl }} style={styles.coverImage} contentFit="cover" />
        ) : (
          <View style={styles.coverText}>
            <Text style={styles.coverTitle} numberOfLines={4}>
              {book.title}
            </Text>
            {book.author ? (
              <Text style={styles.coverAuthor} numberOfLines={1}>
                {book.author}
              </Text>
            ) : null}
          </View>
        )}
        {book.quoteCount > 0 ? (
          <View style={styles.badge}>
            <Badge>{`${book.quoteCount}`}</Badge>
          </View>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {book.title}
      </Text>
    </Pressable>
  );
}

function Plank() {
  return (
    <View style={styles.plankWrap}>
      <View style={styles.plankTop} />
      <View style={styles.plankLip} />
    </View>
  );
}

const styles = StyleSheet.create({
  shelf: { gap: Spacing.three },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  // Center each book in its column and cap its width so covers stay a phone-sized "book"
  // (~3 shelves per screen) instead of stretching on wider viewports.
  cell: { paddingHorizontal: Spacing.two, alignItems: 'center' },
  book: { width: '100%', maxWidth: 112, gap: 5 },
  bookPressed: { transform: [{ translateY: -2 }] },
  cover: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: Radius.cover,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.6)',
    borderRightWidth: 1,
    borderRightColor: c.border,
    borderBottomWidth: 1,
    borderBottomColor: c.borderStrong,
    borderLeftWidth: 5,
    borderLeftColor: '#C7A98F',
    ...(Shadows.md as object),
  },
  coverImage: { width: '100%', height: '100%' },
  coverText: { flex: 1, justifyContent: 'center', padding: 10 },
  coverTitle: { fontFamily: BrandFonts.quote, fontSize: 14, lineHeight: 20, color: c.primaryHover },
  coverAuthor: { marginTop: 6, fontFamily: BrandFonts.ui, fontSize: 10, color: c.textSecondary },
  badge: { position: 'absolute', right: 5, bottom: 5 },
  title: { ...Typography.meta, fontFamily: BrandFonts.uiMedium, color: c.textPrimary },
  plankWrap: { marginTop: 4 },
  plankTop: { height: 8, borderTopLeftRadius: 2, borderTopRightRadius: 2, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, backgroundColor: '#C7A98F' },
  plankLip: { height: 4, marginHorizontal: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, backgroundColor: c.primarySoft },
});
