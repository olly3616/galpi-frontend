import type { Href } from 'expo-router';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ellipsis, Plus, Quote } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuoteCard } from '@/components/content/quote-card';
import {
  Badge,
  Button,
  EmptyState,
  FloatingButton,
  GalpiText,
  ScreenHeader,
  SkeletonQuoteList,
} from '@/components/design-system';
import { BrandFonts, Colors, Layout, Radius, Shadows, Spacing, Typography } from '@/constants/theme';
import { MOCK_BOOKS, MOCK_QUOTES } from '@/data/mock';

const c = Colors.light;

type ScreenState = 'loading' | 'ready';

export default function BookDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  // Markup phase: look up mock data by route id. Real fetch (F-07) arrives in the API pass.
  const [state] = useState<ScreenState>('ready');
  const book = MOCK_BOOKS.find((b) => b.id === id);
  const quotes = MOCK_QUOTES.filter((q) => q.bookId === id);

  const addQuote = () => router.push(`/quote/new?bookId=${id}` as Href); // S-06 route arrives later

  if (!book) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="책" onBack={() => router.back()} />
        <View style={styles.centered}>
          <EmptyState icon={Quote} title="책을 찾을 수 없어요" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title={book.title}
        onBack={() => router.back()}
        trailing={
          <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="더보기">
            <Ellipsis size={22} color={c.textSecondary} />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.bookInfo}>
          <View style={[styles.cover, { backgroundColor: book.tint ?? c.primarySoft }]}>
            <Text style={styles.coverTitle} numberOfLines={5}>
              {book.title}
            </Text>
          </View>
          <View style={styles.bookMeta}>
            <Text style={styles.title} numberOfLines={3}>
              {book.title}
            </Text>
            <GalpiText variant="metaLg" color={c.textSecondary}>
              {book.author}
            </GalpiText>
            <View style={styles.badgeRow}>
              <Badge>{`문장 ${quotes.length}개`}</Badge>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>이 책의 문장</Text>

        {state === 'loading' ? <SkeletonQuoteList count={3} /> : null}

        {state === 'ready' && quotes.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon={Quote}
              title="아직 이 책에 담은 문장이 없어요"
              description="마음에 남은 문장을 옮겨두세요"
              action={
                <Button
                  label="문장 추가"
                  onPress={addQuote}
                  iconLeft={<Plus size={18} color={c.textOnPrimary} />}
                />
              }
            />
          </View>
        ) : null}

        {state === 'ready' && quotes.length > 0 ? (
          <View style={styles.quoteList}>
            {quotes.map((q) => (
              <QuoteCard
                key={q.id}
                characterName={q.characterName}
                content={q.content}
                hasSchedule={q.hasSchedule}
                hasMemo={!!q.memo}
                onPress={() => router.push(`/quote/${q.id}` as Href)}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>

      {/* FAB only when the list has content — the empty state already offers its own 문장 추가. */}
      {state === 'ready' && quotes.length > 0 ? (
        <FloatingButton label="문장 추가" onPress={addQuote} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  centered: { flex: 1, justifyContent: 'center' },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Layout.tabBarHeight + Spacing.six,
  },
  bookInfo: { flexDirection: 'row', gap: Spacing.four, paddingBottom: Spacing.six },
  cover: {
    width: 96,
    aspectRatio: 2 / 3,
    borderRadius: Radius.cover,
    borderWidth: 1,
    borderColor: c.border,
    borderLeftWidth: 5,
    borderLeftColor: '#C7A98F',
    justifyContent: 'center',
    paddingHorizontal: 8,
    ...(Shadows.md as object),
  },
  coverTitle: { fontFamily: BrandFonts.quote, fontSize: 13, lineHeight: 18, color: c.primaryHover },
  bookMeta: { flex: 1, minWidth: 0, gap: 6, paddingTop: 2 },
  title: { fontFamily: BrandFonts.uiBold, fontSize: 20, lineHeight: 26, color: c.textPrimary },
  badgeRow: { marginTop: 4, flexDirection: 'row' },
  sectionTitle: {
    ...Typography.section,
    fontFamily: BrandFonts.uiSemibold,
    color: c.textPrimary,
    marginBottom: Spacing.three,
  },
  emptyWrap: { paddingTop: Spacing.four },
  quoteList: { gap: Spacing.three },
});
