import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Session } from '@supabase/supabase-js';
import { AuthProvider } from '@/lib/auth';
import { LightTheme } from '@/components/ui/LightTheme';
import { DarkTheme } from '@/components/ui/DarkTheme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DBProvider from './db/DBContext'

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
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <AuthProvider>
          <DBProvider>
            <PaperProvider theme={theme}>
              <Slot />
            </PaperProvider >
          </DBProvider>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}
