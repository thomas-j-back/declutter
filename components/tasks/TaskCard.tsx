import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Task } from '@/constants/types/TaskType';
import { formatUnixTimestamp, isPastTimestamp, isTodayTimestamp } from '@/utils/dateUtils';

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    const isOverdue = isPastTimestamp(task.start_date_time);
    const isDueToday = isTodayTimestamp(task.start_date_time);

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
                        Due: {formatUnixTimestamp(task.start_date_time)}
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
            </Card.Content>
        </Card>
    );
}

