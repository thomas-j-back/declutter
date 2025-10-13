import { useState, useEffect } from 'react';
import { View, Text, FlatList } from "react-native";
import { Card } from 'react-native-paper'
import styles from '../../../../components/ui/Styles'
import { useDB } from "@/app/db/DBContext";
import { Task } from '@/constants/types/TaskType';
import TaskCard from '@/components/tasks/TaskCard'
export default function TasksScreen() {

    const { taskService, ready } = useDB();
    const [tasks, setTasks] = useState<Task[]>([]);

    async function fetchTasks() {
        const result = await taskService?.getAllPending() || [];
        setTasks(result);
    }

    useEffect(() => {
        if (!ready) return;
        fetchTasks();

    }, [ready])

    const onDelete = async () => {
        fetchTasks();
    }
    return (
        <View style={{ ...styles.paddingmd }}>
            <FlatList
                data={tasks}
                ListEmptyComponent={() => <View><Text>No More Tasks. Yay!</Text></View>}
                contentContainerStyle={{ ...styles.paddingsm }}
                renderItem={({ item }) => {
                    return (
                        <TaskCard task={item} onDelete={onDelete} />
                    )
                }}
            ></FlatList>
        </View>
    )
}