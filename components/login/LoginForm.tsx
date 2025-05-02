import { useAuth } from '@/lib/auth'
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import styles from "../ui/Styles";
import MyButton from "../Button";

export default function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const { data, error } = await signIn(email, password)
        if (error) {
            //handle possible errors
            //TODO gather list of possible errors with supabase, handle accordingly
        }
        setLoading(false);
    };
    return (
        <View style={{ height: '100%' }}>
            { }
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
                <MyButton mode='outlined' onPress={handleLogin} >
                    {loading ? <ActivityIndicator size="small" color="#000000" /> : 'Login'}
                </MyButton>
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <Text onPress={onSwitchToSignup} variant="labelSmall" style={{ textAlign: "center" }}>
                    Sign Up
                </Text>
            </Card.Content>
        </View>
    );
}