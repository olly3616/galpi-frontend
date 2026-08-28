import { useLocalSearchParams, useRouter } from 'expo-router';
import { Users } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PersonRow } from '@/components/content/person-row';
import { EmptyState, ScreenHeader, Segmented } from '@/components/design-system';
import type { SegmentOption } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';
import { MOCK_FOLLOWERS, MOCK_FOLLOWING, MOCK_USER } from '@/data/mock';

const c = Colors.light;

type TabKey = 'followers' | 'following';
const TABS: SegmentOption<TabKey>[] = [
  { id: 'followers', label: `팔로워 ${MOCK_USER.followerCount}` },
  { id: 'following', label: `팔로잉 ${MOCK_USER.followingCount}` },
];

// 팔로워/팔로잉 목록 (S-08). Opened from the 팔로워 stat on the profile screen.
// Follow toggles are local for the markup phase; wired to /api/users/{id}/follow later.
export default function FollowersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
  const initial: TabKey = params.tab === 'following' ? 'following' : 'followers';
  const [tab, setTab] = useState<TabKey>(initial);

  // Per-person follow override keyed by id (a person may appear in both lists).
  const [followOverride, setFollowOverride] = useState<Record<string, boolean>>({});
  const toggleFollow = (id: string, seed: boolean) =>
    setFollowOverride((m) => ({ ...m, [id]: !(m[id] ?? seed) }));

  const people = tab === 'followers' ? MOCK_FOLLOWERS : MOCK_FOLLOWING;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title={MOCK_USER.nickname} onBack={() => router.back()} />

      <View style={styles.segmentWrap}>
        <Segmented options={TABS} value={tab} onChange={setTab} />
      </View>

      {people.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState
            icon={Users}
            title={tab === 'followers' ? '아직 팔로워가 없어요' : '아직 팔로우한 사람이 없어요'}
            description={
              tab === 'followers'
                ? '문장을 공유하면 이곳에서 팔로워를 만날 수 있어요'
                : '관심 있는 사람을 팔로우해보세요'
            }
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {people.map((p) => {
            const following = followOverride[p.id] ?? p.following ?? false;
            return (
              <PersonRow
                key={p.id}
                nickname={p.nickname}
                bio={p.bio}
                following={following}
                onToggleFollow={() => toggleFollow(p.id, p.following ?? false)}
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
  segmentWrap: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.two, paddingBottom: Spacing.two },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.six,
  },
});
