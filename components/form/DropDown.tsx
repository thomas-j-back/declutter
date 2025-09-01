import { TaskAction } from "@/constants/types/TaskType"
import { Controller, Control } from 'react-hook-form';
import { View, TouchableOpacity } from "react-native";

type Option = { label: string, value: string }

type DropDownProps = {
    name: string,
    options: Option[],
    label?: string,
    placeholder?: string,
    control: Control<any>


}
export default function DropDown({ name, options, label, placeholder, control }: DropDownProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={() => {
                return (
                    <View>
                        <TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                )
            }}>
        </Controller>
    )
}