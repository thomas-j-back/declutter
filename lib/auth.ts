import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { Session } from '@supabase/supabase-js';

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
    
    return {session, loading} //These variables will be made available to hooked component
}