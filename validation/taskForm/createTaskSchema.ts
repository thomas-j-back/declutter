import { z } from 'zod';

export const taskCreateSchema = z.object({
    title: z.string().optional(), // Auto-generated from action + location
    description: z.string().optional(),
    location: z.string().min(1, "Location is required"), // Form stores as string, converted to int in submission
    action: z.string().min(1, "Action is required"), // Form stores as string, converted to int in submission
    start_date_time: z.number().min(1, "Date and time is required"), // Unix timestamp
    repeat: z.boolean().optional(),
});

export type TaskCreateSchema = z.infer<typeof taskCreateSchema>
