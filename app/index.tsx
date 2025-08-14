import { View, Text } from "react-native";
import { useAuth } from "@/lib/auth";
import useProtectedRoute from "@/lib/useProtectedRoute";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { connectToDatabase } from "./db/db";
import { createTaskTable } from "./db/task";

export default function Index() {
    const { session, loading, checkUserConfirmation } = useAuth();


    const loadData = useCallback(async () => {
        try {
            const db = await connectToDatabase();
            await createTaskTable(db)
        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        if (loading) {
            SplashScreen.hideAsync();
        }
        loadData();

    }, [loading, loadData]);

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