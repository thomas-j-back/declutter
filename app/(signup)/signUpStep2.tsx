import { useTheme, ActivityIndicator, Card, Text, List } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { View, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useState } from 'react';
import { FormTextInput } from '@/components/form/FormTextInput';
import styles from '@/components/ui/Styles';
import { step2Schema, passwordValidations } from '@/validation/auth/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import MyButton from '@/components/Button';
import { router } from 'expo-router';
import { useSignUpForm } from './signupContext';

export default function SignupStep2() {

    type PasswordStepData = z.infer<typeof step2Schema>;

    const { watch, control, handleSubmit, formState: { errors, isValid }, setError } = useForm<PasswordStepData>({
        resolver: zodResolver(step2Schema),
        mode: 'onChange'
    });

    const [signInError, setSignInError] = useState('');

    const theme = useTheme();

    const { password } = watch();

    const { signupFormData, setFormData } = useSignUpForm();

    const { loading, signUp, setLoading } = useAuth();



    const onSubmit = async (submitData: PasswordStepData) => {
        //if valid start signup logic
        setLoading(true);
        const { data, error } = await signUp(signupFormData.email, submitData.password);
        setLoading(false);
        if (data.session == null) {
            setSignInError("Account with email already exists. Please sign in.");
            return;
        }
        if (error) {
            //Set some error and tell them to try again
            setSignInError(error.message);
            return;
        }
        if (data && !data.user?.email_confirmed_at) {
            router.navigate('/(auth)/emailVerification');
        }

    }


    //because we need to use the full schema to parse the password match, we import and test that separately
    return (
        <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}>
            <View>
                <Card.Content>
                    <Text variant='labelSmall'>First name</Text>
                </Card.Content>
                <Card.Content style={styles.marginVerticalsm}>
                    <FormTextInput
                        name="name"
                        control={control}
                        placeholder="What should we call you?"
                    />
                </Card.Content>
                <Card.Content>
                    <Text variant='labelSmall'>Set a password</Text>
                </Card.Content>
                <Card.Content style={styles.marginTopmd}>
                    <FormTextInput
                        name="password"
                        control={control}
                        placeholder="Password"
                        secureTextEntry
                        hideError={true}

                    />

                    <Text variant="labelMedium">Password:</Text>
                    {Object.entries(passwordValidations).map(([key, value]) => {
                        let passed: boolean | void = false;
                        if (typeof password == 'string') {
                            passed = value.test(password)
                        }
                        if (passed) {
                            return null;
                        }

                        return (<Text key={key} style={{ color: passed ? 'green' : 'red' }} variant='labelMedium'>{value.label}</Text>)
                    })}

                </Card.Content>




                {signInError ? (<Card.Content><Text style={{ color: theme.colors.error }} variant="bodyLarge">{signInError}</Text></Card.Content>) : ''}
                <Card.Content style={styles.marginVerticalmd}>
                    <MyButton mode='outlined' onPress={handleSubmit((data) => onSubmit(data))} disabled={!isValid} >
                        {loading ? <ActivityIndicator size="small" color="#000000" /> : 'Sign Up'}
                    </MyButton>
                </Card.Content>
            </View>
        </KeyboardAvoidingView >)
}