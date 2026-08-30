import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Search, UserX } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PersonRow } from '@/components/content/person-row';
import { EmptyState, ErrorState, Input, ScreenHeader } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { useSearchUsers, useToggleFollow } from '@/features/social/queries';

const c = Colors.light;

// 사람 찾기 (S-08) — search users by nickname and follow them. Opened from the feed header.
export default function UserSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useSearchUsers(debounced);
  const toggleFollow = useToggleFollow();
  // Optimistic follow state by userId (reverted on error).
  const [followOverride, setFollowOverride] = useState<Record<number, boolean>>({});

  const results = search.data?.pages.flatMap((p) => p.items) ?? [];
  const showIdle = !debounced;
  const showLoading = !!debounced && search.isLoading;
  const showError = !!debounced && search.isError;
  const showEmpty = !!debounced && !search.isLoading && !search.isError && results.length === 0;
  const showResults = !!debounced && !search.isLoading && !search.isError && results.length > 0;

  const onChangeQuery = (text: string) => {
    setQuery(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(text.trim()), 350);
  };

  const onToggleFollow = (userId: number, following: boolean) => {
    setFollowOverride((m) => ({ ...m, [userId]: !following }));
    toggleFollow.mutate(
      { userId, following },
      {
        onError: () => setFollowOverride((m) => ({ ...m, [userId]: following })),
        onSuccess: (res) => setFollowOverride((m) => ({ ...m, [userId]: res.following })),
      },
    );
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 320;
    if (nearBottom && search.hasNextPage && !search.isFetchingNextPage) search.fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="사람 찾기" onBack={() => router.back()} />

      <View style={styles.searchWrap}>
        <Input
          value={query}
          onChangeText={onChangeQuery}
          placeholder="닉네임으로 검색"
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
          leading={<Search size={18} color={c.textMuted} />}
        />
      </View>

      {showIdle ? (
        <View style={styles.centered}>
          <EmptyState icon={Search} title="닉네임으로 검색해보세요" description="함께 문장을 나눌 사람을 찾아보세요" />
        </View>
      ) : showLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : showError ? (
        <View style={styles.centered}>
          <ErrorState title="검색하지 못했습니다" description="네트워크를 확인하고 다시 시도해주세요" onRetry={() => search.refetch()} />
        </View>
      ) : showEmpty ? (
        <View style={styles.centered}>
          <EmptyState icon={UserX} title="검색 결과가 없어요" description="다른 닉네임으로 찾아보세요" />
        </View>
      ) : showResults ? (
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={200}>
          {results.map((u) => {
            const following = followOverride[u.userId] ?? u.isFollowing;
            return (
              <PersonRow
                key={u.userId}
                nickname={u.nickname}
                bio={u.bio}
                avatarUrl={u.profileImageUrl}
                following={following}
                onToggleFollow={() => onToggleFollow(u.userId, following)}
                onPress={() => router.push(`/user/${u.userId}` as Href)}
              />
            );
          })}
          {search.isFetchingNextPage ? (
            <View style={styles.footerLoading}>
              <ActivityIndicator color={c.primary} />
            </View>
          ) : null}
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  searchWrap: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.two, paddingBottom: Spacing.two },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.one, paddingBottom: Spacing.six },
  footerLoading: { paddingVertical: Spacing.four, alignItems: 'center' },
});
