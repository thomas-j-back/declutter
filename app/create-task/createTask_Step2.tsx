import MyButton from '@/components/Button';
import { View } from 'react-native'
import { router } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import styles from '@/components/ui/Styles';
import { useDB } from '../db/DBContext';
import DatePicker from '@/components/form/DatePicker';
import { Platform } from 'react-native';
import { useState } from 'react';
import DatePickerCustom from '@/components/form/DatePickerCustom';



export default function CreateTask_Step2() {
    const { control, formState: { isValid }, watch, getValues, setValue } = useFormContext();
    const { taskService } = useDB();
    const [time, setTime] = useState<Date>();
    const [date, setDate] = useState<Date>();

    type PickerMode = 'date' | 'time';

    // Watch for form validation
    const startDate = watch('start_date');
    const startTime = watch('start_time');
    const isValidForm = startDate && startTime && isValid;

    const insertTask = async () => {
        debugger;
        const formData = getValues();
        const task = await taskService?.insert({
            title: formData.title,
            description: formData.description,
            task_location: parseInt(formData.location), // Convert to integer for sql type
            action: parseInt(formData.action), // Convert to integer
            start_date: formData.start_date, // Already a Unix timestamp from DatePicker
            start_time: formData.start_time,
            estimated_minutes: 0, // Default value, you can add a field for this later
            status: 'pending'
        });

        if (task) {
            router.push('/home/(hometabs)/tasks');
        }
    }


    return (
        <View style={{ ...styles.paddingmd }}>

            {Platform.OS === 'android' ? (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <DatePickerCustom

                        name="start_date"
                        control={control}
                        mode="date"
                    />
                    <DatePickerCustom
                        name="start_time"
                        control={control}
                        mode="time"
                    />
                </View>
            ) : (
                <DatePicker
                    name="start_date_time"
                    control={control}
                    placeholder="When should this be done?"
                    label="Due Date & Time"
                    mode="datetime"
                />
            )}


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