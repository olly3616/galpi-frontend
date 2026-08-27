import { useState } from 'react';
import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { BrandFonts, Colors, Layout, Radius, Shadows, Typography } from '@/constants/theme';

export type InputProps = TextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
  /** Optional trailing control (e.g. password visibility toggle). */
  trailing?: React.ReactNode;
};

const c = Colors.light;

export function Input({ label, hint, error, trailing, style, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? c.error : focused ? c.borderFocus : c.border;

  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          { borderColor },
          focused && !error && styles.fieldFocused,
        ]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={c.textMuted}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />
        {trailing}
      </View>
      {error || hint ? (
        <Text style={[styles.helper, error ? styles.helperError : styles.helperHint]}>
          {error || hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...Typography.metaLg,
    fontFamily: BrandFonts.uiMedium,
    fontWeight: '500',
    color: c.textPrimary,
    marginBottom: 8,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: c.surfaceCard,
    borderWidth: 1,
    borderRadius: Radius.control,
    paddingHorizontal: 14,
    minHeight: Layout.controlHeight,
  },
  fieldFocused: Shadows.md as object,
  input: {
    flex: 1,
    ...Typography.body,
    color: c.textPrimary,
    paddingVertical: 13,
  },
  helper: {
    ...Typography.meta,
    marginTop: 6,
  },
  helperError: { color: c.error },
  helperHint: { color: c.textSecondary },
});
