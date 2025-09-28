import { Stack, Slot } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { TaskCreateStep1Schema, taskCreateStep1Schema } from "@/validation/taskForm/createTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";
import styles from "@/components/ui/Styles";

export default function createTaskLayout() {

    const methods = useForm<TaskCreateStep1Schema>({
        resolver: zodResolver(taskCreateStep1Schema),
        mode: 'onChange'
    });
    return (
        <FormProvider  {...methods}>
            <Stack>
                <Stack.Screen name="createTask_Step1" options={{
                    headerTitle: "Task Details",
                }} />
                <Stack.Screen name="createTask_Step2" options={{
                    headerTitle: "When?"
                }} />
                <View style={{ ...styles.paddingmd }}>
                    <Slot />
                </View>

            </Stack>
        </FormProvider>

    )
}