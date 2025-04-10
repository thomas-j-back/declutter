import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Session } from '@supabase/supabase-js';
import { useAuth } from '@/lib/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//Define route protection
function useProtectedRoute(session: Session | null) {
  const segments = useSegments();
  const route = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'login';
    if (!session && !inAuthGroup) {
      //force redirect to login page
      route.replace('/login');
    } else if (session && inAuthGroup) {
      route.replace('/');
    }
  }, [session, segments]);
}


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { session, loading } = useAuth();
  //Starts using the hook!!
  useProtectedRoute(session);
  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <PaperProvider>
      <Card>
        <Card.Title title="Welcome to Declutter" />
        <Card.Content>
          <Text variant="titleMedium">This will walk you through how to progress</Text>
          <Button mode="contained" onPress={() => { }}>
            Get Started
          </Button>
        </Card.Content>
      </Card>
    </PaperProvider >
  );
}
