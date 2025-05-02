import { ActivityIndicator, Card, Text } from 'react-native-paper';
import { useAuth } from '@/lib/auth';
import { View } from 'react-native';
import { useEffect } from 'react';
import { FormTextInput } from '@/components/form/FormTextInput';
import styles from '@/components/ui/Styles';
import { passwordStepSchema, fullSignUpSchema, SignUpSchemaType } from '@/validation/auth/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import MyButton from '@/components/Button';

export default function PasswordStep({ email }: { email: string }) {

    type PasswordStepData = z.infer<typeof passwordStepSchema>;

    const { watch, control, handleSubmit, formState: { isValid }, setError } = useForm<PasswordStepData>({
        resolver: zodResolver(passwordStepSchema),
        mode: 'onChange'
    });

    const { loading, signUp, setLoading } = useAuth();

    const password = watch('password');
    const confirm = watch('confirm');

    const onSubmit = async (submitData: SignUpSchemaType) => {
        //if valid start signup logic
        setLoading(true);
        const { data, error } = await signUp(submitData.email, submitData.password);
        setLoading(false);
        if (error) {
            //Set some error and tell them to try again
        }
        //Route to the welcome page, some tutorial idk
    }

    //We need to use effect since it manualyl trigger the password match
    useEffect(() => {
        const result = fullSignUpSchema.safeParse({
            email,
            password,
            confirm,
        });
        if (!result.success) {
            const error = result.error.formErrors.fieldErrors.confirm?.[0];
            if (error)
                setError('confirm', { type: 'manual', message: error })
        }
    }, [password, confirm])

    //because we need to use the full schema to parse the password match, we import and test that separately



    return (
        <View>
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
            <Card.Content style={styles.marginVerticalsm}>
                <FormTextInput
                    name="confirm"
                    control={control}
                    placeholder="confirm"
                    secureTextEntry

                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <MyButton mode='outlined' onPress={handleSubmit((data) => onSubmit({ email, ...data }))} disabled={!isValid} >
                    {loading ? <ActivityIndicator size="small" color="#000000" /> : 'Sign Up'}
                </MyButton>
            </Card.Content>
        </View>)
}