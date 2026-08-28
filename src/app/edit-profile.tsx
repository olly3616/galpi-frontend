import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GalpiText, Input, ScreenHeader } from '@/components/design-system';
import { BrandFonts, Colors, Layout, Spacing } from '@/constants/theme';
import { MOCK_USER } from '@/data/mock';

const c = Colors.light;

export default function EditProfileScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState(MOCK_USER.nickname);
  const [bio, setBio] = useState(MOCK_USER.bio);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const canSave = nickname.trim().length >= 2;

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const save = () => {
    if (!canSave) return;
    // Markup phase: no persistence. Real profile update is wired in the API pass.
    router.back();
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
              저장
            </GalpiText>
          </Pressable>
        }
      />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.photoBlock}>
            <Pressable onPress={pickPhoto} accessibilityRole="button" accessibilityLabel="프로필 사진 변경">
              <View style={styles.avatar}>
                {photoUri ? (
                  <Image source={{ uri: photoUri }} style={styles.avatarImage} contentFit="cover" />
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
              onChangeText={setNickname}
              placeholder="2~20자"
              hint="2~20자"
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  flex: { flex: 1 },
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
