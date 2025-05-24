import { Button, Card, Text } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import styles from '@/components/ui/Styles';

export default function VerifyEmailScreen() {
    const [checking, setChecking] = useState(true);
    const { resendEmailVerification, session } = useAuth();

    useEffect(() => {
        const i_id = setInterval(() => { }, 100);


        return () => {
            clearInterval(i_id);
        }
    })

    return (
        <Card>
            <Card.Content style={styles.paddingmd}>
                <Text variant="titleLarge">Please check your email in order to verify your account.</Text>
                <Text variant="labelLarge">Didn't recieve an email? </Text>
                <Button onPress={resendEmailVerification}>Send one again here.</Button>
            </Card.Content>
        </Card>
    )
}


