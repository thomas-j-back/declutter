import MyButton from '@/components/Button';
import { FlatList, View } from 'react-native'
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { FormTextInput } from '@/components/form/FormTextInput';
import { useFormContext } from 'react-hook-form';
import styles from '@/components/ui/Styles';
import { useDB } from '../db/DBContext';
import { useState, useEffect } from 'react';
import { TaskLocation, TaskAction } from '@/constants/types/TaskType';
import DropDown from '@/components/form/DropDown';

export default function createTask_Step1() {
    const { control, formState: { isValid } } = useFormContext();

    const { taskService } = useDB();
    const [locations, setLocations] = useState<TaskLocation[]>([]);
    const [actions, setActions] = useState<TaskAction[]>([]);
    useEffect(() => {
        async function fetchData() {
            const locations = await taskService?.getLocations();
            const actions = await taskService?.getActions();
            setLocations(locations || []);
            setActions(actions || []);
        }
        fetchData();
    }, []);

    return (
        <View style={{ ...styles.paddingmd }}>
            {// you should be able to select the location and action from the dropdowns
                //or create your own location and action from the text inputs
            }
            <DropDown
                name="action"
                options={actions.map(action => ({ label: action.name, value: action.id.toString() }))}
                control={control}
            />
            <DropDown
                name="location"
                options={locations.map(location => ({ label: location.name, value: location.id.toString() }))}
                control={control}
            />
            <MyButton mode="outlined" disabled={!isValid} onPress={() => {
                router.push('/create-task/createTask_Step2')
            }}>
                Next
            </MyButton>
        </View>);
}