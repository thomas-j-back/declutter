import { Card, Text } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export default function VerifyEmailScreen() {
    const [checking, setChecking] = useState(true);
    const { session } = useAuth();
    useEffect(() => {
        if (session?.user.email_confirmed_at) {
            //User is logged in and 
            router.navigate('(app)');
        }
    }, [session])

    return (
        <Card>
            <Card.Content>
                <Text variant="titleLarge">Please check your email in order to verify your account.</Text>
                <Text variant="labelLarge">Didn't recieve an email? Send one agai with the below link.</Text>
            </Card.Content>
        </Card>
    )
}


