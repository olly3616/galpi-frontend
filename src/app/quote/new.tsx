import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GalpiText, Input, RadioGroup, ScreenHeader } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { MOCK_BOOKS } from '@/data/mock';

const c = Colors.light;

type Visibility = 'PRIVATE' | 'FOLLOWERS';

export default function ComposeQuoteScreen() {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const book = MOCK_BOOKS.find((b) => b.id === bookId);

  const [characterName, setCharacterName] = useState('');
  const [content, setContent] = useState('');
  const [memo, setMemo] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('PRIVATE');

  const canSave = content.trim().length > 0;
  const save = () => {
    if (!canSave) return;
    // Markup phase: no API. Real create (F-08 POST /api/quotes) is wired in the API pass.
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader
        title="문장 기록"
        leading={
          <Pressable onPress={() => router.back()} hitSlop={8} accessibilityRole="button">
            <GalpiText variant="metaLg" color={c.textSecondary}>
              취소
            </GalpiText>
          </Pressable>
        }
        trailing={
          <Pressable onPress={save} disabled={!canSave} hitSlop={8} accessibilityRole="button">
            <GalpiText
              variant="metaLg"
              color={canSave ? c.textLink : c.textMuted}
              style={styles.save}>
              저장
            </GalpiText>
          </Pressable>
        }
      />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {book ? (
            <View style={styles.bookRow}>
              <View style={[styles.thumb, { backgroundColor: book.tint ?? c.primarySoft }]}>
                <Text style={styles.thumbTitle} numberOfLines={3}>
                  {book.title}
                </Text>
              </View>
              <Text style={styles.bookText} numberOfLines={2}>
                {book.title}
                <Text style={styles.bookAuthor}>{` · ${book.author}`}</Text>
              </Text>
            </View>
          ) : null}

          <Input
            label="등장인물"
            value={characterName}
            onChangeText={setCharacterName}
            placeholder="선택"
            returnKeyType="next"
          />

          <View>
            <Text style={styles.fieldLabel}>문장</Text>
            <Input
              value={content}
              onChangeText={setContent}
              placeholder="마음에 남은 문장을 옮겨 적어보세요"
              multiline
              style={styles.quoteInput}
            />
          </View>

          <Input
            label="메모"
            value={memo}
            onChangeText={setMemo}
            placeholder="이 문장이 왜 좋았나요?"
            multiline
            style={styles.memoInput}
          />

          <RadioGroup
            label="공개 범위"
            options={[
              { id: 'PRIVATE', label: '나만 보기', description: '기본값이에요' },
              { id: 'FOLLOWERS', label: '팔로워에게 공개' },
            ]}
            value={visibility}
            onChange={setVisibility}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
  },
  save: { fontFamily: BrandFonts.uiSemibold, fontWeight: '600' },
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    backgroundColor: c.surfaceSunken,
    borderRadius: Radius.control,
  },
  thumb: {
    width: 34,
    height: 51,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#C7A98F',
    justifyContent: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  thumbTitle: { fontFamily: BrandFonts.quote, fontSize: 8, lineHeight: 11, color: c.primaryHover },
  bookText: { flex: 1, ...Typography.metaLg, color: c.textPrimary },
  bookAuthor: { color: c.textSecondary },
  fieldLabel: {
    ...Typography.metaLg,
    fontFamily: BrandFonts.uiMedium,
    color: c.textPrimary,
    marginBottom: 8,
  },
  quoteInput: {
    minHeight: 150,
    fontFamily: BrandFonts.quote,
    fontSize: 20,
    lineHeight: 32,
  },
  memoInput: { minHeight: 80 },
});
