import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { Library, Plus, Search } from 'lucide-react-native';
import { ActivityIndicator, type NativeScrollEvent, type NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Bookshelf, type ShelfBook } from '@/components/content/bookshelf';
import {
  Badge,
  Button,
  EmptyState,
  ErrorState,
  GalpiText,
  SkeletonBookGrid,
} from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { useMyShelf } from '@/features/bookshelf/queries';

const c = Colors.light;

export default function BookshelfScreen() {
  const router = useRouter();
  const shelf = useMyShelf();

  const books: ShelfBook[] =
    shelf.data?.pages.flatMap((p) =>
      p.items.map((b) => ({
        id: String(b.workId),
        title: b.title,
        author: b.author,
        coverUrl: b.coverUrl,
        quoteCount: b.quoteCount,
      })),
    ) ?? [];

  const goAddBook = () => router.push('/add-book' as Href);

  // Infinite scroll: load the next page as the list nears the bottom.
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 320;
    if (nearBottom && shelf.hasNextPage && !shelf.isFetchingNextPage) shelf.fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <GalpiText variant="title">내 책장</GalpiText>
        <View style={styles.headerActions}>
          <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="검색" onPress={goAddBook}>
            <Search size={22} color={c.textSecondary} />
          </Pressable>
          <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="책 추가" onPress={goAddBook}>
            <Plus size={22} color={c.textSecondary} />
          </Pressable>
        </View>
      </View>

      {shelf.isPending ? (
        <View style={styles.body}>
          <SkeletonBookGrid columns={3} count={6} />
        </View>
      ) : shelf.isError ? (
        <View style={styles.centered}>
          <ErrorState
            title="책장을 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => shelf.refetch()}
          />
        </View>
      ) : books.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            icon={Library}
            title="첫 책을 책장에 꽂아보세요"
            description="좋아하는 구절을 담아둘 책을 골라주세요"
            action={<Button label="책 추가" onPress={goAddBook} iconLeft={<Plus size={18} color={c.textOnPrimary} />} />}
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={200}>
          <View style={styles.countRow}>
            <GalpiText variant="metaLg" color={c.textSecondary}>
              {books.length}권{shelf.hasNextPage ? '+' : ''}
            </GalpiText>
            <Badge tone="neutral">최근 담은 순</Badge>
          </View>
          <Bookshelf books={books} perRow={3} onSelect={(id) => router.push(`/book/${id}` as Href)} />
          {shelf.isFetchingNextPage ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator color={c.primary} />
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.four },
  body: {
    paddingHorizontal: Layout.gutterScreen - Spacing.two,
    paddingBottom: Layout.tabBarHeight + Spacing.six,
  },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.two,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.four,
  },
  footerLoading: { paddingVertical: Spacing.four, alignItems: 'center' },
});
