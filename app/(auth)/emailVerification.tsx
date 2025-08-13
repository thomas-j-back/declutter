import { Button, Card, Text } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import styles from '@/components/ui/Styles';
import { ToastAndroid } from 'react-native';

export default function VerifyEmailScreen() {
    const { resendEmailVerification, checkUserConfirmation } = useAuth();

    const checkConfirmation = async () => {
        const result = await checkUserConfirmation();
        if (result) {
            router.replace('/(app)/home');
        } else {
            ToastAndroid.show('Email has not been confirmed yet', ToastAndroid.SHORT);
        }
    }

    return (
        <Card>
            <Card.Content style={styles.paddingmd}>
                <Text variant="titleLarge">Please check your email in order to verify your account.</Text>
                <Text variant="labelLarge">Didn't recieve an email? </Text>
                <Button onPress={resendEmailVerification}>Send one again here.</Button>
                <Button onPress={checkConfirmation}>Click here to check if you are confirmed.</Button>
            </Card.Content>
        </Card>
    )
}


