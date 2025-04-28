import { render, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native-paper';
import LoginForm from '../login/LoginForm';

jest.mock('@/lib/supabase', () => ({
    supabase: {
        auth: {

        },
    },
}));


describe("LoginForm", () => {
    it('should initialize with empty email, password, and loading false', () => {

        const mockOnSwitchToSignup = jest.fn();
        const { getByLabelText } = render(<LoginForm onSwitchToSignup={mockOnSwitchToSignup} />);

        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');

        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('');
        expect(getByLabelText('Login').props.children).not.toBeInstanceOf(ActivityIndicator);
    });
});