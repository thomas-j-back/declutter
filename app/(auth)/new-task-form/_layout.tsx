import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="step-1" options={{
                headerTitle: "Create new Task"
            }} />
        </Stack>
    )
}