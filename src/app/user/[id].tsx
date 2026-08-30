import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useQueryClient } from '@tanstack/react-query';

import { QuoteCard } from '@/components/content/quote-card';
import { Button, ErrorState, GalpiText, ScreenHeader } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Spacing, Typography } from '@/constants/theme';
import { useToggleFollow } from '@/features/social/queries';
import { usersKeys, useUserProfile } from '@/features/users/queries';

const c = Colors.light;

// 공개 프로필 (S-08) — another user's profile + their FOLLOWERS-public 문장. Opened from search/feed/lists.
export default function UserProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = Number(id);

  const qc = useQueryClient();
  const query = useUserProfile(userId);
  const profile = query.data;

  const toggleFollow = useToggleFollow();
  const [followOverride, setFollowOverride] = useState<boolean | null>(null);
  const following = followOverride ?? profile?.isFollowing ?? false;

  const onToggleFollow = () => {
    if (!profile) return;
    setFollowOverride(!following);
    toggleFollow.mutate(
      { userId, following },
      {
        onError: () => setFollowOverride(following),
        onSuccess: (res) => {
          setFollowOverride(res.following);
          qc.invalidateQueries({ queryKey: usersKeys.profile(userId) });
        },
      },
    );
  };

  if (query.isPending) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="프로필" onBack={() => router.back()} />
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (query.isError || !profile) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title="프로필" onBack={() => router.back()} />
        <View style={styles.centered}>
          <ErrorState title="프로필을 불러오지 못했습니다" description="네트워크를 확인하고 다시 시도해주세요" onRetry={() => query.refetch()} />
        </View>
      </SafeAreaView>
    );
  }

  const quotes = profile.quotes.items;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title={profile.nickname} onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <View style={styles.avatar}>
            {profile.profileImageUrl ? (
              <Image source={{ uri: profile.profileImageUrl }} style={styles.avatarImage} contentFit="cover" />
            ) : (
              <Text style={styles.avatarText}>{profile.nickname.slice(0, 1)}</Text>
            )}
          </View>
          <Text style={styles.nickname} numberOfLines={1}>
            {profile.nickname}
          </Text>
          {profile.bio ? (
            <GalpiText variant="metaLg" color={c.textSecondary} style={styles.bio}>
              {profile.bio}
            </GalpiText>
          ) : null}
          <GalpiText variant="meta" color={c.textSecondary} style={styles.counts}>
            팔로워 {profile.followerCount} · 팔로잉 {profile.followingCount}
          </GalpiText>
          <View style={styles.followBtn}>
            <Button
              label={following ? '팔로잉' : '팔로우'}
              variant={following ? 'secondary' : 'primary'}
              onPress={onToggleFollow}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>공개 문장</Text>
        {quotes.length === 0 ? (
          <GalpiText variant="metaLg" color={c.textSecondary} style={styles.emptyNote}>
            {profile.isFollowing ? '공개된 문장이 없어요' : '팔로우하면 이 사람의 공개 문장을 볼 수 있어요'}
          </GalpiText>
        ) : (
          <View style={styles.quoteList}>
            {quotes.map((q) => (
              <QuoteCard
                key={q.quoteId}
                characterName={q.characterName}
                content={q.content}
                source={q.work.author ? `${q.work.title} · ${q.work.author}` : q.work.title}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
  },
  head: { alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.four },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontFamily: BrandFonts.uiSemibold, fontSize: 32, color: c.primaryHover },
  nickname: { fontFamily: BrandFonts.uiSemibold, fontSize: 20, color: c.textPrimary, marginTop: Spacing.two },
  bio: { textAlign: 'center' },
  counts: { marginTop: 2 },
  followBtn: { marginTop: Spacing.three, alignSelf: 'stretch' },
  sectionTitle: {
    ...Typography.section,
    fontFamily: BrandFonts.uiSemibold,
    color: c.textPrimary,
    marginTop: Spacing.four,
    marginBottom: Spacing.three,
  },
  emptyNote: { paddingVertical: Spacing.five, textAlign: 'center' },
  quoteList: { gap: Spacing.three },
});
