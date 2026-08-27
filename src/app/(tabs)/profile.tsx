import { User } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, GalpiText } from '@/components/design-system';
import { Colors, Layout, Spacing } from '@/constants/theme';

const c = Colors.light;

// Placeholder — the real 프로필/설정 (S-09) is a later branch. Kept minimal so the tab bar works.
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <GalpiText variant="title">프로필</GalpiText>
      </View>
      <View style={styles.centered}>
        <EmptyState
          icon={User}
          title="곧 만나요"
          description="내 정보와 설정이 이곳에 담길 거예요"
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
