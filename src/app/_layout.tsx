import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AppProviders } from '@/providers/app-providers';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    // Pretendard (the app's single font) — one family per weight; names match PretendardFonts.
    'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('@/assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Routes are auto-discovered from the file tree; headerShown is set globally here.
            Declaring each nested screen explicitly triggered expo-router's "extraneous route"
            warning, so we let the Stack populate itself. */}
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </AppProviders>
  );
}
