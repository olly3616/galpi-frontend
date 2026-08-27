import { StyleSheet, Text, type TextProps } from 'react-native';

import { BrandFonts, Colors, Typography } from '@/constants/theme';

type Variant = keyof typeof Typography;

export type GalpiTextProps = TextProps & {
  variant?: Variant;
  color?: string;
};

const c = Colors.light;

export function GalpiText({ variant = 'body', color, style, ...rest }: GalpiTextProps) {
  return <Text style={[{ color: color ?? c.textPrimary }, Typography[variant], style]} {...rest} />;
}

/** The 갈피 wordmark — serif, brown, tight tracking. */
export function Wordmark({ size = 40 }: { size?: number }) {
  return (
    <Text style={[styles.wordmark, { fontSize: size, lineHeight: size * 1.1 }]} accessibilityRole="header">
      갈피
    </Text>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    fontFamily: BrandFonts.quoteBold,
    color: c.primaryHover,
    letterSpacing: -0.8,
  },
});
