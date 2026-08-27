import { Users } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, GalpiText } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';

const c = Colors.light;

// Placeholder — the real 피드 (S-08) is a later branch. Kept minimal so the tab bar works.
export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <GalpiText variant="title">피드</GalpiText>
      </View>
      <View style={styles.centered}>
        <EmptyState
          icon={Users}
          title="곧 만나요"
          description="팔로우한 사람들의 구절이 이곳에 모일 거예요"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bgPage },
  header: { paddingHorizontal: Layout.gutterScreen, paddingTop: Spacing.two, paddingBottom: Spacing.two },
  centered: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.two },
});
