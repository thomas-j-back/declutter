import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Task } from '@/constants/types/TaskType';
import { formatUnixTimestamp, isPastTimestamp, isTodayTimestamp } from '@/utils/dateUtils';
import MyButton from '../Button';
import { useDB } from '@/app/db/DBContext';

interface TaskCardProps {
    task: Task;
    onDelete: () => {}
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
    const isOverdue = isPastTimestamp(task.start_date);
    const isDueToday = isTodayTimestamp(task.start_date);

    const { taskService } = useDB();

    useEffect(() => {
        const locationName = taskService?.getLocationById(task.task_location.id);
    }, []);

    const deleteTask = async () => {
        const result = await taskService?.deleteTask(task.id);
        if (result) {
            onDelete();
        }

    }

    return (
        <Card style={{ margin: 8 }}>
            <Card.Content>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {task.title}
                </Text>

                {task.description && (
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                        {task.description}
                    </Text>
                )}

                <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: '#888' }}>
                        Start: {formatUnixTimestamp(task.start_date)}
                    </Text>


                    {isOverdue && (
                        <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>
                            OVERDUE
                        </Text>
                    )}

                    {isDueToday && !isOverdue && (
                        <Text style={{ fontSize: 12, color: 'orange', fontWeight: 'bold' }}>
                            DUE TODAY
                        </Text>
                    )}
                </View>

                <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                    Location: {task.task_location.name}
                </Text>
                <View>
                    <MyButton mode="contained" onPress={deleteTask}>
                        Delete
                    </MyButton>
                </View>
            </Card.Content>
        </Card>
    );
}

