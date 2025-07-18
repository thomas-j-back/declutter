import { emailStepSchema } from '@/validation/auth/signUpSchema';
import { useState, createContext, PropsWithChildren, useContext } from 'react'
import { z } from "zod";

interface SignupFormType {
    email?: string,
    password?: string,
    first_name?: string
}

const SignUpFormContext = createContext<{
    signupFormData: SignupFormType,
    setFormData: (data: Partial<SignupFormType>) => void
}>({
    signupFormData: {},
    setFormData: () => { }
});

export function useSignUpForm() {
    const value = useContext(SignUpFormContext);
    if (!value) {
        throw new Error('useSignUpForm must be used inside of a provider.')
    }
    return value;
}

export default function SignUpFormProvider({ children }: PropsWithChildren) {
    const [signupFormData, setsignupFormData] = useState({});
    const setFormData = (data: Partial<SignupFormType>) => {
        setsignupFormData(prev => ({ ...prev, ...data }))
    }
    return <SignUpFormContext.Provider
        value={{ signupFormData, setFormData }}
    >{children}</SignUpFormContext.Provider>
}
