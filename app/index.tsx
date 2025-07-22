import { View, Text } from "react-native";
import { useAuth } from "@/lib/auth";
import useProtectedRoute from "@/lib/useProtectedRoute";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
export default function Index() {
    const { session, loading } = useAuth();

    useEffect(() => {
        debugger;
        if (loading) {
            SplashScreen.hideAsync();
        }
    }, [loading]);
    console.log(session)

    if (loading) {
        return null;
    }

    if (session && !session.user?.email_confirmed_at) {
        return <Redirect href="/auth/email-verification" />
    }

    if (!session) {
        return <Redirect href="/(signup)/signupStart" />
    }

    return <Redirect href="/(app)/home" />

}