import {SQLiteDatabase} from 'react-native-sqlite-storage'

//Create the tasks table
export const createTaskTable = async (db: SQLiteDatabase) => {

    const taskLocationCreateQuery = `
    CREATE TABLE IF NOT EXISTS TaskLocation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        -- either 1 or 0
        user_managed INTEGER DEFAULT 0
    );
    `;
    // const taskStatus
    const taskTableCreateQuery = `
        CREATE TABLE IF NOT EXISTS Task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            task_location INTEGER NOT NULL,
            description TEXT,
            start_date_time INTEGER,
            estimated_minutes INTEGER,
            status TEXT,
            completed_on INTEGER,
            FOREIGN KEY (task_location) REFERENCES TaskLocation (id) ON DELETE CASCADE
        )
    `;

    const subtaskCreateQuery = `
        CREATE TABLE IF NOT EXISTS Subtask (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            FOREIGN KEY (task_id) REFERENCES Task (id) ON DELETE CASCADE
        )
    `;

    try {
        await db.executeSql(taskLocationCreateQuery);
        await db.executeSql(taskTableCreateQuery);
        await db.executeSql(subtaskCreateQuery);
    } catch (error) {
        console.error(error);
        throw Error('Failed to create task tables. Admin please check.')
    }
    
}