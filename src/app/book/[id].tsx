import { Image } from 'expo-image';
import type { Href } from 'expo-router';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ellipsis, Plus, Quote } from 'lucide-react-native';
import {
  ActivityIndicator,
  Alert,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuoteCard } from '@/components/content/quote-card';
import {
  Badge,
  Button,
  EmptyState,
  ErrorState,
  FloatingButton,
  GalpiText,
  ScreenHeader,
  SkeletonQuoteList,
} from '@/components/design-system';
import { BrandFonts, Colors, Layout, Radius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useRemoveBook } from '@/features/bookshelf/queries';
import { useWorkQuotes } from '@/features/quotes/queries';

const c = Colors.light;

export default function BookDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const workId = Number(id);

  const q = useWorkQuotes(workId);
  const removeBook = useRemoveBook();

  const work = q.data?.pages[0]?.work;
  const quotes = q.data?.pages.flatMap((p) => p.quotes.items) ?? [];

  const addQuote = () => router.push(`/quote/new?bookId=${workId}` as Href);

  const confirmRemove = () => {
    Alert.alert('책장에서 빼기', `'${work?.title ?? '이 책'}'을(를) 책장에서 뺄까요?\n담아둔 문장은 유지돼요.`, [
      { text: '취소', style: 'cancel' },
      {
        text: '빼기',
        style: 'destructive',
        onPress: () => removeBook.mutate(workId, { onSuccess: () => router.back() }),
      },
    ]);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 320;
    if (nearBottom && q.hasNextPage && !q.isFetchingNextPage) q.fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title={work?.title ?? '책'}
        onBack={() => router.back()}
        trailing={
          work ? (
            <Pressable onPress={confirmRemove} hitSlop={8} accessibilityRole="button" accessibilityLabel="더보기">
              <Ellipsis size={22} color={c.textSecondary} />
            </Pressable>
          ) : undefined
        }
      />

      {q.isPending ? (
        <View style={styles.body}>
          <SkeletonQuoteList count={3} />
        </View>
      ) : q.isError ? (
        <View style={styles.centered}>
          <ErrorState
            title="책을 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => q.refetch()}
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={200}>
          <View style={styles.bookInfo}>
            <View style={styles.cover}>
              {work?.coverUrl ? (
                <Image source={{ uri: work.coverUrl }} style={styles.coverImage} contentFit="cover" />
              ) : (
                <Text style={styles.coverTitle} numberOfLines={5}>
                  {work?.title}
                </Text>
              )}
            </View>
            <View style={styles.bookMeta}>
              <Text style={styles.title} numberOfLines={3}>
                {work?.title}
              </Text>
              {work?.author ? (
                <GalpiText variant="metaLg" color={c.textSecondary}>
                  {work.author}
                </GalpiText>
              ) : null}
              <View style={styles.badgeRow}>
                <Badge>{`문장 ${quotes.length}${q.hasNextPage ? '+' : ''}개`}</Badge>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>이 책의 문장</Text>

          {quotes.length === 0 ? (
            <View style={styles.emptyWrap}>
              <EmptyState
                icon={Quote}
                title="아직 이 책에 담은 문장이 없어요"
                description="마음에 남은 문장을 옮겨두세요"
                action={<Button label="문장 추가" onPress={addQuote} iconLeft={<Plus size={18} color={c.textOnPrimary} />} />}
              />
            </View>
          ) : (
            <View style={styles.quoteList}>
              {quotes.map((quote) => (
                <QuoteCard
                  key={quote.quoteId}
                  characterName={quote.characterName}
                  content={quote.content}
                  hasSchedule={quote.hasSchedule}
                  hasMemo={!!quote.memo}
                  onPress={() => router.push(`/quote/${quote.quoteId}` as Href)}
                />
              ))}
              {q.isFetchingNextPage ? (
                <View style={styles.footerLoading}>
                  <ActivityIndicator color={c.primary} />
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>
      )}

      {!q.isPending && !q.isError && quotes.length > 0 ? (
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
    backgroundColor: c.primarySoft,
    borderWidth: 1,
    borderColor: c.border,
    borderLeftWidth: 5,
    borderLeftColor: '#C7A98F',
    justifyContent: 'center',
    paddingHorizontal: 8,
    overflow: 'hidden',
    ...(Shadows.md as object),
  },
  coverImage: { width: '100%', height: '100%' },
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
  footerLoading: { paddingVertical: Spacing.four, alignItems: 'center' },
});
