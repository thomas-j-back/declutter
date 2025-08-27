import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="my-tasks"
                options={{
                    headerTitle: 'My Tasks'
                }} />

        </Stack>
    )
}