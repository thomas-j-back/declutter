import { z } from 'zod';

export const passwordValidations = {
    minLength : {
        label: 'Must be at least 10 characters',
        test: (val: string) => val.length >= 10,
    },
    maxLength: {
        label:'Cannot be 32 characters or longer.',
        test: (val: string) => val.length <= 32,
    },
    specialChars: {
        label:'Must have at least one of the following special characters, !@#$%^&*',
        test: (val: string) => /[@!$#&*]/.test(val)
    },
    capitalization: {
        label:'Must include at least 1 upper case letter.',
        test: (val: string) => /[A-Z]/.test(val),
    },
    number: {
        label :'Must have at least 1 number',
        test: (val: string) => /[0-9]/.test(val)
    },
    lowerChars: {
        label:'Must have at least 1 lowercase letter.',
        test: (val: string) => /[a-z]/.test(val), 
    }
};
//Add validations to zod (I want to reuse these functions in the UI for password input)
let password = z.string();
for (const [key, value] of Object.entries(passwordValidations) ) {
     password.refine(value.test)
}

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(10)
    .refine(password => password.length <= 32)
    .refine(password => /[A-Z]/.test(password))
    .refine(password => /[a-z]/.test(password))
    .refine(password => /[0-9]/.test(password))
    .refine(password => /[@!$#&*]/.test(password)),
    name: z.string()
});

export const emailStepSchema = signUpSchema.pick({email: true});
export const step2Schema = signUpSchema.pick({password: true, name: true});

export type SignUpSchemaType = z.infer<typeof signUpSchema>; 