import { useState, useEffect } from 'react';
import { View, Text, FlatList } from "react-native";
import { Card } from 'react-native-paper'
import styles from '../../../components/ui/Styles'
import { useDB } from "@/app/db/DBContext";
import { Task } from '@/constants/types/TaskType';
export default function TasksScreen() {

    const data = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
    const { taskService } = useDB();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        async function fetchTasks() {
            const result = await taskService?.getAllPending() || [];
            setTasks(result);
        }

        fetchTasks();
    }, [tasks])
    return (
        <View style={{ ...styles.paddingmd }}>
            <FlatList
                data={tasks}
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