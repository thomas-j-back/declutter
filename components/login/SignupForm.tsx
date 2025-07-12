import { ActivityIndicator, View } from 'react-native';
import { useState } from "react";
import { Card, Text, TextInput } from 'react-native-paper';
import { useAuth } from '@/lib/auth'
import styles from '../ui/Styles';
import EmailStep from './signUpSteps/EmailView'
import PasswordStep from '@/components/login/signUpSteps/PasswordView'

export default function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {

    const { signUp, email, setEmail } = useAuth();
    const [loading, setLoading] = useState(false);


    return (
        <View style={{ height: '100%' }}>
            <Card.Content>
                <Text variant="headlineMedium">
                    Create Account
                </Text>
            </Card.Content>
            {email === '' ? (
                <EmailStep onNext={(email) => {
                    setEmail(email);
                }} />
            ) : (
                <PasswordStep email={email} />
            )}


            <Card.Content style={styles.marginVerticalmd}>
                <Text onPress={onSwitchToLogin} variant="labelSmall" style={{ textAlign: "center" }}>
                    Already have an account? Log in
                </Text>
            </Card.Content>
        </View>
    );
}