import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/design-system';
import { BrandFonts, Colors, Spacing, Typography } from '@/constants/theme';

const c = Colors.light;

/**
 * A person in a 팔로워/팔로잉/검색 목록 (social). Avatar + nickname + bio + a follow toggle.
 * Tapping the avatar/name area opens that user's profile (via `onPress`).
 */
export function PersonRow({
  nickname,
  bio,
  avatarUrl,
  following = false,
  onToggleFollow,
  onPress,
}: {
  nickname: string;
  bio?: string;
  avatarUrl?: string | null;
  following?: boolean;
  onToggleFollow?: () => void;
  onPress?: () => void;
}) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.main} onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}>
        <View style={styles.avatar}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} contentFit="cover" />
          ) : (
            <Text style={styles.avatarText}>{nickname.slice(0, 1)}</Text>
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.nickname} numberOfLines={1}>
            {nickname}
          </Text>
          {bio ? (
            <Text style={styles.bio} numberOfLines={1}>
              {bio}
            </Text>
          ) : null}
        </View>
      </Pressable>
      <Button
        label={following ? '팔로잉' : '팔로우'}
        variant={following ? 'secondary' : 'primary'}
        size="sm"
        onPress={onToggleFollow}
        accessibilityLabel={`${nickname} ${following ? '팔로우 취소' : '팔로우'}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.two },
  main: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontFamily: BrandFonts.uiSemibold, fontSize: 17, color: c.primaryHover },
  info: { flex: 1, minWidth: 0 },
  nickname: { fontFamily: BrandFonts.uiSemibold, fontSize: 16, color: c.textPrimary },
  bio: { ...Typography.meta, color: c.textSecondary, marginTop: 1 },
});
