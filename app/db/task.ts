import { SQLiteDatabase } from 'expo-sqlite';
import getDb from './db'

//Create the tasks table
export default async function createTaskTable(db: SQLiteDatabase) {



    try {
        /**
     * CREATE TASK LOCATION TABLE
     */
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS TaskLocation (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                -- either 1 or 0
                user_managed INTEGER DEFAULT 0
            );
            `);
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS Actions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL
            )`)

            /**
             * CREATE TASK TABLE
             */
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS Task (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    task_location INTEGER NOT NULL,
                    description TEXT,
                    action INTEGER,
                    start_date_time INTEGER,
                    estimated_minutes INTEGER,
                    status TEXT,
                    completed_on INTEGER,
                    FOREIGN KEY (task_location) REFERENCES TaskLocation (id) ON DELETE CASCADE
                    FOREIGN KEY (action) REFERENCES Actions (id)
                )
            `);

            /** SUBTASK TABLE
             */
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS Subtask (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    task_id INTEGER NOT NULL,
                    title TEXT NOT NULL,
                    FOREIGN KEY (task_id) REFERENCES Task (id) ON DELETE CASCADE
                )
            `);

            /**
             * USER TO TASK m2m
             */
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS UserToTask (
                    user_id INTEGER NOT NULL,--this is the user id of the auth db, on supabase
                    task_id INTEGER NOT NULL,
                    FOREIGN KEY (task_id) REFERENCES Task (id) ON DELETE CASCADE
                )`)
    } catch(e) {
        console.error(e);
    }
}