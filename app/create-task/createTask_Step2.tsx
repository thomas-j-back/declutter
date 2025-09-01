import MyButton from '@/components/Button';
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { FormTextInput } from '@/components/form/FormTextInput';
import { useForm, useFormContext } from 'react-hook-form';
import styles from '@/components/ui/Styles';
import { useDB } from '../db/DBContext';

export default function CreateTask_Step2() {

    const { control, formState: { isValid } } = useFormContext();

    return (
        <View style={{ ...styles.paddingmd }}>
            <FormTextInput
                control={control}
                name="description"
                placeholder='Any additional details?'
            />
            <MyButton mode="outlined" disabled={!isValid} onPress={() => {
                router.push('/create-task/createTask_Step2')
            }}>
                Next
            </MyButton>
        </View>);
}