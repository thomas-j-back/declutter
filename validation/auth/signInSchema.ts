import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export type SignInSchemaType = z.infer<typeof signInSchema>;