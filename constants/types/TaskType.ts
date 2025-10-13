
export type TaskLocation = {
    id: number,
    name: string
}

export type Task = {
    id: number,
    title: string,
    task_location: TaskLocation,
    description: string,
    action: number,
    start_time: number,
    start_date: number, 
    estimated_time: number,
    status: string
}

export type TaskAction = {
    id: number,
    name: string,
    order: number
}



