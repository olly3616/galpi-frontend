import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandFonts, Colors, Layout, Spacing } from '@/constants/theme';
import { Button, ErrorBanner, GalpiText, Input, ScreenHeader } from '@/components/design-system';
import { authErrorMessage } from '@/features/auth/api';
import { useSignup } from '@/features/auth/queries';
import { ApiError } from '@/lib/api/errors';

const c = Colors.light;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  // Server-side errors mapped by code: duplicates land on their field, anything else is general.
  const [serverError, setServerError] = useState<{ email?: string; nickname?: string; general?: string }>({});

  const signupMutation = useSignup();
  const loading = signupMutation.isPending;

  // Client-side format/length checks; duplicates are decided by the server (F-01).
  const emailError = (email && !EMAIL_RE.test(email) ? '이메일 형식을 확인해주세요' : '') || serverError.email || '';
  const passwordError = password && password.length < 8 ? '8자 이상 입력해주세요' : '';
  const nicknameError = serverError.nickname ?? '';

  const valid =
    EMAIL_RE.test(email) && password.length >= 8 && nickname.trim().length >= 2 && nickname.trim().length <= 20;

  const goToLogin = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  };

  // Clearing server errors on edit lets the user retry after fixing the flagged field.
  const clearServerErrors = () => setServerError((prev) => (Object.keys(prev).length ? {} : prev));

  const submit = () => {
    if (!valid || loading) return;
    setServerError({});
    signupMutation.mutate(
      { email: email.trim(), password, nickname: nickname.trim() },
      {
        onSuccess: () => router.replace('/home'),
        onError: (err) => {
          const code = err instanceof ApiError ? err.code : 'UNKNOWN';
          if (code === 'EMAIL_DUPLICATED') setServerError({ email: authErrorMessage(err) });
          else if (code === 'NICKNAME_DUPLICATED') setServerError({ nickname: authErrorMessage(err) });
          else setServerError({ general: authErrorMessage(err) });
        },
      },
    );
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
          {serverError.general ? <ErrorBanner>{serverError.general}</ErrorBanner> : null}
          <View style={styles.fields}>
            <Input
              label="이메일"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                clearServerErrors();
              }}
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
              onChangeText={(t) => {
                setNickname(t);
                clearServerErrors();
              }}
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
