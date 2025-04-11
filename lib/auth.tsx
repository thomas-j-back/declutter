import { useEffect, useState, PropsWithChildren, useContext, createContext } from 'react';
import { supabase } from './supabase';
import { Session } from '@supabase/supabase-js';

const AuthContext = createContext<{
    session: Session | null;
    loading: boolean;
}>({
    session: null,
    loading: false,
});

export function useSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return value;
}

export function useAuth() {
    const [session, setSession] = useState<Session | null>(null); //First object is the state, second is the function to update the state
    const [loading, setLoading] = useState(true);


    useEffect(() => {//this runs when the component mounts
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        }
        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        //This runs when comoinent unmmounts
        return () => {
            subscription.unsubscribe();
        };
    }, []);// Empty array means this effect runs only on mount/unmount

    return { session, loading } //These variables will be made available to hooked component
}

export function SessionProvider({ children }: PropsWithChildren) {
    const { session, loading } = useAuth();
    //This uses our getAuth hook to get session,
    //and wraps thsi in our root component
    return (
        <AuthContext.Provider
            value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    )
}