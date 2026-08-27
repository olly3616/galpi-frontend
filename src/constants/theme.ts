/**
 * Design tokens ported from .claude/skills/galpi-design (Claude Design export, 2026-08-27).
 * Source of truth: .claude/skills/galpi-design/tokens/*.css and readme.md.
 *
 * Dark mode: the design system only defines one paper-toned palette (no dark variant
 * was designed). `Colors.dark` mirrors `Colors.light` for now as an explicit placeholder
 * until a real dark palette is designed — see feedback memory `feedback_branch_per_screen`
 * for context on why this was deferred rather than invented here.
 */

import '@/global.css';

import { Platform } from 'react-native';

const light = {
  // Paper (backgrounds)
  bgPage: '#FBF9F4',
  bgPageAlt: '#F5F1E8',
  surfaceCard: '#FFFFFF',
  surfaceSunken: '#F5F1E8',
  surfaceSkeleton: '#EAE4DA',

  // Ink (text)
  textPrimary: '#2E2A26',
  textSecondary: '#8A817A',
  textMuted: '#A9A19A',
  textOnPrimary: '#FFFFFF',
  textLink: '#8B5E3C',

  // Brand
  primary: '#8B5E3C',
  primaryHover: '#6E4930',
  primarySoft: '#F1E7DE',
  accent: '#C9A227',
  accentStrong: '#A8851F',
  accentSoft: '#F7EFD6',

  // Borders
  border: '#EAE4DA',
  borderStrong: '#D8D0C3',
  borderFocus: '#8B5E3C',

  // Semantic
  error: '#C0492F',
  errorSoft: '#F8E6E1',
  success: '#5B7A5B',
  successSoft: '#E7EEE7',

  disabledBg: '#EAE4DA',
  disabledText: '#A9A19A',

  // Legacy keys (kept so existing components — themed-text, themed-view — keep working)
  text: '#2E2A26',
  background: '#FBF9F4',
  backgroundElement: '#F5F1E8',
  backgroundSelected: '#F1E7DE',
} as const;

export const Colors = {
  light,
  // TODO: no dark palette exists in the design system yet — mirrored from light until designed.
  dark: light,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const FontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Pretendard (UI sans) family name per weight. React Native doesn't synthesize weight from a
 * single-weight custom font, so each weight is a separately-loaded, separately-named family.
 * These names must match the keys registered with useFonts in the root layout.
 */
export const PretendardFonts = {
  [FontWeights.regular]: 'Pretendard-Regular',
  [FontWeights.medium]: 'Pretendard-Medium',
  [FontWeights.semibold]: 'Pretendard-SemiBold',
  [FontWeights.bold]: 'Pretendard-Bold',
} as const;

/** Resolve the Pretendard family for a weight — use this when a style overrides fontWeight. */
export function sansFamily(weight: keyof typeof PretendardFonts = FontWeights.regular) {
  return PretendardFonts[weight];
}

/**
 * Brand type families.
 * - Serif (quotes, wordmark, empty-state invitations): Nanum Myeongjo, loaded via
 *   @expo-google-fonts/nanum-myeongjo in the root layout.
 * - UI sans: Pretendard, bundled from assets/fonts and loaded in the root layout. Because RN
 *   needs one family per weight, reference `PretendardFonts[weight]` / `sansFamily(weight)`
 *   rather than combining a single family with fontWeight.
 */
export const BrandFonts = {
  ui: PretendardFonts[FontWeights.regular],
  uiMedium: PretendardFonts[FontWeights.medium],
  uiSemibold: PretendardFonts[FontWeights.semibold],
  uiBold: PretendardFonts[FontWeights.bold],
  quote: 'NanumMyeongjo_400Regular',
  quoteBold: 'NanumMyeongjo_700Bold',
} as const;

/** Text role presets — mirrors the .galpi-* classes in tokens/typography.css. Pair with a Colors.* value for color. */
export const Typography = {
  title: { fontFamily: BrandFonts.uiBold, fontSize: 26, fontWeight: FontWeights.bold, lineHeight: 34, letterSpacing: -0.26 },
  section: { fontFamily: BrandFonts.uiSemibold, fontSize: 19, fontWeight: FontWeights.semibold, lineHeight: 25, letterSpacing: 0 },
  quote: { fontFamily: BrandFonts.quote, fontSize: 20, fontWeight: FontWeights.regular, lineHeight: 32, letterSpacing: 0 },
  quoteLg: { fontFamily: BrandFonts.quote, fontSize: 22, fontWeight: FontWeights.regular, lineHeight: 35, letterSpacing: 0 },
  body: { fontFamily: BrandFonts.ui, fontSize: 16, fontWeight: FontWeights.regular, lineHeight: 23, letterSpacing: 0 },
  bodySm: { fontFamily: BrandFonts.ui, fontSize: 15, fontWeight: FontWeights.regular, lineHeight: 22, letterSpacing: 0 },
  meta: { fontFamily: BrandFonts.ui, fontSize: 13, fontWeight: FontWeights.regular, lineHeight: 19, letterSpacing: 0 },
  metaLg: { fontFamily: BrandFonts.ui, fontSize: 14, fontWeight: FontWeights.regular, lineHeight: 20, letterSpacing: 0 },
  button: { fontFamily: BrandFonts.uiSemibold, fontSize: 16, fontWeight: FontWeights.semibold, lineHeight: 20, letterSpacing: 0 },
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Screen-layout constants from tokens/spacing.css (gutter, card padding, section/element gaps, fixed chrome heights). */
export const Layout = {
  gutterScreen: 20,
  padCard: 16,
  gapElement: 12,
  gapElementLg: 16,
  gapSection: 28,
  tabBarHeight: 56,
  controlHeight: 48,
} as const;

/** Corner radii from tokens/radius-shadow.css. */
export const Radius = {
  cover: 8,
  control: 12,
  card: 16,
  sheet: 20,
  badge: 999,
} as const;

/**
 * Elevation presets from tokens/radius-shadow.css ("paper lifted a hair off the desk").
 * All shadows use the warm-black tint rgb(46,42,38) — never neutral or blue.
 * sm: list rows / segmented thumbs · md: cards / covers · lg: FAB.
 */
export const Shadows = {
  sm: Platform.select({
    ios: { shadowColor: 'rgb(46,42,38)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    android: { elevation: 1 },
    default: {},
  }),
  md: Platform.select({
    ios: { shadowColor: 'rgb(46,42,38)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
    android: { elevation: 3 },
    default: {},
  }),
  lg: Platform.select({
    ios: { shadowColor: 'rgb(46,42,38)', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 16 },
    android: { elevation: 8 },
    default: {},
  }),
} as const;

/** Motion tokens from tokens/motion.css. Pair durations with Easing.bezier(...standard/out) from react-native-reanimated. */
export const Motion = {
  duration: { fast: 120, base: 200, slow: 320 },
  easingStandard: [0.32, 0.72, 0, 1] as const,
  easingOut: [0.16, 1, 0.3, 1] as const,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
