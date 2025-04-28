import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Session } from '@supabase/supabase-js';
import { AuthProvider } from '@/lib/auth';
import { LightTheme } from '@/components/ui/LightTheme';
import { DarkTheme } from '@/components/ui/DarkTheme';

const theme = {
  ...DefaultTheme,
  colors: LightTheme.colors, // Copy it from the color codes scheme and then use it here
};




export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  //Starts using the hook!!


  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Slot />
      </PaperProvider >
    </AuthProvider>

  );
}
