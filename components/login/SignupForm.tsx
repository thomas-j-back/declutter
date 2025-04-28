import { ActivityIndicator, View } from 'react-native';
import { useState } from "react";
import { Card, Text, TextInput } from 'react-native-paper';
import { useAuth } from '@/lib/auth'
import styles from '../ui/Styles';
import MyButton from '../Button';

export default function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {

    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');

    const handleSignup = async () => {
        const { data, error } = await signUp(email, password);
        if (error) {
            //handle some error
        }
        //otherwise now trigger some state to wait for verification email

    }

    return (
        <View style={{ height: '100%' }}>
            <Card.Content>
                <Text variant="headlineMedium">
                    Create Account
                </Text>
            </Card.Content>

            <Card.Content style={styles.marginVerticalmd}>
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={setEmail}
                    style={{ borderRadius: 20 }}
                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <TextInput
                    label="Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    style={{ borderRadius: 20 }}
                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <TextInput
                    label="Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    style={{ borderRadius: 20 }}
                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <TextInput
                    label="Verify Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={validatePasswordCheck}
                    style={{ borderRadius: 20 }}
                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <MyButton mode='outlined' onPress={handleSignup} >
                    {loading ? <ActivityIndicator size="small" color="#000000" /> : 'Login'}
                </MyButton>
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <Text onPress={onSwitchToLogin} variant="labelSmall" style={{ textAlign: "center" }}>
                    Already have an account?
                </Text>
            </Card.Content>
        </View>
    );
}