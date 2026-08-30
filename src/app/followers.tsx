import type { Href } from 'expo-router';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Users } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PersonRow } from '@/components/content/person-row';
import { EmptyState, ErrorState, ScreenHeader, Segmented } from '@/components/design-system';
import type { SegmentOption } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { useToggleFollow } from '@/features/social/queries';
import { useFollowers, useFollowing, useMe } from '@/features/users/queries';

const c = Colors.light;

type TabKey = 'followers' | 'following';

// 내 팔로워/팔로잉 목록 (S-08). Opened from the 팔로워 stat on the profile screen.
export default function FollowersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<TabKey>(params.tab === 'following' ? 'following' : 'followers');

  const me = useMe();
  const myId = me.data?.userId ?? NaN;
  // Only the active tab fetches.
  const followers = useFollowers(tab === 'followers' ? myId : NaN);
  const following = useFollowing(tab === 'following' ? myId : NaN);
  const active = tab === 'followers' ? followers : following;

  const toggleFollow = useToggleFollow();
  const [followOverride, setFollowOverride] = useState<Record<number, boolean>>({});
  const onToggleFollow = (userId: number, isFollowing: boolean) => {
    setFollowOverride((m) => ({ ...m, [userId]: !isFollowing }));
    toggleFollow.mutate(
      { userId, following: isFollowing },
      {
        onError: () => setFollowOverride((m) => ({ ...m, [userId]: isFollowing })),
        onSuccess: (res) => setFollowOverride((m) => ({ ...m, [userId]: res.following })),
      },
    );
  };

  const items = active.data?.pages.flatMap((p) => p.items) ?? [];

  const label = (base: string, count?: number) => (count != null ? `${base} ${count}` : base);
  const TABS: SegmentOption<TabKey>[] = [
    { id: 'followers', label: label('팔로워', me.data?.followerCount) },
    { id: 'following', label: label('팔로잉', me.data?.followingCount) },
  ];

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 320;
    if (nearBottom && active.hasNextPage && !active.isFetchingNextPage) active.fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title={me.data?.nickname ?? '내 사람들'} onBack={() => router.back()} />

      <View style={styles.segmentWrap}>
        <Segmented options={TABS} value={tab} onChange={setTab} />
      </View>

      {active.isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : active.isError ? (
        <View style={styles.centered}>
          <ErrorState title="목록을 불러오지 못했습니다" description="네트워크를 확인하고 다시 시도해주세요" onRetry={() => active.refetch()} />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            icon={Users}
            title={tab === 'followers' ? '아직 팔로워가 없어요' : '아직 팔로우한 사람이 없어요'}
            description={tab === 'followers' ? '문장을 공유하면 이곳에서 팔로워를 만날 수 있어요' : '관심 있는 사람을 팔로우해보세요'}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={200}>
          {items.map((p) => {
            const following = followOverride[p.userId] ?? p.isFollowing;
            return (
              <PersonRow
                key={p.userId}
                nickname={p.nickname}
                bio={p.bio}
                avatarUrl={p.profileImageUrl}
                following={following}
                onToggleFollow={() => onToggleFollow(p.userId, following)}
                onPress={() => router.push(`/user/${p.userId}` as Href)}
              />
            );
          })}
          {active.isFetchingNextPage ? (
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
  segmentWrap: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.two, paddingBottom: Spacing.two },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.one, paddingBottom: Spacing.six },
  footerLoading: { paddingVertical: Spacing.four, alignItems: 'center' },
});
