import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, Control } from 'react-hook-form';
import MyButton from "../Button";
import styles from "../ui/Styles";


type PickerMode = 'date' | 'time';
type DatePickerProps = {
    name: string,
    label?: string,
    value?: number,
    mode: PickerMode,
    control: Control<any>
}

export default function DatePickerCustom({
    name,
    label,
    value,
    mode,
    control
}: DatePickerProps) {

    //Get unix date values
    const [time, setTime] = useState<number | undefined>(value);

    const openAndroidPicker = (value: number, onChangeForm: (value: number) => void) => {
        DateTimePickerAndroid.open({
            value: value ? new Date(value) : new Date(),
            mode: mode,
            is24Hour: true,
            onChange: (event, selectedDate?: Date) => {
                if (event.type === 'set' && selectedDate) {
                    const timeStamp = selectedDate.getTime();
                    setTime(timeStamp);
                    onChangeForm(timeStamp);
                }
            }
        });
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <MyButton
                    mode="elevated"
                    onPress={() => openAndroidPicker(value, onChange)}
                    style={styles.marginBottomsm}
                >
                    {
                        (mode === "time"
                            ? time
                                ? new Date(time).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "Select Time"
                            : time
                                ? new Date(time).toLocaleDateString()
                                : "Select Date")}
                </MyButton>
            )}
        >

        </Controller>

    )
}