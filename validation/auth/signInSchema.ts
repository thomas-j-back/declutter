import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email({message: 'Invalid email address.'}),
    password: z.string()
});

export type SignInSchemaType = z.infer<typeof signInSchema>;