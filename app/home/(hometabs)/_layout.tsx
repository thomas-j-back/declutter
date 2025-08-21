import { Tabs } from 'expo-router';

export default function HomeTabs() {
    return (
        <Tabs>
            <Tabs.Screen
                name="tasks"
                options={{
                    title: 'My Tasks'
                }}
            />
            <Tabs.Screen
                name="myhome"
                options={{
                    title: 'Home'
                }} />
        </Tabs>
    )
}