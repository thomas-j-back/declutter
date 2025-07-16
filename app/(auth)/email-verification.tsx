import { Button, Card, Text } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import styles from '@/components/ui/Styles';

export default function VerifyEmailScreen() {
    const { resendEmailVerification, checkUserConfirmation } = useAuth();

    // useEffect(() => {
    //     const i_id = setInterval(async () => {
    //         const result = await checkUserConfirmation();
    //         if (result) {
    //             clearInterval(i_id);
    //             //Is it not reaching this point?
    //             debugger;
    //             router.replace('/');
    //         }
    //     }, 100);

    //     return () => {
    //         clearInterval(i_id);
    //     }
    // })

    const checkConfirmation = async () => {
        console.log('running check confirmation')
        debugger;
        const result = await checkUserConfirmation();
        console.log(result);
        debugger;
        alert(result);
        if (result) {
            router.replace('/(app)/home');
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


