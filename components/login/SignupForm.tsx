import { Card, Text } from 'react-native-paper';

export default function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    return (
        <Card.Content>
            <Text>Signup Form</Text>
        </Card.Content>
    );
}