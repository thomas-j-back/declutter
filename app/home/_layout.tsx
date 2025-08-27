
import { BottomNavigation, Text } from 'react-native-paper';
import { View } from 'react-native';
import MyButton from '@/components/Button';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Stack } from 'expo-router';

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen name="(hometabs)" options={{ headerShown: false }} />

        </Stack>
    );
}