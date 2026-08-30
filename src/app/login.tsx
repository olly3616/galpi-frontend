import { type Href, useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandFonts, Colors, Layout, Spacing } from '@/constants/theme';
import { Button, ErrorBanner, GalpiText, Input, Logo, Wordmark } from '@/components/design-system';
import { authErrorMessage } from '@/features/auth/api';
import { useLogin } from '@/features/auth/queries';

const c = Colors.light;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const loginMutation = useLogin();
  const loading = loginMutation.isPending;

  const submit = () => {
    if (loading) return;
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    setError('');
    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: () => router.replace('/home'),
        onError: (err) => setError(authErrorMessage(err)),
      },
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Logo size={56} />
            <Wordmark />
            <GalpiText variant="quote" color={c.textSecondary} style={styles.tagline}>
              좋아하는 구절을 담아두는 곳
            </GalpiText>
          </View>

          {error ? <ErrorBanner>{error}</ErrorBanner> : null}

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
            />
            <Input
              label="비밀번호"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={submit}
              trailing={
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? '비밀번호 가리기' : '비밀번호 보기'}>
                  {showPassword ? (
                    <EyeOff size={18} color={c.textSecondary} />
                  ) : (
                    <Eye size={18} color={c.textSecondary} />
                  )}
                </Pressable>
              }
            />
          </View>

          <Button label="로그인" size="lg" fullWidth loading={loading} onPress={submit} />

          <View style={styles.footer}>
            <GalpiText variant="metaLg" color={c.textSecondary}>
              계정이 없으신가요?{' '}
            </GalpiText>
            <Pressable
              onPress={() => router.push('/signup' as Href)}
              disabled={loading}
              hitSlop={6}>{/* /signup route arrives in the S-02 branch */}
              <GalpiText variant="metaLg" color={c.textLink} style={styles.footerLink}>
                회원가입
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
    justifyContent: 'center',
    paddingHorizontal: Layout.gutterScreen,
    paddingVertical: Spacing.five,
    gap: Spacing.four,
  },
  header: { alignItems: 'center', gap: Spacing.two, marginBottom: Spacing.two },
  tagline: { fontFamily: BrandFonts.quote, marginTop: Spacing.one, textAlign: 'center' },
  fields: { gap: Spacing.three },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerLink: { fontFamily: BrandFonts.uiSemibold, fontWeight: '600' },
});
