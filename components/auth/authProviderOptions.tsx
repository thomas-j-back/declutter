import { Card, Text } from "react-native-paper"
import MyButton from "../Button"
import styles from "../ui/Styles"
import { router } from "expo-router"
export default function AuthProviderOptions() {
    return (
        <Card.Content >
            <Text style={{ textAlign: 'center', ...styles.marginBottomlg }} variant="labelLarge">----------    or    ----------</Text>
            <MyButton onPress={() => { router.navigate('(signup)/(one_auth)/google') }} icon="google" mode="outlined" style={{ ...styles.marginVerticalsm }} > Continue with Google </MyButton>
            <MyButton icon="apple" mode="outlined" style={styles.marginVerticalsm} onPress={() => { router.navigate('(signup)/(one_auth)/apple') }}> Continue with Apple </MyButton>
        </Card.Content>
    )
}