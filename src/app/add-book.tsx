import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { BookOpen, ImagePlus, Search, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
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

import { BookRow } from '@/components/content/book-row';
import {
  Button,
  EmptyState,
  GalpiText,
  Input,
  RadioGroup,
  ScreenHeader,
  Segmented,
} from '@/components/design-system';
import { Colors, Layout, Radius, Spacing, Typography } from '@/constants/theme';
import { MOCK_SEARCH_RESULTS } from '@/data/mock';

const c = Colors.light;

type Tab = 'search' | 'manual';
type SearchPhase = 'idle' | 'loading' | 'results' | 'empty';
type WorkType = 'novel' | 'webnovel';

export default function AddBookScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('search');

  // --- Search tab (markup: filters mock results; a query with "웹" returns none) ---
  const [query, setQuery] = useState('');
  const [phase, setPhase] = useState<SearchPhase>('idle');
  const [results, setResults] = useState(MOCK_SEARCH_RESULTS);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = (text: string) => {
    setQuery(text);
    if (timer.current) clearTimeout(timer.current);
    if (!text.trim()) {
      setPhase('idle');
      return;
    }
    setPhase('loading');
    timer.current = setTimeout(() => {
      const hit = text.includes('웹')
        ? []
        : MOCK_SEARCH_RESULTS.filter(
            (r) => r.title.includes(text) || r.author.includes(text),
          );
      setResults(hit);
      setPhase(hit.length ? 'results' : 'empty');
    }, 350);
  };

  // --- Manual tab ---
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [workType, setWorkType] = useState<WorkType>('novel');
  const [coverUri, setCoverUri] = useState<string | null>(null);

  // Markup phase: pick + preview locally only. Uploading to the server is wired with F-05.
  const pickCover = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.8,
    });
    if (!result.canceled) setCoverUri(result.assets[0].uri);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="책 추가" onBack={() => router.back()} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
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
                onChangeText={runSearch}
                placeholder="책 제목이나 작가를 검색해보세요"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                leading={<Search size={18} color={c.textSecondary} />}
              />

              {phase === 'idle' ? (
                <EmptyState
                  icon={Search}
                  title="책 제목을 검색해보세요"
                  description="찾는 책이 없다면 직접 등록할 수 있어요"
                />
              ) : null}

              {phase === 'loading' ? (
                <View style={styles.loading}>
                  <ActivityIndicator color={c.primary} />
                </View>
              ) : null}

              {phase === 'empty' ? (
                <EmptyState
                  icon={BookOpen}
                  title="검색 결과가 없어요"
                  description="웹소설이라면 직접 등록해보세요"
                  action={
                    <Button label="직접 등록하기" variant="secondary" onPress={() => setTab('manual')} />
                  }
                />
              ) : null}

              {phase === 'results' ? (
                <View>
                  {results.map((r) => (
                    <BookRow
                      key={r.id}
                      title={r.title}
                      author={[r.author, r.publisher].filter(Boolean).join(' · ')}
                      coverUrl={r.coverUrl}
                      added={r.inShelf || addedIds.includes(r.id)}
                      onAdd={() => setAddedIds((prev) => [...prev, r.id])}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          ) : (
            <View style={styles.section}>
              <Input label="제목" value={title} onChangeText={setTitle} placeholder="필수" />
              <Input label="작가" value={author} onChangeText={setAuthor} placeholder="선택" />
              <RadioGroup
                label="유형"
                options={[
                  { id: 'novel', label: '소설' },
                  { id: 'webnovel', label: '웹소설' },
                ]}
                value={workType}
                onChange={setWorkType}
              />
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
              <Button
                label="등록"
                size="lg"
                fullWidth
                disabled={!title.trim()}
                onPress={() => router.back()}
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
