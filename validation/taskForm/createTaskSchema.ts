import { z } from 'zod';


export const taskCreateStep1Schema = z.object({
    title: z.string({message: 'You must give your task a title.'}).min(5, {message:'Your title is too short!'}).max(50),
    description: z.string().optional(),
    location: z.string(),
    action: z.number(),
    // start_date_time: z.number().optional()
});

export const taskCreateStep2Schema = z.object({
    start_date_time: z.number(),
    repeat: z.boolean(),
    repeat_interval: z.number().optional(),
    repeat_interval_unit: z.string().optional(),
    repeat_interval_count: z.number().optional(),
});

export type TaskCreateStep1Schema = z.infer<typeof taskCreateStep1Schema>
export type TaskCreateStep2Schema = z.infer<typeof taskCreateStep2Schema>