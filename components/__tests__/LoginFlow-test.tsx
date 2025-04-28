import { render, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native-paper';
import LoginForm from '../login/LoginForm';
import { AuthProvider } from '@/lib/auth';

//Animated component in login form requires this
jest.useFakeTimers();


describe("LoginForm", () => {
    it('should initialize with empty email, password, and loading false', () => {

        const mockOnSwitchToSignup = jest.fn();
        const { getByLabelText } = render(<AuthProvider><LoginForm onSwitchToSignup={mockOnSwitchToSignup} /></AuthProvider>);

        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');

        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
        expect(getByLabelText('Login').props.children).not.toBeInstanceOf(ActivityIndicator);
    });
});