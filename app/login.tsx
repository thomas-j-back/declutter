import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';

export default function Login() {

    const [email, setEmail] = useState('');
    return (

        <Card>
            <Card.Title title="Welcome to Declutter" />
            <Card.Content>
                <Text variant="titleLarge">Create an account to start organizing and styling.</Text>
                <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Content>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </Card.Content>
        </Card>
    )

}