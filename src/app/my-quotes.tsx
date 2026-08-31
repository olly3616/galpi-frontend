import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Quote } from 'lucide-react-native';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuoteCard } from '@/components/content/quote-card';
import { EmptyState, ErrorState, ScreenHeader } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { useMyQuotes } from '@/features/quotes/queries';

const c = Colors.light;

// All of my quotes across every book (opened from the 문장 stat on the profile screen).
// The server returns newest-saved-first; there is no cross-page sort, so no sort control here.
export default function MyQuotesScreen() {
  const router = useRouter();
  const q = useMyQuotes();
  const quotes = q.data?.pages.flatMap((p) => p.items) ?? [];

  const loadMore = () => {
    if (q.hasNextPage && !q.isFetchingNextPage) q.fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="내 문장" onBack={() => router.back()} />

      {q.isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : q.isError ? (
        <View style={styles.centered}>
          <ErrorState
            title="문장을 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => q.refetch()}
          />
        </View>
      ) : quotes.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState icon={Quote} title="아직 담은 문장이 없어요" description="책에서 마음에 남은 문장을 옮겨두세요" />
        </View>
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(quote) => String(quote.quoteId)}
          renderItem={({ item: quote }) => (
            <QuoteCard
              characterName={quote.characterName}
              content={quote.content}
              source={[quote.work.title, quote.work.author].filter(Boolean).join(' · ')}
              hasSchedule={quote.hasSchedule}
              hasMemo={!!quote.memo}
              onPress={() => router.push(`/quote/${quote.quoteId}` as Href)}
            />
          )}
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            q.isFetchingNextPage ? (
              <View style={styles.footerLoading}>
                <ActivityIndicator color={c.primary} />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  footerLoading: { paddingVertical: Spacing.four, alignItems: 'center' },
});
