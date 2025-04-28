import { useEffect, useState, PropsWithChildren, useContext, createContext } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthError, Session, User } from '@supabase/supabase-js';

const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error }
}

const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    return { data, error }
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return error;
}

const AuthContext = createContext<{
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ data: { session: Session | null; user: User | null }; error: AuthError | null }>;
    signOut: () => Promise<AuthError | null>;
    signUp: (email: string, password: string) => Promise<{ data: { session: Session | null; user: User | null }; error: AuthError | null }>;
}>({
    session: null,
    loading: false,
    signIn,
    signOut,
    signUp
});

export function useAuth() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth must be used within a SessionProvider');
    }

    return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
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
    //This uses our getAuth hook to get session,
    //and wraps thsi in our root component
    return (
        <AuthContext.Provider
            value={{ session, loading, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}