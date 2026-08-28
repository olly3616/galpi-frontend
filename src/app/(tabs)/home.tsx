import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { Library, Plus, Search } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Bookshelf } from '@/components/content/bookshelf';
import {
  Badge,
  Button,
  EmptyState,
  ErrorState,
  GalpiText,
  SkeletonBookGrid,
} from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { MOCK_BOOKS } from '@/data/mock';

const c = Colors.light;

type ScreenState = 'loading' | 'error' | 'ready';

export default function BookshelfScreen() {
  const router = useRouter();
  // Markup phase: static state + mock data. Real fetch (F-06) arrives in the API pass;
  // `state`/`books` become the query result, and loading/error/empty render from it.
  const [state] = useState<ScreenState>('ready');
  const books = MOCK_BOOKS;

  const goAddBook = () => router.push('/add-book' as Href); // /add-book route arrives in S-04
  const totalQuotes = books.reduce((sum, b) => sum + b.quoteCount, 0);

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

      {state === 'loading' ? (
        <View style={styles.body}>
          <SkeletonBookGrid columns={3} count={6} />
        </View>
      ) : null}

      {state === 'error' ? (
        <View style={styles.centered}>
          <ErrorState
            title="책장을 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => {}}
          />
        </View>
      ) : null}

      {state === 'ready' && books.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            icon={Library}
            title="첫 책을 책장에 꽂아보세요"
            description="좋아하는 구절을 담아둘 책을 골라주세요"
            action={
              <Button
                label="책 추가"
                onPress={goAddBook}
                iconLeft={<Plus size={18} color={c.textOnPrimary} />}
              />
            }
          />
        </View>
      ) : null}

      {state === 'ready' && books.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}>
          <View style={styles.countRow}>
            <GalpiText variant="metaLg" color={c.textSecondary}>
              {books.length}권 · 문장 {totalQuotes}개
            </GalpiText>
            <Badge tone="neutral">최근 담은 순</Badge>
          </View>
          <Bookshelf books={books} perRow={3} onSelect={(id) => router.push(`/book/${id}` as Href)} />
        </ScrollView>
      ) : null}
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
});
