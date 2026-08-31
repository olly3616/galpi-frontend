import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { BookOpen, ImagePlus, Search, X } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookRow } from '@/components/content/book-row';
import {
  Button,
  EmptyState,
  ErrorState,
  GalpiText,
  Input,
  ScreenHeader,
  Segmented,
} from '@/components/design-system';
import { Colors, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import type { BookSearchItem } from '@/features/bookshelf/api';
import { useAddBook, useSearchBooks } from '@/features/bookshelf/queries';
import { ApiError } from '@/lib/api/errors';
import { uploadImage } from '@/lib/api/upload';

const c = Colors.light;

type Tab = 'search' | 'manual';

const itemKey = (b: BookSearchItem) => b.isbn ?? `${b.title}|${b.author ?? ''}`;

export default function AddBookScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('search');

  // --- Search tab ---
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const search = useSearchBooks(debounced);
  const addFromSearch = useAddBook();
  const [addedKeys, setAddedKeys] = useState<Set<string>>(new Set());
  const markAdded = (key: string) => setAddedKeys((prev) => new Set(prev).add(key));

  const results = search.data?.pages.flatMap((p) => p.items) ?? [];
  const showIdle = !debounced;
  const showLoading = !!debounced && search.isLoading;
  const showError = !!debounced && search.isError;
  const showEmpty = !!debounced && !search.isLoading && !search.isError && results.length === 0;
  const showResults = !!debounced && !search.isLoading && !search.isError && results.length > 0;

  const onChangeQuery = (text: string) => {
    setQuery(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(text.trim()), 350);
  };

  // Cancel a pending debounce if the screen unmounts before it fires.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onAddSearch = (b: BookSearchItem) => {
    const key = itemKey(b);
    addFromSearch.mutate(
      {
        source: 'API',
        title: b.title,
        author: b.author,
        publisher: b.publisher,
        coverUrl: b.coverUrl ?? undefined,
        isbn: b.isbn,
      },
      {
        onSuccess: () => markAdded(key),
        // Already-in-shelf isn't a real failure here — just reflect it as added.
        onError: (err) => {
          if (err instanceof ApiError && err.code === 'ALREADY_IN_SHELF') markAdded(key);
        },
      },
    );
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (tab !== 'search') return;
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 320;
    if (nearBottom && search.hasNextPage && !search.isFetchingNextPage) search.fetchNextPage();
  };

  // --- Manual tab ---
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUri, setCoverUri] = useState<string | null>(null);
  const [manualError, setManualError] = useState('');
  const [uploading, setUploading] = useState(false);
  const addManual = useAddBook();
  const busy = uploading || addManual.isPending;

  const pickCover = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.8,
    });
    if (!result.canceled) setCoverUri(result.assets[0].uri);
  };

  const submitManual = async () => {
    if (!title.trim() || busy) return;
    setManualError('');

    // Upload the picked cover first (if any), then register the book with its hosted URL.
    let coverUrl: string | undefined;
    if (coverUri) {
      setUploading(true);
      try {
        coverUrl = (await uploadImage(coverUri)).url;
      } catch {
        setUploading(false);
        setManualError('표지 업로드에 실패했어요. 다시 시도해주세요.');
        return;
      }
      setUploading(false);
    }

    addManual.mutate(
      {
        source: 'MANUAL',
        title: title.trim(),
        author: author.trim() || undefined,
        coverUrl,
      },
      {
        onSuccess: () => router.back(),
        onError: (err) =>
          setManualError(
            err instanceof ApiError && err.code === 'ALREADY_IN_SHELF'
              ? '이미 책장에 있는 책이에요.'
              : '등록하지 못했어요. 다시 시도해주세요.',
          ),
      },
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="책 추가" onBack={() => router.back()} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={200}>
          <Segmented
            options={[
              { id: 'search', label: '검색으로 추가' },
              { id: 'manual', label: '직접 등록' },
            ]}
            value={tab}
            onChange={setTab}
          />

          {tab === 'search' ? (
            <View style={styles.section}>
              <Input
                value={query}
                onChangeText={onChangeQuery}
                placeholder="책 제목이나 작가를 검색해보세요"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                leading={<Search size={18} color={c.textSecondary} />}
              />

              {showIdle ? (
                <EmptyState
                  icon={Search}
                  title="책 제목을 검색해보세요"
                  description="찾는 책이 없다면 직접 등록할 수 있어요"
                />
              ) : null}

              {showLoading ? (
                <View style={styles.loading}>
                  <ActivityIndicator color={c.primary} />
                </View>
              ) : null}

              {showError ? (
                <ErrorState
                  title="검색하지 못했습니다"
                  description="네트워크를 확인하고 다시 시도해주세요"
                  onRetry={() => search.refetch()}
                />
              ) : null}

              {showEmpty ? (
                <EmptyState
                  icon={BookOpen}
                  title="검색 결과가 없어요"
                  description="찾는 책이 없다면 직접 등록해보세요"
                  action={<Button label="직접 등록하기" variant="secondary" onPress={() => setTab('manual')} />}
                />
              ) : null}

              {showResults ? (
                <View>
                  {results.map((b, i) => (
                    <BookRow
                      key={`${itemKey(b)}-${i}`}
                      title={b.title}
                      author={[b.author, b.publisher].filter(Boolean).join(' · ')}
                      coverUrl={b.coverUrl}
                      added={addedKeys.has(itemKey(b))}
                      onAdd={() => onAddSearch(b)}
                    />
                  ))}
                  {search.isFetchingNextPage ? (
                    <View style={styles.loading}>
                      <ActivityIndicator color={c.primary} />
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : (
            <View style={styles.section}>
              <Input label="제목" value={title} onChangeText={setTitle} placeholder="필수" />
              <Input label="작가" value={author} onChangeText={setAuthor} placeholder="선택" />
              <View>
                <Text style={styles.coverLabel}>표지 이미지</Text>
                {coverUri ? (
                  <View style={styles.coverPreviewRow}>
                    <Image source={{ uri: coverUri }} style={styles.coverPreview} contentFit="cover" />
                    <View style={styles.coverPreviewInfo}>
                      <GalpiText variant="metaLg" color={c.textPrimary}>
                        표지를 선택했어요
                      </GalpiText>
                      <Pressable
                        onPress={pickCover}
                        hitSlop={6}
                        accessibilityRole="button"
                        accessibilityLabel="표지 다시 선택">
                        <GalpiText variant="meta" color={c.textLink}>
                          다시 선택
                        </GalpiText>
                      </Pressable>
                    </View>
                    <Pressable
                      onPress={() => setCoverUri(null)}
                      hitSlop={8}
                      accessibilityRole="button"
                      accessibilityLabel="표지 제거">
                      <X size={18} color={c.textSecondary} />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={pickCover}
                    accessibilityRole="button"
                    accessibilityLabel="표지 이미지 선택"
                    style={({ pressed }) => [styles.coverUpload, pressed && styles.coverUploadPressed]}>
                    <ImagePlus size={20} color={c.textSecondary} />
                    <GalpiText variant="metaLg" color={c.textSecondary} style={styles.coverUploadText}>
                      선택 · 없으면 제목으로 기본 표지를 만들어요
                    </GalpiText>
                  </Pressable>
                )}
              </View>

              {manualError ? (
                <GalpiText variant="metaLg" color={c.error}>
                  {manualError}
                </GalpiText>
              ) : null}

              <Button
                label={uploading ? '표지 올리는 중' : '등록'}
                size="lg"
                fullWidth
                disabled={!title.trim()}
                loading={busy}
                onPress={submitManual}
              />
            </View>
          )}
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
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  section: { gap: Spacing.four },
  loading: { paddingVertical: Spacing.six, alignItems: 'center' },
  coverLabel: {
    ...Typography.metaLg,
    fontWeight: '500',
    color: c.textPrimary,
    marginBottom: 8,
  },
  coverUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: c.borderStrong,
    borderRadius: Radius.control,
  },
  coverUploadPressed: { backgroundColor: c.surfaceSunken },
  coverUploadText: { flex: 1 },
  coverPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: Radius.control,
  },
  coverPreview: {
    width: 44,
    height: 66,
    borderRadius: Radius.cover,
    backgroundColor: c.primarySoft,
  },
  coverPreviewInfo: { flex: 1, gap: 2 },
});
