import MyButton from "@/components/Button";
import { FormTextInput } from "@/components/form/FormTextInput";
import styles from "@/components/ui/Styles";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { emailStepSchema } from "@/validation/auth/signUpSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from "zod";


export default function EmailStep({ onNext }: { onNext: (email: string) => void }) {
    //We are passing in the onNext to be managed by the top level component
    type EmailStepData = z.infer<typeof emailStepSchema>;

    const { control, watch, handleSubmit, setError, formState: { isValid } } = useForm<EmailStepData>({
        resolver: zodResolver(emailStepSchema),
        mode: 'onChange'
    });

    return (
        <View style={{ flexGrow: 1 }}>
            <Card.Content style={styles.marginVerticalsm}>
                <FormTextInput
                    name="email"
                    control={control}
                    placeholder="Email"
                />
            </Card.Content>
            <Card.Content style={styles.marginVerticalmd}>
                <MyButton mode='outlined' disabled={!isValid} onPress={handleSubmit((data) => onNext(data.email))}>
                    Continue
                </MyButton>
            </Card.Content>
            <Card.Content>
                <Text style={{ textAlign: 'center' }} variant="labelLarge">---------- OR ----------</Text>
                <MyButton icon="google" mode="outlined" style={{ ...styles.marginVerticalsm }} > Google </MyButton>
                <MyButton icon="apple" mode="outlined" style={styles.marginVerticalsm} > Apple </MyButton>
            </Card.Content>
        </View>)
}