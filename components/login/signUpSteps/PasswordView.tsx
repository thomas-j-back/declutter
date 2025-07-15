import { useTheme, ActivityIndicator, Card, Text, List } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { FormTextInput } from '@/components/form/FormTextInput';
import styles from '@/components/ui/Styles';
import { passwordStepSchema, SignUpSchemaType } from '@/validation/auth/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { set, useForm } from 'react-hook-form';
import MyButton from '@/components/Button';
import { router } from 'expo-router';

export default function PasswordStep({ email }: { email: string | null }) {

    type PasswordStepData = z.infer<typeof passwordStepSchema>;

    const { watch, control, handleSubmit, formState: { errors, isValid }, setError } = useForm<PasswordStepData>({
        resolver: zodResolver(passwordStepSchema),
        mode: 'onChange'
    });

    const [signInError, setSignInError] = useState('');

    const theme = useTheme();

    const password = watch('password');

    const { loading, signUp, setLoading } = useAuth();
    //I wanna use these + the zod validation to show and hide these as they are checked off
    const [passwordRequirements, setPasswordRequirements] = useState([
        { name: 'length', message: 'At least 10 characters', active: true },
        { name: 'special', message: 'One of the following special characters: @!$#&*', active: true },
        { name: 'case', message: 'At least one upper case character', active: true },
        { name: 'number', message: 'At least one number', active: true }
    ])


    const onSubmit = async (submitData: SignUpSchemaType) => {
        //if valid start signup logic
        setLoading(true);
        const { data, error } = await signUp(submitData.email, submitData.password);
        setLoading(false);
        if (error) {
            //Set some error and tell them to try again
            setSignInError(error.message)
        }
        if (data && !data.user?.email_confirmed_at) {
            router.replace('/(auth)/email-verification');
        }

    }


    //because we need to use the full schema to parse the password match, we import and test that separately
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}>
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Card.Content>
                        <Text variant='labelSmall'>Set a password</Text>
                    </Card.Content>
                    <Card.Content style={styles.marginVerticalsm}>
                        <FormTextInput
                            name="password"
                            control={control}
                            placeholder="Password"
                            secureTextEntry

                        />
                    </Card.Content>
                    <Card.Content>
                        <Text variant="labelMedium">Password must include:</Text>
                        {passwordRequirements.map((req) => {

                            return (
                                <List.Item
                                    titleStyle={theme.fonts.labelMedium}
                                    title={req.message}
                                    key={req.name}
                                    left={props => <List.Icon icon="circle-small" />}
                                />)
                        })}

                    </Card.Content>
                    <Card.Content style={styles.marginVerticalsm}>
                        <FormTextInput
                            name="confirm"
                            control={control}
                            placeholder="Confirm Password"
                            secureTextEntry
                            disabled={!password ? true : !!errors.password}

                        />
                    </Card.Content>
                    {signInError ? (<Card.Content><Text style={{ color: theme.colors.error }} variant="bodyLarge">{signInError}</Text></Card.Content>) : ''}
                    <Card.Content style={styles.marginVerticalmd}>
                        <MyButton mode='outlined' onPress={handleSubmit((data) => onSubmit({ email, ...data }))} disabled={!isValid} >
                            {loading ? <ActivityIndicator size="small" color="#000000" /> : 'Sign Up'}
                        </MyButton>
                    </Card.Content>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>)
}