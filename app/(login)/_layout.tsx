//This will handle the navigation to the login steps,

import styles from "@/components/ui/Styles";
import { Slot } from "expo-router";
import { Card } from "react-native-paper";

export default function LoginPage() {
    return (
        <Card style={[styles.paddingmd, { flex: 1, justifyContent: 'center' }]}>
            <Card.Title titleVariant="headlineMedium" title="Welcome Back" subtitle="Sign in to get back to organizing" />
            <Slot />

        </Card>
    )
}