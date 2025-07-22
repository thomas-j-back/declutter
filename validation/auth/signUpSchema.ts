import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(10, {message: 'Password must be at least 10 characters'})
    .refine(password => password.length <= 32, {message: 'Password cannot be 32 characters or longer.'})
    .refine(password => /[A-Z]/.test(password), {message: 'Password must include at least 1 upper case letter.'})
    .refine(password => /[a-z]/.test(password), {message: 'Passsord must have at least 1 lowercase letter.'})
    .refine(password => /[0-9]/.test(password), {message: 'Password must have at least one number'})
    .refine(password => /[@!$#&*]/.test(password), {message: 'Passsword must have at least one of the following special characters, !@#$%^&*'}),
    name: z.string()
});

export const emailStepSchema = signUpSchema.pick({email: true});
export const step2Schema = signUpSchema.pick({password: true, name: true});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;