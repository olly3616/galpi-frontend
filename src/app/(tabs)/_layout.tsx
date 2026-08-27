import { Tabs } from 'expo-router';
import { Library, User, Users } from 'lucide-react-native';

import { BrandFonts, Colors } from '@/constants/theme';

const c = Colors.light;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textSecondary,
        tabBarLabelStyle: { fontFamily: BrandFonts.uiMedium, fontSize: 11 },
        tabBarStyle: { backgroundColor: c.surfaceCard, borderTopColor: c.border },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '내 책장',
          tabBarIcon: ({ color }) => <Library size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: '피드',
          tabBarIcon: ({ color }) => <Users size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
