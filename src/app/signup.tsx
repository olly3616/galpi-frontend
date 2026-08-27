import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandFonts, Colors, Layout, Spacing } from '@/constants/theme';
import { Button, GalpiText, Input, ScreenHeader } from '@/components/design-system';

const c = Colors.light;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  // Markup phase: client-side format/length checks only. Duplicate-email/nickname errors
  // (EMAIL_DUPLICATED / NICKNAME_DUPLICATED per F-01) come from the server in the API pass —
  // the `갈피` case below is a stand-in so the duplicate-nickname state is visible in review.
  const emailError = email && !EMAIL_RE.test(email) ? '이메일 형식을 확인해주세요' : '';
  const passwordError = password && password.length < 8 ? '8자 이상 입력해주세요' : '';
  const nicknameError = nickname === '갈피' ? '이미 사용 중인 닉네임입니다' : '';

  const valid =
    EMAIL_RE.test(email) &&
    password.length >= 8 &&
    nickname.length >= 2 &&
    nickname.length <= 20 &&
    !nicknameError;

  const goToLogin = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  };

  const submit = () => {
    if (!valid || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/home');
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScreenHeader title="회원가입" onBack={goToLogin} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.fields}>
            <Input
              label="이메일"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              placeholder="galpi@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              returnKeyType="next"
              error={emailError}
            />
            <Input
              label="비밀번호"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              returnKeyType="next"
              hint="8자 이상"
              error={passwordError}
            />
            <Input
              label="닉네임"
              value={nickname}
              onChangeText={setNickname}
              editable={!loading}
              placeholder="2~20자"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={submit}
              hint="2~20자"
              error={nicknameError}
            />
          </View>

          <Button
            label="가입하기"
            size="lg"
            fullWidth
            disabled={!valid}
            loading={loading}
            onPress={submit}
          />

          <View style={styles.footer}>
            <GalpiText variant="metaLg" color={c.textSecondary}>
              이미 계정이 있으신가요?{' '}
            </GalpiText>
            <Pressable onPress={goToLogin} disabled={loading} hitSlop={6}>
              <GalpiText variant="metaLg" color={c.textLink} style={styles.footerLink}>
                로그인
              </GalpiText>
            </Pressable>
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
    flexGrow: 1,
    paddingHorizontal: Layout.gutterScreen,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  fields: { gap: Spacing.four },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerLink: { fontFamily: BrandFonts.uiSemibold, fontWeight: '600' },
});
