import { SQLiteDatabase } from "expo-sqlite";
import { useAuth } from "@/lib/auth";
import { Task, TaskAction, TaskLocation } from "@/constants/types/TaskType";

interface TaskParams {
    task_id?: string,
    title: string,
    task_location: string,
    user_id?: string,
    status?: string
}

export default class TaskService {
    constructor(private db: SQLiteDatabase) {
       
    }

    async insert(params: TaskParams) {
        try {
            const insertResult = await this.db.runAsync(
                'INSERT INTO Task (title, task_location) VALUES (?,?);',
                [params.title, params.task_location]
            );
            const {session} = useAuth();
            if(session) {
                const userTaskMapInsert = await this.db.runAsync(
                    'INSERT INTO TaskToUser (user_id, task_id) VALUES (?,?)',
                    [session.user.id, insertResult.lastInsertRowId]
                )
            } else {
                throw new Error('No session from auth, user must be logged in to interact with db.')
            }
         
        } catch(e) {
            this._throwError(e);
        }
    }

    async update(task_id: string, status: string) {
        if(!task_id || !status) {
            console.error('Task id & status required for update.')
        }
        try {
            this.db.runAsync(
                'UPDATE Task set status = ? WHERE id = ?',
                [status, task_id]
            )
        } catch(e) {
            this._throwError(e)
        }
    }

    async get(params: TaskParams) {
        try {
            return this.db.runAsync(
                'INSERT INTO Task (title, task_location) VALUES (?,?);',
                [params.title, params.task_location]
            )
        } catch(e) {
            this._throwError(e)
        }
    }

    async getAllPending(): Promise<Array<Task>> {
        let tasks: Task[] = [];
        try {
            tasks = await this.db.getAllAsync<Task>("SELECT * FROM Task WHERE status = pending;");
        } catch(e) {
            this._throwError(e)
        }
        return tasks;
    }

    async getActions(): Promise<Array<TaskAction>> {
        let actions: TaskAction[] = [];
        try {
            actions = await this.db.getAllAsync<TaskAction>("SELECT  * FROM Action ORDER BY order")
        } catch(e) {
            this._throwError(e);
        }
        return actions;
    }

    async getLocations(): Promise<Array<TaskLocation>> {
        let locations: TaskLocation[] = [];
        try {
            locations = await this.db.getAllAsync<TaskLocation>(
                "SELECT  * FROM TaskLocation ORDER BY order"
            )
        } catch(e) {
            this._throwError(e);
        }
        return locations;
    }

    _throwError(e) {
        throw new Error(e);
    }
}