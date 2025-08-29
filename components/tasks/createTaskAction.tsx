import { TouchableOpacity } from "react-native";
import { Text } from 'react-native-paper';
import { LightTheme } from "../ui/LightTheme";
import styles from '../ui/Styles'
import { router } from 'expo-router'

export default function CreateTaskTab() {
    //Open the form for new task when pressed
    return (
        <TouchableOpacity
            onPress={() => {
                router.push('create-task')
            }}
            style={{
                top: -40,
                right: -20,
                width: 90,
                height: 90,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 45,
                backgroundColor: LightTheme.colors.primary,
                ...styles.paddingsm
            }}>
            <Text style={{ color: 'white' }}>New Task</Text>
        </TouchableOpacity>
    )
}