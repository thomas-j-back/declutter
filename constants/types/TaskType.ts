
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
    start_date_time: number,
    estimated_time: number,
    status: string
}

export type TaskAction = {
    id: number,
    name: string,
    order: number
}



