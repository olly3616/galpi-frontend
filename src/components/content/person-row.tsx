import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/design-system';
import { BrandFonts, Colors, Spacing, Typography } from '@/constants/theme';

const c = Colors.light;

/**
 * A person in a 팔로워/팔로잉 목록 (S-08 social). Avatar + nickname + bio, with a follow toggle.
 * Reused by the followers list now and 사람 찾기(user search) later.
 */
export function PersonRow({
  nickname,
  bio,
  following = false,
  onToggleFollow,
}: {
  nickname: string;
  bio?: string;
  following?: boolean;
  onToggleFollow?: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{nickname.slice(0, 1)}</Text>
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
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: BrandFonts.uiSemibold, fontSize: 17, color: c.primaryHover },
  info: { flex: 1, minWidth: 0 },
  nickname: { fontFamily: BrandFonts.uiSemibold, fontSize: 16, color: c.textPrimary },
  bio: { ...Typography.meta, color: c.textSecondary, marginTop: 1 },
});
