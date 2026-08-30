import { BookOpen, Heart } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandFonts, Colors, Radius, Shadows, Spacing, Typography } from '@/constants/theme';

const c = Colors.light;

/**
 * A 문장 shared by someone the user follows (팔로잉 피드, S-08). Structure:
 *  - author header (avatar · nickname · time)
 *  - the quote as the hero (left rule, like QuoteCard)
 *  - source work line — ALWAYS rendered (feed quotes must carry attribution)
 *  - a like toggle
 */
export function FeedCard({
  nickname,
  timeAgo,
  characterName,
  content,
  bookTitle,
  bookAuthor,
  likeCount,
  liked = false,
  onToggleLike,
  onPressAuthor,
}: {
  nickname: string;
  timeAgo?: string;
  characterName?: string;
  content: string;
  bookTitle: string;
  bookAuthor: string;
  likeCount: number;
  liked?: boolean;
  onToggleLike?: () => void;
  onPressAuthor?: () => void;
}) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.author} onPress={onPressAuthor} accessibilityRole={onPressAuthor ? 'button' : undefined}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{nickname.slice(0, 1)}</Text>
        </View>
        <Text style={styles.nickname} numberOfLines={1}>
          {nickname}
        </Text>
        {timeAgo ? <Text style={styles.time}>· {timeAgo}</Text> : null}
      </Pressable>

      <View style={styles.body}>
        <View style={styles.rule} />
        {/* Speaker (화자) trails the 대사 inline, set apart by weight/colour rather than a dash. */}
        <Text style={styles.quote} numberOfLines={7}>
          {content}
          {characterName ? <Text style={styles.speaker}>{`   ${characterName}`}</Text> : null}
        </Text>
        {/* Source work — always shown (attribution rule). */}
        <View style={styles.cite}>
          <BookOpen size={13} color={c.textMuted} />
          <Text style={styles.citeText} numberOfLines={1}>
            {bookTitle} · {bookAuthor}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={onToggleLike}
          hitSlop={8}
          style={styles.likeBtn}
          accessibilityRole="button"
          accessibilityState={{ selected: liked }}
          accessibilityLabel={liked ? '좋아요 취소' : '좋아요'}>
          <Heart size={18} color={liked ? c.error : c.textMuted} fill={liked ? c.error : 'transparent'} />
          <Text style={[styles.likeCount, liked && styles.likeCountActive]}>{likeCount}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: Radius.card,
    padding: Spacing.three,
    gap: Spacing.three,
    ...(Shadows.md as object),
  },
  author: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: BrandFonts.uiSemibold, fontSize: 14, color: c.primaryHover },
  nickname: { fontFamily: BrandFonts.uiSemibold, fontSize: 15, color: c.textPrimary, flexShrink: 1 },
  time: { ...Typography.meta, color: c.textMuted },

  body: { position: 'relative', paddingLeft: Spacing.three },
  rule: {
    position: 'absolute',
    left: 0,
    top: 4,
    bottom: 4,
    width: 3,
    borderRadius: 3,
    backgroundColor: '#C7A98F',
  },
  quote: { fontFamily: BrandFonts.quote, fontSize: 19, lineHeight: 31, color: c.textPrimary },
  // Speaker attribution trailing the quote — set apart by weight/colour, no dash or underline.
  speaker: { fontFamily: BrandFonts.uiSemibold, fontSize: 15, color: c.textSecondary },
  // Source work line — always present (attribution rule).
  cite: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one, marginTop: Spacing.two },
  citeText: { ...Typography.meta, color: c.textMuted, flexShrink: 1 },

  footer: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: c.border, paddingTop: Spacing.three },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
  likeCount: { ...Typography.meta, fontFamily: BrandFonts.uiMedium, color: c.textMuted },
  likeCountActive: { color: c.error },
});
