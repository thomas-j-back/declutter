import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import MyButton from '@/components/Button';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (

        <Card>
            <Card.Title title="Welcome to Declutter" />
            <Card.Content>
                <Text variant="titleLarge">Create an account to start organizing and styling.</Text>
            </Card.Content>
            <Card.Content>
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={setEmail}
                />
            </Card.Content>
            <Card.Content>
                <TextInput
                    label="Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </Card.Content>
            <Card.Content>
                <MyButton onPress={() => console.log('Pressed')} >
                    Login
                </MyButton>
            </Card.Content>
        </Card>
    )

}