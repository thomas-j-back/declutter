import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const SUPABASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;;

// SecureStore adapter implementation
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItem(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
