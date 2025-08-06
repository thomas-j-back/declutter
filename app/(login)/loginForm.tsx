import { useAuth } from '@/lib/auth'
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, HelperText, Text, TextInput } from 'react-native-paper';
import { signInSchema } from '@/validation/auth/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import styles from '@/components/ui/Styles';
import MyButton from '@/components/Button';
import { Link, router } from 'expo-router';
import { AuthError } from '@supabase/supabase-js';
import AuthProviderOptions from '@/components/auth/authProviderOptions';

export default function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
    const { signIn, checkUserConfirmation } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState(false);

    type SignInSchemaData = z.infer<typeof signInSchema>;

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<SignInSchemaData>({
        resolver: zodResolver(signInSchema),
        mode: 'onChange'
    });

    const handleLogin = async (submitData: SignInSchemaData) => {
        setLoading(true);

        const { data, error } = await signIn(submitData.email, submitData.password);
        if (error) {
            setError(error);
            //TODO gather list of possible errors with supabase, handle accordingly
            setLoading(false);
            return;

        }
        const isConfirmed = await checkUserConfirmation();
        if (!isConfirmed) {
            router.replace('/(auth)/email-verification');
        } else {
            router.replace('/(app)/home');
        }

    };
    return (
        <View >
            <Card.Content style={styles.marginVerticalsm}>
                <FormTextInput
                    name="email"
                    control={control}
                    placeholder="Email"
                    maxLength={20}
                />
            </Card.Content>
            <Card.Content >
                <FormTextInput
                    name="password"
                    control={control}
                    placeholder="Password"
                    secureTextEntry
                    maxLength={30}

                />
            </Card.Content>
            <Card.Content style={styles.marginBottomlg}>
                <MyButton mode='outlined' onPress={handleSubmit((data) => handleLogin(data))} disabled={!isValid} >
                    {loading ? <ActivityIndicator size="small" color="#000000" /> : 'Login'}
                </MyButton>
            </Card.Content>

            <AuthProviderOptions />

            <Card.Content style={styles.marginVerticallg}>
                <Link href="(signup)/signupStart">
                    <Text variant="labelMedium" style={{ textAlign: "center" }}>
                        Still not a user? <Text onPress={onSwitchToSignup} >Sign Up</Text>
                    </Text>
                </Link>

            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <HelperText type="error" visible={error ? true : false}>
                    {error?.message}
                </HelperText>
            </Card.Content>
        </View >
    );
}