import * as React from 'react';
import { Button } from 'react-native-paper';
import { ButtonProps } from 'react-native-paper';

export default function MyButton({ ...props }: ButtonProps) {
    return (
        <Button {...props} >
            {props.children}
        </Button>
    )
}