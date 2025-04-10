import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Session } from '@supabase/supabase-js';
import { SessionProvider } from '@/lib/auth';






export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  //Starts using the hook!!


  return (
    <SessionProvider>
      <PaperProvider>
        <Slot />
      </PaperProvider >
    </SessionProvider>

  );
}
