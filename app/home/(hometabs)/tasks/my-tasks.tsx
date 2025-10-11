import { useState, useEffect } from 'react';
import { View, Text, FlatList } from "react-native";
import { Card } from 'react-native-paper'
import styles from '../../../../components/ui/Styles'
import { useDB } from "@/app/db/DBContext";
import { Task } from '@/constants/types/TaskType';
export default function TasksScreen() {

    const { taskService, ready } = useDB();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!ready) return;

        async function fetchTasks() {
            const result = await taskService?.getAllPending() || [];
            setTasks(result);
        }
        fetchTasks();

    }, [ready])
    return (
        <View style={{ ...styles.paddingmd }}>
            <FlatList
                data={tasks}
                ListEmptyComponent={() => <View><Text>No More Tasks. Yay!</Text></View>}
                contentContainerStyle={{ ...styles.paddingsm }}
                renderItem={({ item }) => {
                    return (
                        <Card style={{ ...styles.paddingsm, ...styles.marginBottommd }}>
                            <Card.Title title={item.title} />
                            <Card.Content>
                                <Text>{item.description}</Text>
                            </Card.Content>
                        </Card>
                    )
                }}
            ></FlatList>
        </View>
    )
}