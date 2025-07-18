
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import MyButton from '@/components/Button';
import { useAuth } from '@/lib/auth';

export default function Home() {
    const { signOut } = useAuth();

    return (
        <View>
            <Text>You made it home!</Text>
            <MyButton onPress={signOut}>Logout</MyButton>
        </View>
    );
}