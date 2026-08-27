import { StyleSheet, View } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';
import { GalpiText } from './galpi-text';

const c = Colors.light;

type IconComponent = React.ComponentType<{ size?: number; color?: string }>;

/** Empty state — warm and inviting, never a dead end. Serif title over a soft brown medallion. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: IconComponent;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.medallion}>
        <Icon size={30} color={c.primary} />
      </View>
      <GalpiText variant="quote" style={styles.title}>
        {title}
      </GalpiText>
      {description ? (
        <GalpiText variant="metaLg" color={c.textSecondary} style={styles.description}>
          {description}
        </GalpiText>
      ) : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
  },
  medallion: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.five,
  },
  title: { fontSize: 18, lineHeight: 29, textAlign: 'center' },
  description: { ...Typography.metaLg, marginTop: Spacing.two, textAlign: 'center' },
  action: { marginTop: Spacing.four },
});
