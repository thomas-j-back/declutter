import { View, Text } from "react-native";
import { useAuth } from "@/lib/auth";
import useProtectedRoute from "@/lib/useProtectedRoute";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
export default function Index() {
    const { session, loading, checkUserConfirmation } = useAuth();

    useEffect(() => {
        if (loading) {
            SplashScreen.hideAsync();
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    if (session && !session.user?.email_confirmed_at) {
        return <Redirect href="/auth/emailVerification" />
    }

    if (!session) {
        return <Redirect href="/(signup)/signupStart" />
    }

    return <Redirect href="/(app)/home" />

}