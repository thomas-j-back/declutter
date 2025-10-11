import { useState } from "react";
import { Controller, Control } from 'react-hook-form';
import { View, TouchableOpacity, Platform, Modal } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

type DatePickerProps = {
    name: string,
    label?: string,
    placeholder?: string,
    control: Control<any>,
    mode?: 'date' | 'time' | 'datetime'
}

export default function DatePicker({
    name,
    label,
    placeholder,
    control,
    mode = 'date'
}: DatePickerProps) {
    const [showPicker, setShowPicker] = useState(false);
    const androidOnChange = (event: { type: string; }, selectedDate: { getTime: () => any; }) => {
        setShowPicker(false);

        // Handle the selection
        if (event.type === 'set' && selectedDate) {
            // onChange(selectedDate.getTime());
        }
    }
    const showPickerAndroid = (onChange: (...event: any[]) => void, value: string | number | Date) => {
        DateTimePickerAndroid.open({
            value: value ? new Date(value) : new Date(),
            mode: 'date',

        })
    }

    const formatDate = (date: Date) => {
        if (mode === 'time') {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (mode === 'datetime') {
            return date.toLocaleString();
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const displayValue = value ? formatDate(new Date(value)) : '';

                return (
                    <View>
                        <TouchableOpacity
                            onPress={() => showPickerAndroid(onChange, value)}
                        >
                            <TextInput
                                value={displayValue}
                                placeholder={placeholder}
                                mode="outlined"
                                editable={false}
                                error={error ? true : false}
                                style={{ borderRadius: 20 }}
                                right={<TextInput.Icon icon="calendar" />}
                            />
                        </TouchableOpacity>

                        <HelperText type="error" visible={error ? true : false}>
                            {error?.message}
                        </HelperText>
                    </View>
                )
            }}
        />
    )
}

// <DateTimePicker
//     value={value ? new Date(value) : new Date()}
//     mode={mode}
//     design="default"
//     onChange={(event, selectedDate) => {
//         setShowPicker(false);

//         // Handle the selection
//         if (event.type === 'set' && selectedDate) {
//             onChange(selectedDate.getTime());
//         }
//     }}
// />