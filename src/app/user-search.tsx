import { useRouter } from 'expo-router';
import { Search, UserX } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PersonRow } from '@/components/content/person-row';
import { EmptyState, Input, ScreenHeader } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Spacing, Typography } from '@/constants/theme';
import { MOCK_SEARCH_PEOPLE } from '@/data/mock';

const c = Colors.light;

// 사람 찾기 (S-08 social) — search people by nickname and follow them. Opened from the feed header.
// Results/follow state are local for the markup phase; wired to /api/users/search + follow later.
export default function UserSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [followOverride, setFollowOverride] = useState<Record<string, boolean>>({});
  const toggleFollow = (id: string, seed: boolean) =>
    setFollowOverride((m) => ({ ...m, [id]: !(m[id] ?? seed) }));

  const trimmed = query.trim();
  // Empty query → suggest people the user doesn't follow yet; otherwise filter by nickname.
  const results = useMemo(() => {
    if (!trimmed) return MOCK_SEARCH_PEOPLE.filter((p) => !p.following);
    return MOCK_SEARCH_PEOPLE.filter((p) => p.nickname.includes(trimmed));
  }, [trimmed]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="사람 찾기" onBack={() => router.back()} />

      <View style={styles.searchWrap}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="닉네임으로 검색"
          autoFocus
          autoCapitalize="none"
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
          leading={<Search size={18} color={c.textMuted} />}
        />
      </View>

      {results.length === 0 ? (
        <View style={styles.centered}>
          <EmptyState icon={UserX} title="검색 결과가 없어요" description="다른 닉네임으로 찾아보세요" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {!trimmed ? <Text style={styles.sectionTitle}>추천</Text> : null}
          {results.map((p) => {
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
  searchWrap: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.two, paddingBottom: Spacing.two },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
  body: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.one, paddingBottom: Spacing.six },
  sectionTitle: {
    ...Typography.meta,
    fontFamily: BrandFonts.uiSemibold,
    color: c.textSecondary,
    marginBottom: Spacing.two,
  },
});
