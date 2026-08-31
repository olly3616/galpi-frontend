import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { UserPlus, Users } from 'lucide-react-native';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedCard } from '@/components/content/feed-card';
import { EmptyState, ErrorState, GalpiText } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { useFeed, useToggleFeedLike } from '@/features/social/queries';

const c = Colors.light;

// 팔로잉 피드 (S-08): FOLLOWERS-public quotes from people the user follows, newest first.
export default function FeedScreen() {
  const router = useRouter();
  const feed = useFeed();
  const toggleLike = useToggleFeedLike();

  const items = feed.data?.pages.flatMap((p) => p.items) ?? [];

  const loadMore = () => {
    if (feed.hasNextPage && !feed.isFetchingNextPage) feed.fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <GalpiText variant="title">피드</GalpiText>
        <Pressable
          onPress={() => router.push('/user-search')}
          hitSlop={8}
          style={styles.searchBtn}
          accessibilityRole="button"
          accessibilityLabel="사람 찾기">
          <UserPlus size={22} color={c.textSecondary} />
        </Pressable>
      </View>

      {feed.isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : feed.isError ? (
        <View style={styles.centered}>
          <ErrorState
            title="피드를 불러오지 못했습니다"
            description="네트워크를 확인하고 다시 시도해주세요"
            onRetry={() => feed.refetch()}
          />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            icon={Users}
            title="아직 피드가 비어 있어요"
            description="관심 있는 사람을 팔로우하면 그들의 문장이 여기 모여요"
          />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.quoteId)}
          renderItem={({ item }) => (
            <FeedCard
              nickname={item.author.nickname}
              characterName={item.characterName}
              content={item.content}
              bookTitle={item.work.title}
              bookAuthor={item.work.author ?? ''}
              likeCount={item.likeCount}
              liked={item.isLiked}
              onToggleLike={() => toggleLike.mutate({ quoteId: item.quoteId, liked: item.isLiked })}
              onPressAuthor={() => router.push(`/user/${item.author.userId}` as Href)}
            />
          )}
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            feed.isFetchingNextPage ? (
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
  },
  searchBtn: { padding: Spacing.one },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.one,
    paddingBottom: Layout.tabBarHeight + Spacing.six,
    gap: Spacing.three,
  },
  footerLoading: { paddingVertical: Spacing.four, alignItems: 'center' },
});
