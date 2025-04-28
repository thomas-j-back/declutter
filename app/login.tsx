import { useCallback, useState } from 'react';
import { View } from 'react-native';
import styles from '@/components/ui/Styles';
import { supabase } from '@/lib/supabase';
import { ActivityIndicator, Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import MyButton from '@/components/Button';
import LoginForm from '@/components/login/LoginForm';
import SignupForm from '@/components/login/SignupForm';
import { useFocusEffect } from '@react-navigation/native';


export default function LoginPage() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    // Reset state when screen is focused (i.e. user comes back)
    useFocusEffect(
        useCallback(() => {
            setMode('login'); // Reset to login when coming back
        }, [])
    );

    return (
        <Card style={[styles.paddingmd, { height: '100%' }]}>
            <Card.Title title="Welcome to Declutter" />
            <Card.Content style={styles.marginBottommd}>
                <Text variant="titleLarge">Declutter</Text>
            </Card.Content>
            {mode === 'login' ? (
                <LoginForm onSwitchToSignup={() => setMode('signup')} />
            ) : mode === 'signup' ? (
                <SignupForm onSwitchToLogin={() => setMode('login')} />
            ) : null}

        </ Card>
    );
}



