import { Slot } from 'expo-router'
import SignUpFormProvider from './signupContext'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import styles from '@/components/ui/Styles'
//make a form context object

export default function SignupPage() {
    return (
        <Card style={[styles.paddingmd, { flex: 1, justifyContent: 'center' }]}>
            <Card.Title titleVariant="headlineMedium" title="Welcome to Tidy Home" subtitle="Sign up to begin tidying up" />
            <SignUpFormProvider>
                <Slot />
            </SignUpFormProvider>
        </Card>

    )
}

