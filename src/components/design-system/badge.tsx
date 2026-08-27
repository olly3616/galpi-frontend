import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { Colors, Radius, Typography } from '@/constants/theme';

const c = Colors.light;

type Tone = 'accent' | 'neutral' | 'primary' | 'success' | 'error';

const TONES: Record<Tone, { bg: string; fg: string }> = {
  accent: { bg: c.accentSoft, fg: c.accentStrong },
  neutral: { bg: c.surfaceSunken, fg: c.textSecondary },
  primary: { bg: c.primarySoft, fg: c.primaryHover },
  success: { bg: c.successSoft, fg: c.success },
  error: { bg: c.errorSoft, fg: c.error },
};

export function Badge({
  children,
  tone = 'accent',
  style,
}: {
  children: React.ReactNode;
  tone?: Tone;
  style?: ViewStyle;
}) {
  const { bg, fg } = TONES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.text, { color: fg }]} numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: Radius.badge,
  },
  text: {
    ...Typography.meta,
    fontWeight: '600',
    lineHeight: 14,
  },
});
