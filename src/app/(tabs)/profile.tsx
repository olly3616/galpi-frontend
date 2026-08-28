import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { ChevronRight, Pencil } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, GalpiText } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { MOCK_BOOKS, MOCK_USER } from '@/data/mock';

const c = Colors.light;

const INFO_ROWS = ['앱 정보', '이용약관', '개인정보처리방침'];

type Stat = { label: string; value: number; href?: Href };

export default function ProfileScreen() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  const bookCount = MOCK_BOOKS.length;
  // Match the home screen's total (sum of per-book counts), not the number of seeded mock objects.
  const quoteCount = MOCK_BOOKS.reduce((sum, b) => sum + b.quoteCount, 0);
  const stats: Stat[] = [
    { label: '책', value: bookCount, href: '/home' as Href },
    { label: '문장', value: quoteCount, href: '/my-quotes' as Href },
    { label: '팔로워', value: MOCK_USER.followerCount, href: '/followers' as Href },
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const logout = () => {
    // WF-10 markup: clear session → login. Token removal is wired in the API pass.
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <GalpiText variant="title">프로필</GalpiText>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{MOCK_USER.nickname.slice(0, 1)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.nickname} numberOfLines={1}>
                  {MOCK_USER.nickname}
                </Text>
                <Pressable
                  onPress={() => router.push('/edit-profile' as Href)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="프로필 편집">
                  <Pencil size={16} color={c.textMuted} />
                </Pressable>
              </View>
              <GalpiText variant="metaLg" color={c.textSecondary} style={styles.bio} numberOfLines={2}>
                {MOCK_USER.bio}
              </GalpiText>
            </View>
          </View>

          <View style={styles.statsRow}>
            {stats.map((s) => {
              const inner = (
                <>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <GalpiText variant="meta" color={c.textSecondary} style={styles.statLabel}>
                    {s.label}
                  </GalpiText>
                </>
              );
              return s.href ? (
                <Pressable
                  key={s.label}
                  style={styles.stat}
                  onPress={() => router.push(s.href as Href)}
                  accessibilityRole="button"
                  accessibilityLabel={`${s.label} ${s.value}개`}>
                  {inner}
                </Pressable>
              ) : (
                <View key={s.label} style={styles.stat}>
                  {inner}
                </View>
              );
            })}
          </View>
        </Card>

        {/* Settings */}
        <View>
          <Text style={styles.sectionTitle}>설정</Text>
          <Card style={styles.settingsCard}>
            <Pressable
              style={styles.linkRow}
              onPress={() => router.push('/notification-settings' as Href)}
              accessibilityRole="button">
              <GalpiText variant="body">알림 설정</GalpiText>
              <ChevronRight size={16} color={c.textMuted} />
            </Pressable>
            {INFO_ROWS.map((label) => (
              <Pressable
                key={label}
                style={styles.linkRow}
                onPress={() => showToast('준비 중이에요')}
                accessibilityRole="button">
                <GalpiText variant="body">{label}</GalpiText>
                <ChevronRight size={16} color={c.textMuted} />
              </Pressable>
            ))}
            <Pressable onPress={logout} style={styles.logoutRow} accessibilityRole="button">
              <GalpiText variant="body" color={c.error}>
                로그아웃
              </GalpiText>
            </Pressable>
          </Card>
        </View>
      </ScrollView>

      {toast ? (
        <View style={styles.toast} pointerEvents="none">
          <GalpiText variant="metaLg" color={c.textOnPrimary}>
            {toast}
          </GalpiText>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  header: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.two, paddingBottom: Spacing.two },
  body: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Layout.tabBarHeight + Spacing.six,
    gap: Spacing.six,
  },
  profileCard: { gap: Spacing.four },
  profileTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.four },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: BrandFonts.uiSemibold, fontSize: 22, color: c.primaryHover },
  profileInfo: { flex: 1, minWidth: 0 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  nickname: { fontFamily: BrandFonts.uiSemibold, fontSize: 18, color: c.textPrimary, flexShrink: 1 },
  bio: { marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingTop: Spacing.three,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontFamily: BrandFonts.uiSemibold, fontSize: 18, color: c.textPrimary },
  statLabel: { marginTop: 2 },
  sectionTitle: {
    ...Typography.section,
    fontFamily: BrandFonts.uiSemibold,
    color: c.textPrimary,
    marginBottom: Spacing.three,
  },
  settingsCard: { padding: 0, overflow: 'hidden' },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.padCard,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  logoutRow: { padding: Layout.padCard },
  toast: {
    position: 'absolute',
    bottom: Layout.tabBarHeight + Spacing.five,
    alignSelf: 'center',
    backgroundColor: c.textPrimary,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.badge,
  },
});
