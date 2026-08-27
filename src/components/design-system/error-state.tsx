import { CloudOff, RotateCw } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { Button } from './button';
import { GalpiText } from './galpi-text';

const c = Colors.light;

/** Full-screen error with a retry — errors never dead-end. */
export function ErrorState({
  title = '잠시 문제가 생겼어요',
  description,
  onRetry,
  retryLabel = '다시 시도',
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.medallion}>
        <CloudOff size={24} color={c.error} />
      </View>
      <GalpiText variant="body" style={styles.title}>
        {title}
      </GalpiText>
      {description ? (
        <GalpiText variant="metaLg" color={c.textSecondary} style={styles.description}>
          {description}
        </GalpiText>
      ) : null}
      {onRetry ? (
        <View style={styles.action}>
          <Button
            label={retryLabel}
            variant="secondary"
            size="sm"
            onPress={onRetry}
            iconLeft={<RotateCw size={16} color={c.primary} />}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: Spacing.six, paddingHorizontal: Spacing.four },
  medallion: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: c.errorSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  title: { fontWeight: '500', textAlign: 'center' },
  description: { marginTop: Spacing.one, textAlign: 'center' },
  action: { marginTop: Spacing.four },
});
