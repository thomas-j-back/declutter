import MyButton from '@/components/Button';
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { FormTextInput } from '@/components/form/FormTextInput';
import { useFormContext } from 'react-hook-form';
import styles from '@/components/ui/Styles';
import { useDB } from '../db/DBContext';
import DatePicker from '@/components/form/DatePicker';

export default function CreateTask_Step2() {
    const { control, formState: { isValid }, watch, getValues } = useFormContext();
    const { taskService } = useDB();

    // Watch for form validation
    const startDateTime = watch('start_date_time');
    const isValidForm = startDateTime && isValid;

    const insertTask = async () => {
        const formData = getValues();
        const task = await taskService?.insert({
            title: formData.title,
            description: formData.description,
            task_location: parseInt(formData.location), // Convert to integer for sql type
            action: parseInt(formData.action), // Convert to integer
            start_date_time: formData.start_date_time, // Already a Unix timestamp from DatePicker
            estimated_minutes: 0, // Default value, you can add a field for this later
            status: 'pending'
        });

        if (task) {
            router.push('/home/(hometabs)/myhome');
        }
    }

    return (
        <View style={{ ...styles.paddingmd }}>
            <DatePicker
                name="start_date_time"
                control={control}
                placeholder="When should this be done?"
                label="Due Date & Time"
                mode="datetime"
            />

            <MyButton
                mode="outlined"
                disabled={!isValidForm}
                onPress={insertTask}
            >
                Create Task
            </MyButton>
        </View>
    );
}