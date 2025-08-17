import { SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState, PropsWithChildren, useContext, createContext } from 'react';
import getDb from './db'


interface DbContextType {
    db: SQLiteDatabase | null
};


const DBContext = createContext<DbContextType | undefined>(undefined);


export function useDB() {
    const db = useContext(DBContext):
    if (!db) {
        throw new Error('Could not retrieve DB from context, please ensure provider wrapped.');
    }
    return db;
}


export function DBProvider({ children }: PropsWithChildren) {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);

    useEffect(() => {
        (async () => {
            const db = await getDb();
            setDb(db);
        })();
    })
    return <DBContext.Provider value={{ db }}>{children}</DBContext.Provider>
}