import { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

import { BrandFonts, Colors, Layout, Radius, Typography } from '@/constants/theme';

// RN-web renders TextInput as a DOM <input>, which the browser gives a default focus outline
// (a heavy black/blue ring). Native has no such outline; strip it on web so only our own
// field border shows on focus.
const webOutlineReset = Platform.select({ web: { outlineStyle: 'none' } }) as object | undefined;

export type InputProps = TextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
  /** Optional leading element (e.g. a search icon). */
  leading?: React.ReactNode;
  /** Optional trailing control (e.g. password visibility toggle). */
  trailing?: React.ReactNode;
};

const c = Colors.light;

export function Input({ label, hint, error, leading, trailing, style, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  // Resting fields carry the soft brown (borderFocusSoft); focus deepens to the strong brown
  // (borderFocus == primary) so a focused input matches a selected RadioGroup row exactly.
  const borderColor = error ? c.error : focused ? c.borderFocus : c.borderFocusSoft;

  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[styles.field, { borderColor }]}>
        {leading}
        <TextInput
          style={[styles.input, webOutlineReset, style]}
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
