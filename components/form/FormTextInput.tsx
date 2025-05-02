import { TextInput, Text, HelperText } from "react-native-paper";
import { View } from "react-native";
import { Controller, Control } from 'react-hook-form';


type Props = {
    name: string;
    control: Control<any>;
    placeholder?: string;
    secureTextEntry?: boolean;
};

export function FormTextInput({ name, control, placeholder, secureTextEntry }: Props) {

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                    <View>
                        <TextInput
                            placeholder={placeholder}
                            value={value}
                            mode="outlined"
                            secureTextEntry={secureTextEntry}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={error ? true : false}
                            style={{ borderRadius: 20 }}
                        />
                        <HelperText type="error" visible={error ? true : false}>
                            {error?.message}
                        </HelperText>
                    </View>
                );
            }}
        />);


}
