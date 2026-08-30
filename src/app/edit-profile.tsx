import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorBanner, GalpiText, Input, ScreenHeader } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Spacing } from '@/constants/theme';
import { useMe, useUpdateMe } from '@/features/users/queries';
import { ApiError } from '@/lib/api/errors';
import { uploadImage } from '@/lib/api/upload';

const c = Colors.light;

export default function EditProfileScreen() {
  const router = useRouter();
  const me = useMe();
  const updateMe = useUpdateMe();

  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null); // newly picked (local)
  const [uploading, setUploading] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Prefill once from the loaded profile (React's "adjust state during render" pattern).
  const [prefilledId, setPrefilledId] = useState<number | null>(null);
  if (me.data && prefilledId !== me.data.userId) {
    setPrefilledId(me.data.userId);
    setNickname(me.data.nickname);
    setBio(me.data.bio ?? '');
  }

  const busy = uploading || updateMe.isPending;
  const canSave = nickname.trim().length >= 2 && !busy;
  const currentAvatar = photoUri ?? me.data?.profileImageUrl ?? null;

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const save = async () => {
    if (!canSave) return;
    setNicknameError('');
    setGeneralError('');

    let profileImageUrl: string | undefined;
    if (photoUri) {
      setUploading(true);
      try {
        profileImageUrl = (await uploadImage(photoUri)).url;
      } catch {
        setUploading(false);
        setGeneralError('사진 업로드에 실패했어요. 다시 시도해주세요.');
        return;
      }
      setUploading(false);
    }

    updateMe.mutate(
      { nickname: nickname.trim(), bio: bio.trim(), ...(profileImageUrl ? { profileImageUrl } : {}) },
      {
        onSuccess: () => router.back(),
        onError: (err) => {
          if (err instanceof ApiError && err.code === 'NICKNAME_DUPLICATED') setNicknameError('이미 사용 중인 닉네임입니다.');
          else setGeneralError('저장하지 못했어요. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader
        title="프로필 편집"
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
              {busy ? '저장 중' : '저장'}
            </GalpiText>
          </Pressable>
        }
      />

      {me.isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator color={c.primary} />
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            {generalError ? <ErrorBanner>{generalError}</ErrorBanner> : null}

            <View style={styles.photoBlock}>
              <Pressable onPress={pickPhoto} accessibilityRole="button" accessibilityLabel="프로필 사진 변경">
                <View style={styles.avatar}>
                  {currentAvatar ? (
                    <Image source={{ uri: currentAvatar }} style={styles.avatarImage} contentFit="cover" />
                  ) : (
                    <Text style={styles.avatarText}>{nickname.slice(0, 1) || '　'}</Text>
                  )}
                </View>
              </Pressable>
              <Pressable onPress={pickPhoto} hitSlop={6} accessibilityRole="button">
                <GalpiText variant="metaLg" color={c.textLink} style={styles.changePhoto}>
                  사진 변경
                </GalpiText>
              </Pressable>
            </View>

            <View style={styles.fields}>
              <Input
                label="닉네임"
                value={nickname}
                onChangeText={(t) => {
                  setNickname(t);
                  if (nicknameError) setNicknameError('');
                }}
                placeholder="2~20자"
                hint="2~20자"
                error={nicknameError}
                maxLength={20}
                autoCapitalize="none"
              />
              <Input
                label="한 줄 소개"
                value={bio}
                onChangeText={setBio}
                placeholder="나를 한 줄로 소개해보세요"
                maxLength={40}
              />
            </View>
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
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.six,
  },
  save: { fontFamily: BrandFonts.uiSemibold, fontWeight: '600' },
  photoBlock: { alignItems: 'center', gap: Spacing.three },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { fontFamily: BrandFonts.uiSemibold, fontSize: 34, color: c.primaryHover },
  changePhoto: { fontFamily: BrandFonts.uiMedium },
  fields: { gap: Spacing.four },
});
