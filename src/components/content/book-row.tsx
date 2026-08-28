import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Button, GalpiText } from '@/components/design-system';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

const c = Colors.light;

/** Search-result row in 책 추가 (S-04): cover thumb + title/author + 추가 / 책장에 있음. */
export function BookRow({
  title,
  author,
  coverUrl,
  added = false,
  onAdd,
}: {
  title: string;
  author?: string;
  coverUrl?: string | null;
  added?: boolean;
  onAdd?: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.cover}>
        {coverUrl ? <Image source={{ uri: coverUrl }} style={styles.coverImage} contentFit="cover" /> : null}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {author ? (
          <Text style={styles.author} numberOfLines={1}>
            {author}
          </Text>
        ) : null}
      </View>
      {added ? (
        <GalpiText variant="meta" color={c.textMuted} style={styles.added}>
          책장에 있음
        </GalpiText>
      ) : (
        <Button label="추가" variant="secondary" size="sm" onPress={onAdd} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  cover: {
    width: 44,
    height: 66,
    borderRadius: Radius.cover,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.primarySoft,
    overflow: 'hidden',
  },
  coverImage: { width: '100%', height: '100%' },
  info: { flex: 1, minWidth: 0 },
  title: { ...Typography.bodySm, fontWeight: '500', color: c.textPrimary },
  author: { ...Typography.meta, color: c.textSecondary, marginTop: 3 },
  added: { paddingHorizontal: 6 },
});
