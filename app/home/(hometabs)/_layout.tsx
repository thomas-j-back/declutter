import { Tabs } from 'expo-router';
import { LightTheme } from '@/components/ui/LightTheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import CreateTaskTab from '@/components/tasks/createTaskAction';

export default function HomeTabs() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: LightTheme.colors.primary }}>
            <Tabs.Screen
                name="tasks"
                options={{
                    tabBarLabelStyle: {
                        fontSize: 16
                    },
                    headerShown: false,
                    headerTitleStyle: {

                    },
                    title: 'My Tasks',
                    tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="cubes-stacked" color={color} />
                }}
            />
            <Tabs.Screen
                name="create-task"
                options={{
                    tabBarButton: () => <CreateTaskTab />,
                    title: 'New Tasks'
                }} />
            <Tabs.Screen
                name="myhome"
                options={{
                    title: 'My Home',
                    tabBarLabelStyle: {
                        fontSize: 16
                    },
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
                }} />
        </Tabs>
    )
}