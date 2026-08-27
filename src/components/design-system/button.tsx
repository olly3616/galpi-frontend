import { ActivityIndicator, Pressable, type PressableProps, StyleSheet, Text, View } from 'react-native';

import { Colors, Layout, Radius, Typography } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'text';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  /** Optional leading icon element (e.g. a lucide icon), rendered before the label. */
  iconLeft?: React.ReactNode;
};

const c = Colors.light;

const HEIGHTS: Record<Size, number> = { sm: 36, md: 44, lg: Layout.controlHeight };
const PADDING: Record<Size, number> = { sm: 14, md: 18, lg: 22 };

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconLeft,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isText = variant === 'text';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        !isText && { height: HEIGHTS[size], paddingHorizontal: PADDING[size] },
        isText && styles.text,
        fullWidth && styles.fullWidth,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        pressed && !isDisabled && styles.pressed,
        isDisabled && variant === 'primary' && styles.primaryDisabled,
        isDisabled && isText && styles.textDisabled,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? c.textOnPrimary : c.primary}
        />
      ) : (
        <View style={styles.labelRow}>
          {iconLeft}
          <Text
            style={[
              styles.label,
              variant === 'primary' && { color: c.textOnPrimary },
              variant === 'secondary' && { color: c.primary },
              isText && { color: c.textLink },
              isDisabled && variant === 'primary' && { color: c.disabledText },
            ]}
            numberOfLines={1}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.control,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { alignSelf: 'stretch' },
  primary: { backgroundColor: c.primary },
  secondary: { backgroundColor: 'transparent', borderColor: c.primary },
  text: { paddingHorizontal: 4, alignSelf: 'flex-start' },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
  primaryDisabled: { backgroundColor: c.disabledBg },
  textDisabled: { opacity: 0.45 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { ...Typography.button },
});
