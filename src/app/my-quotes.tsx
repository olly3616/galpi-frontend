import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Check, ChevronDown, Quote } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuoteCard } from '@/components/content/quote-card';
import { EmptyState, ScreenHeader } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Radius, Shadows, Spacing, Typography } from '@/constants/theme';
import { MOCK_BOOKS, MOCK_QUOTES } from '@/data/mock';

const c = Colors.light;

type SortKey = 'saved' | 'title';
const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: 'saved', label: '저장순' },
  { id: 'title', label: '작품명순' },
];

// All of my quotes across every book (opened from the 문장 stat on the profile screen).
export default function MyQuotesScreen() {
  const router = useRouter();
  const bookById = (id: string) => MOCK_BOOKS.find((b) => b.id === id);
  const [sort, setSort] = useState<SortKey>('saved');
  const [menuOpen, setMenuOpen] = useState(false);
  const sortLabel = SORT_OPTIONS.find((o) => o.id === sort)?.label ?? '저장순';

  // 저장순 = the natural mock order; 작품명순 = grouped by book title (stable within a book).
  const quotes =
    sort === 'title'
      ? [...MOCK_QUOTES].sort((a, b) => {
          const ta = bookById(a.bookId)?.title ?? '';
          const tb = bookById(b.bookId)?.title ?? '';
          return ta.localeCompare(tb, 'ko');
        })
      : MOCK_QUOTES;

  const isEmpty = MOCK_QUOTES.length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="내 문장" onBack={() => router.back()} />

      {isEmpty ? (
        <View style={styles.centered}>
          <EmptyState icon={Quote} title="아직 담은 문장이 없어요" description="책에서 마음에 남은 문장을 옮겨두세요" />
        </View>
      ) : (
        <>
          {/* Sort control — a tappable pill (like home's badge) that opens a small menu. */}
          <View style={styles.sortRow}>
            <Pressable
              onPress={() => setMenuOpen((o) => !o)}
              style={styles.sortPill}
              accessibilityRole="button"
              accessibilityLabel={`정렬: ${sortLabel}`}>
              <Text style={styles.sortLabel}>{sortLabel}</Text>
              <ChevronDown size={14} color={c.textSecondary} />
            </Pressable>

            {menuOpen ? (
              <View style={styles.menu}>
                {SORT_OPTIONS.map((o) => {
                  const active = o.id === sort;
                  return (
                    <Pressable
                      key={o.id}
                      onPress={() => {
                        setSort(o.id);
                        setMenuOpen(false);
                      }}
                      style={styles.menuItem}
                      accessibilityRole="button"
                      accessibilityState={{ selected: active }}>
                      <Text style={[styles.menuText, active && styles.menuTextActive]}>{o.label}</Text>
                      {active ? <Check size={16} color={c.primary} /> : null}
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
          </View>

          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
            {quotes.map((q) => {
              const book = bookById(q.bookId);
              const source = book ? `${book.title} · ${book.author}` : undefined;
              return (
                <QuoteCard
                  key={q.id}
                  characterName={q.characterName}
                  content={q.content}
                  source={source}
                  hasSchedule={q.hasSchedule}
                  hasMemo={!!q.memo}
                  onPress={() => router.push(`/quote/${q.id}` as Href)}
                />
              );
            })}
          </ScrollView>

          {/* Tap-outside overlay to dismiss the menu (below the menu, above the list). */}
          {menuOpen ? <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)} /> : null}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  centered: { flex: 1, justifyContent: 'center' },
  sortRow: {
    alignItems: 'flex-end',
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
    zIndex: 20,
  },
  sortPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: c.surfaceSunken,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: Radius.badge,
  },
  sortLabel: { ...Typography.meta, fontFamily: BrandFonts.uiSemibold, color: c.textSecondary },
  menu: {
    position: 'absolute',
    top: 38,
    right: Layout.gutterScreen,
    minWidth: 132,
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: Radius.control,
    paddingVertical: 4,
    ...(Shadows.lg as object),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  menuText: { ...Typography.bodySm, color: c.textPrimary },
  menuTextActive: { fontFamily: BrandFonts.uiSemibold, color: c.primary },
  overlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 10 },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
});
