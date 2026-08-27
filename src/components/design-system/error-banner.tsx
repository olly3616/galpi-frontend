import { CircleAlert } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Typography } from '@/constants/theme';

const c = Colors.light;

export function ErrorBanner({ children }: { children: string }) {
  return (
    <View style={styles.banner} accessibilityRole="alert">
      <CircleAlert size={16} color={c.error} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: c.errorSoft,
    borderWidth: 1,
    borderColor: 'rgba(192,73,47,0.18)',
    borderRadius: Radius.control,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  text: {
    ...Typography.metaLg,
    color: c.error,
    flex: 1,
  },
});
