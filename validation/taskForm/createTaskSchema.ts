import { z } from 'zod';


export const taskCreateSchema = z.object({
    title: z.string({message: 'You must give your task a title.'}).min(5, {message:'Your title is too short!'}).max(50),
    description: z.string().optional(),
    // location: z.string(),
    // action: z.number(),
    // start_date_time: z.number().optional()
});

export type TaskCreateSchema = z.infer<typeof taskCreateSchema>