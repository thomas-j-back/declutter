import { Session } from "@supabase/supabase-js";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useContext, createContext } from "react";



//Define route protection
export default function useProtectedRoute(session: Session | null) {
    const segments = useSegments();
    const route = useRouter();
  
    useEffect(() => {
      const inAuthGroup = segments[0] === 'login';
      if (!session) {
        //force redirect to login page
        route.replace('/login');
      } //Do nothing if user is logged in and on home
    }, [session, segments]);
  }
  