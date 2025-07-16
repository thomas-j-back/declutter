import { TextInput, Text, HelperText } from "react-native-paper";
import MyButton from "@/components/Button";
import { Keyboard, TouchableWithoutFeedback, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from 'react';
import { Controller, Control } from 'react-hook-form';


type Props = {
    name: string;
    control: Control<any>;
    placeholder?: string;
    secureTextEntry?: boolean;
    disabled?: boolean;
};

export function FormTextInput({ name, control, placeholder, secureTextEntry, disabled }: Props) {
    const [viewSecure, setViewSecure] = useState<boolean | undefined>(false);


    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ position: "relative" }}>
                            <TextInput

                                placeholder={placeholder}
                                value={value}
                                mode="outlined"
                                secureTextEntry={secureTextEntry ? !viewSecure : undefined}
                                autoCapitalize="none"        // disables auto-capitalization
                                autoCorrect={!secureTextEntry}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={error ? true : false}
                                style={{ borderRadius: 20 }}
                                disabled={disabled}
                            />
                            {secureTextEntry ? <TouchableOpacity onPress={() => { setViewSecure(!viewSecure) }} style={{ position: 'absolute', right: 0, top: 10 }}>
                                <MyButton icon={viewSecure ? "eye-off" : "eye-outline"}> </MyButton>
                            </TouchableOpacity> : null}
                            <HelperText type="error" visible={error ? true : false}>
                                {error?.message}
                            </HelperText>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }}
        />);


}
