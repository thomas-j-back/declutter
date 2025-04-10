import { View, Text } from "react-native";
import { useAuth, useSession } from "@/lib/auth";
import useProtectedRoute from "@/lib/useProtectedRoute";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
export default function Home() {
    const { session, loading } = useSession();

    useEffect(() => {
        if (loading) {
            SplashScreen.hideAsync();
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    if (!session) {
        return <Redirect href="/login" />
    }

    return (
        <Stack />
    )
}