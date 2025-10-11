import { z } from 'zod';

export const taskCreateSchema = z.object({
    title: z.string().optional(), // Auto-generated from action + location
    description: z.string().optional(),
    location: z.string().min(1, "Location is required"), // Form stores as string, converted to int in submission
    action: z.string().min(1, "Action is required"), // Form stores as string, converted to int in submission
    start_date: z.number().min(1, "Start date is required"), // Unix timestamp
    start_time: z.number().min(1, "Start time is required."),
    repeat: z.boolean().optional(),
});

export type TaskCreateSchema = z.infer<typeof taskCreateSchema>
