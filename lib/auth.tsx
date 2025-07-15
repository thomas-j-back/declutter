import { useEffect, useState, PropsWithChildren, useContext, createContext } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthError, Session, User } from '@supabase/supabase-js';


interface AuthContextType {
    email: string | null;
    session: Session | null;
    setLoading: (loading: boolean) => void,
    setSession: (session: Session | null) => void,
    loading: boolean;
    setEmail: (email: string) => void,
    signIn: (email: string, password: string) => Promise<{ data: { session: Session | null; user: User | null }; error: AuthError | null }>;
    signOut: () => Promise<AuthError | null>;
    signUp: (email: string, password: string) => Promise<{ data: { session: Session | null; user: User | null }; error: AuthError | null }>;
    resendEmailVerification: () => Promise<AuthError | null>
    checkUserConfirmation: () => Promise<Boolean | AuthError>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    const [email, setEmail] = useState('');

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
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setEmail(email);
        return { data, error }
    }

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        setEmail(email);
        return { data, error }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        return error;
    }

    /**
     * Resends Email confirmation
     * at users request while awaiting confirmation
     * @returns error
     */
    const resendEmailVerification = async () => {
        const { data, error } = await supabase.functions.invoke('resend-confirmation', { body: JSON.stringify({ email: email }) });
        if (error)
            return error;
    }

    /**
     * Checks in Intervals if user has email confirmed
     * 
     * @returns Boolean | Error
     */
    const checkUserConfirmation = async () => {
        const { data, error } = await supabase.functions.invoke('checkUserConfirmation', { body: JSON.stringify({ email: email }) });
        return data.emailConfirmedAt != null;
    }

    return (
        <AuthContext.Provider
            value={{ email, session, loading, signIn, signOut, signUp, setEmail, setLoading, setSession, resendEmailVerification, checkUserConfirmation }}>
            {children}
        </AuthContext.Provider>
    )
}