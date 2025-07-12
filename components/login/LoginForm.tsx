import { useAuth } from '@/lib/auth'
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { signInSchema } from '@/validation/auth/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import styles from "../ui/Styles";
import MyButton from "../Button";
import { router } from 'expo-router';

export default function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
    const { signIn, checkUserConfirmation } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    type SignInSchemaData = z.infer<typeof signInSchema>;

    const { control, handleSubmit } = useForm<SignInSchemaData>({
        resolver: zodResolver(signInSchema),
        mode: 'onChange'
    });

    const handleLogin = async (submitData: SignInSchemaData) => {
        setLoading(true);
        const { data, error } = await signIn(submitData.email, submitData.password)
        const isConfirmed = await checkUserConfirmation();
        if (!isConfirmed) {
            router.replace('/auth/email-verification');
        } else {
            router.replace('/app/home');
        }
        if (error) {
            //TODO gather list of possible errors with supabase, handle accordingly
            setLoading(false);

        }
    };
    return (
        <View style={{ height: '100%' }}>
            { }
            <Card.Content style={styles.marginVerticalmd}>
                <FormTextInput
                    name="email"
                    control={control}
                    placeholder="Email"
                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <FormTextInput
                    name="password"
                    control={control}
                    placeholder="Password"
                    secureTextEntry

                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <MyButton mode='outlined' onPress={handleSubmit((data) => handleLogin(data))} >
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