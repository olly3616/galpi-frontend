import { useRouter } from 'expo-router';
import { UserPlus, Users } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedCard } from '@/components/content/feed-card';
import { EmptyState, GalpiText } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { MOCK_FEED } from '@/data/mock';

const c = Colors.light;

// 팔로잉 피드 (S-08): 문장 shared by people the user follows. Every card shows its source work.
// Like state is local for the markup phase; wired to /api/quotes/{id}/like in the API pass.
export default function FeedScreen() {
  const router = useRouter();
  const [likedOverride, setLikedOverride] = useState<Record<string, boolean>>({});
  const toggleLike = (id: string) =>
    setLikedOverride((m) => ({ ...m, [id]: !(m[id] ?? MOCK_FEED.find((f) => f.id === id)?.likedByMe ?? false) }));

  const isEmpty = MOCK_FEED.length === 0;

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

      {isEmpty ? (
        <View style={styles.centered}>
          <EmptyState
            icon={Users}
            title="아직 피드가 비어 있어요"
            description="관심 있는 사람을 팔로우하면 그들의 문장이 여기 모여요"
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {MOCK_FEED.map((item) => {
            const liked = likedOverride[item.id] ?? item.likedByMe ?? false;
            // Adjust the seed count by whether the user's like differs from the seed state.
            const base = item.likeCount - (item.likedByMe ? 1 : 0);
            const likeCount = base + (liked ? 1 : 0);
            return (
              <FeedCard
                key={item.id}
                nickname={item.nickname}
                timeAgo={item.timeAgo}
                characterName={item.characterName}
                content={item.content}
                bookTitle={item.bookTitle}
                bookAuthor={item.bookAuthor}
                likeCount={likeCount}
                liked={liked}
                onToggleLike={() => toggleLike(item.id)}
              />
            );
          })}
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
  searchBtn: { padding: Spacing.one },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.one,
    paddingBottom: Layout.tabBarHeight + Spacing.six,
    gap: Spacing.three,
  },
});
