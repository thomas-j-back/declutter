import { SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState, PropsWithChildren, useContext, createContext, useRef } from 'react';
import getDb from './db'
import TaskService from './services/taskService'
import createTaskTable from "./task";

interface DbContextType {
    db: SQLiteDatabase | null,
    taskService: TaskService | undefined,
    ready: boolean
};


const DBContext = createContext<DbContextType | undefined>(undefined);


export function useDB() {
    const db = useContext(DBContext);
    if (!db) {
        throw new Error('Could not retrieve DB from context, please ensure provider wrapped.');
    }
    return db;
}


export default function DBProvider({ children }: PropsWithChildren) {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [taskService, setTaskService] = useState<TaskService>();
    const initRef = useRef(false);
    //For signaling to loaders db is ready to be queried
    const [ready, setReady] = useState(false);


    useEffect(() => {
        if (initRef.current) return; // prevent second run
        initRef.current = true;
        (async () => {
            const db = await getDb();
            setDb(db);
            //Create tables
            await createTaskTable(db);
            setTaskService(new TaskService(db));
            setReady(true);

        })();
    })
    return <DBContext.Provider value={{ db, taskService, ready }}>{children}</DBContext.Provider>
}