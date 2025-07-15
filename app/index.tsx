import { View, Text } from "react-native";
import { useAuth } from "@/lib/auth";
import useProtectedRoute from "@/lib/useProtectedRoute";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
export default function Index() {
    const { session, loading } = useAuth();
    console.log('checking session ' + session);
    useEffect(() => {
        if (loading) {
            SplashScreen.hideAsync();
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    if (session && !session.user?.email_confirmed_at) {
        return <Redirect href="/auth/email-verification" />
    }

    if (!session) {
        return <Redirect href="/login" />
    }

    return <Redirect href="/(app)/home" />

}