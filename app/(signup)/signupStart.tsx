import MyButton from "@/components/Button";
import styles from "@/components/ui/Styles";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import SignupStep1 from "./signUpStep1";
import { Link, router } from "expo-router";
import AuthProviderOptions from "@/components/auth/authProviderOptions";


export default function SignupStart() {
    return (
        <View >
            <SignupStep1 />
            <AuthProviderOptions />
            <Card.Content style={styles.marginVerticalmd}>
                <Link href="/(login)/loginForm" style={{ textAlign: "center" }}>
                    <Text variant="labelSmall"> Already have an account? Log in</Text>
                </Link>
            </Card.Content>
        </View>)
}