import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export default async function getDb() {
    if(!db) {
        db = await SQLite.openDatabaseAsync('tidyUpLocal.db')
    }
    return db;
}


