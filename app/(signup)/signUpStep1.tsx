import MyButton from "@/components/Button";
import { FormTextInput } from "@/components/form/FormTextInput";
import styles from "@/components/ui/Styles";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { emailStepSchema } from "@/validation/auth/signUpSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from "zod";
import { Link, router } from "expo-router";
import { useSignUpForm } from "./signupContext";

/**
 * Holds email request, initiates email signup by navigating to PW
 * form after
 * @returns 
 */
export default function SignupStep1() {
    //We are passing in the onNext to be managed by the top level component
    type EmailStepData = z.infer<typeof emailStepSchema>;

    //USe form is basically just a hook giving you access to what you need
    const { control, watch, handleSubmit, setError, formState: { isValid } } = useForm<EmailStepData>({
        resolver: zodResolver(emailStepSchema),
        mode: 'onChange'
    });

    const { signupFormData, setFormData } = useSignUpForm();

    const handleContinue = (data: EmailStepData) => {
        setFormData({ email: data.email })
        router.push('/(signup)/signUpStep2');
    }

    return (
        <View >
            <Card.Content style={styles.marginVerticalsm}>
                <FormTextInput
                    name="email"
                    control={control}
                    placeholder="Email"
                    maxLength={100}
                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <MyButton mode='outlined' disabled={!isValid} onPress={handleSubmit((data) => handleContinue(data))}>
                    Sign Up
                </MyButton>
            </Card.Content>
        </View>)
}