import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GalpiText, Input, RadioGroup, ScreenHeader } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import type { Visibility } from '@/features/quotes/api';
import { useCreateQuote, useQuoteDetail, useUpdateQuote, useWork } from '@/features/quotes/queries';

const c = Colors.light;

// Compose (create) or edit a quote. Edit mode when `quoteId` is present; otherwise create under `bookId`.
export default function ComposeQuoteScreen() {
  const router = useRouter();
  const { bookId, quoteId } = useLocalSearchParams<{ bookId?: string; quoteId?: string }>();
  const isEdit = !!quoteId;

  const editId = Number(quoteId);
  const detail = useQuoteDetail(isEdit ? editId : NaN);
  const workId = isEdit ? detail.data?.work.workId ?? NaN : Number(bookId);

  const work = useWork(isEdit ? NaN : Number(bookId));
  const bookInfo = isEdit ? detail.data?.work : work.data;

  const createQuote = useCreateQuote(workId);
  const updateQuote = useUpdateQuote(editId);
  const saving = createQuote.isPending || updateQuote.isPending;

  const [characterName, setCharacterName] = useState('');
  const [content, setContent] = useState('');
  const [memo, setMemo] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('PRIVATE');

  // Prefill once the quote to edit has loaded (React's "adjust state during render" pattern).
  const [prefilledId, setPrefilledId] = useState<number | null>(null);
  if (isEdit && detail.data && prefilledId !== detail.data.quoteId) {
    setPrefilledId(detail.data.quoteId);
    setCharacterName(detail.data.characterName ?? '');
    setContent(detail.data.content);
    setMemo(detail.data.memo ?? '');
    setVisibility(detail.data.visibility);
  }

  const canSave = content.trim().length > 0 && !saving;

  const save = () => {
    if (!canSave) return;
    if (isEdit) {
      updateQuote.mutate(
        {
          content: content.trim(),
          characterName: characterName.trim() || undefined,
          memo: memo.trim() || undefined,
          visibility,
        },
        { onSuccess: () => router.back() },
      );
    } else {
      createQuote.mutate(
        {
          workId,
          content: content.trim(),
          characterName: characterName.trim() || undefined,
          memo: memo.trim() || undefined,
          visibility,
        },
        { onSuccess: () => router.back() },
      );
    }
  };

  const loadingEdit = isEdit && detail.isPending;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader
        title={isEdit ? '문장 수정' : '문장 기록'}
        leading={
          <Pressable onPress={() => router.back()} hitSlop={8} accessibilityRole="button">
            <GalpiText variant="metaLg" color={c.textSecondary}>
              취소
            </GalpiText>
          </Pressable>
        }
        trailing={
          <Pressable onPress={save} disabled={!canSave} hitSlop={8} accessibilityRole="button">
            <GalpiText variant="metaLg" color={canSave ? c.textLink : c.textMuted} style={styles.save}>
              {saving ? '저장 중' : '저장'}
            </GalpiText>
          </Pressable>
        }
      />

      {loadingEdit ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {bookInfo ? (
              <View style={styles.bookRow}>
                <View style={styles.thumb}>
                  {bookInfo.coverUrl ? (
                    <Image source={{ uri: bookInfo.coverUrl }} style={styles.thumbImage} contentFit="cover" />
                  ) : (
                    <Text style={styles.thumbTitle} numberOfLines={3}>
                      {bookInfo.title}
                    </Text>
                  )}
                </View>
                <Text style={styles.bookText} numberOfLines={2}>
                  {bookInfo.title}
                  {bookInfo.author ? <Text style={styles.bookAuthor}>{` · ${bookInfo.author}`}</Text> : null}
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  flex: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
    backgroundColor: c.primarySoft,
    borderLeftWidth: 3,
    borderLeftColor: '#C7A98F',
    justifyContent: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  thumbImage: { width: '100%', height: '100%' },
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
