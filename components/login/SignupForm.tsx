import { ActivityIndicator, View } from 'react-native';
import { useState } from "react";
import { Card, Text, TextInput } from 'react-native-paper';
import { useAuth } from '@/lib/auth'
import styles from '../ui/Styles';
import { signUpSchema, SignUpSchemaType } from '@/validation/auth/signUpSchema';

import EmailStep from '@/components/login/signUpSteps/EmailStep'
import PasswordStep from '@components/login/signUpSteps/PasswordStep';

export default function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {

    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');



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
                <PasswordStep email={email} onNext={onSubmit} />
            )}


            <Card.Content style={styles.marginVerticalmd}>
                <Text onPress={onSwitchToLogin} variant="labelSmall" style={{ textAlign: "center" }}>
                    Already have an account? Log in
                </Text>
            </Card.Content>
        </View>
    );
}