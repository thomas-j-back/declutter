import { render, fireEvent } from '@testing-library/react-native';
import MyButton from '../Button';

describe('MyButton', () => {
    it('renders correctly with given props', () => {
        const { getByText } = render(<MyButton>Test Button</MyButton>);
        expect(getByText('Test Button')).toBeDefined();
    });
    it('runs on press when pressed', () => {
        const onPress = jest.fn();
        const { getByText } = render(<MyButton onPress={onPress} >TestButton</MyButton>);
        fireEvent.press(getByText('TestButton'));
        expect(onPress).toHaveBeenCalled();
    })
});

