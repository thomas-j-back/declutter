import { Card, Text } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import styles from '@/components/ui/Styles';

export default function VerifyEmailScreen() {
    const [checking, setChecking] = useState(true);
    const { session } = useAuth();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (_event == 'USER_UPDATED') {
                router.replace('(app)');
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    })

    return (
        <Card>
            <Card.Content style={styles.paddingmd}>
                <Text variant="titleLarge">Please check your email in order to verify your account.</Text>
                <Text variant="labelLarge">Didn't recieve an email? Send one agai with the below link.</Text>
            </Card.Content>
        </Card>
    )
}


