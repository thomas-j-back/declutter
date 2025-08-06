import { renderHook, act, waitFor, render, fireEvent } from '@testing-library/react-native';
import { FormTextInput } from '../FormTextInput';
import { Control, useForm } from 'react-hook-form';

/**
 * FORM TEXT COMPONENT
 * This is a custom component that is used to render a text input field with the react-hook-form library.
 * It is used to test the form text input component.
 * 
 * 
 * 
 * 
 * 
 */
describe('FormTextInput', () => {

    type wrapProps = {
        secureTextEntry?: boolean
    }

    function TextInputWrapper({ secureTextEntry }: wrapProps) {
        const { control } = useForm({ defaultValues: { username: '' } });
        return <FormTextInput name="username" control={control} placeholder="enter username" maxLength={100} secureTextEntry={secureTextEntry} />;
    }

    it('should render', async () => {
        const { getByPlaceholderText } = render(<TextInputWrapper />);
        await waitFor(() => {
            expect(getByPlaceholderText('enter username')).toBeTruthy();
        });
    });


    it('should hide text when secureTextEntry is true', async () => {
        const { getByPlaceholderText } = render(<TextInputWrapper secureTextEntry={true} />);
        await waitFor(() => {
            expect(getByPlaceholderText('enter username').props.secureTextEntry).toBeTruthy();
        });
    });

    it('should toggle secureTextEntry to false when eye icon is pressed once', async () => {
        const { getByPlaceholderText, getByTestId } = render(<TextInputWrapper secureTextEntry={true} />);
        act(() => {
            fireEvent.press(getByTestId('eye-icon'));
        });
        await waitFor(() => {
            expect(getByPlaceholderText('enter username').props.secureTextEntry).toBe(false);
        });
    });

    it('it should toggle secureTextEntry to true when eye icon is pressed twice', async () => {
        const { getByPlaceholderText, getByTestId } = render(<TextInputWrapper secureTextEntry={true} />);
        act(() => {
            fireEvent.press(getByTestId('eye-icon'));
        });

        act(() => {
            fireEvent.press(getByTestId('eye-icon'));
        });
        await waitFor(() => {
            expect(getByPlaceholderText('enter username').props.secureTextEntry).toBe(true);
        });
    })

    it('it should not render the eye icon when secureTextEntry is false on first render', async () => {
        const { queryByTestId } = render(<TextInputWrapper />);
        await waitFor(() => {
            expect(queryByTestId('eye-icon')).not.toBeTruthy();
        });
    });

    it('it should render the eye icon when secureTextEntry is true on first render', async () => {
        const { getByTestId } = render(<TextInputWrapper secureTextEntry={true} />);
        await waitFor(() => {
            expect(getByTestId('eye-icon')).toBeTruthy();
        });
    });


});

