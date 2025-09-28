import { TaskAction } from "@/constants/types/TaskType"
import { useState } from "react";
import { Controller, Control } from 'react-hook-form';
import { View, TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

type Option = { label: string, value: string }

type DropDownProps = {
    name: string,
    options: Option[],
    label?: string,
    placeholder?: string,
    control: Control<any>
}

export default function DropDown({ name, options, label, placeholder, control }: DropDownProps) {
    const [visible, setVisible] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const selectedOption = options.find(option => option.value === value);

                return (
                    <View>
                        <TouchableOpacity
                            onPress={() => setVisible(true)}
                        >
                            <TextInput
                                value={selectedOption?.label || ''}
                                placeholder={placeholder}
                                mode="outlined"
                                editable={false}
                                error={error ? true : false}
                                style={{ borderRadius: 20 }}
                                right={<TextInput.Icon icon="chevron-down" />}
                            />
                        </TouchableOpacity>

                        <HelperText type="error" visible={error ? true : false}>
                            {error?.message}
                        </HelperText>

                        <Modal
                            visible={visible}
                            transparent={true}
                            animationType="fade"
                            onRequestClose={() => setVisible(false)}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                activeOpacity={1}
                                onPress={() => setVisible(false)}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        padding: 20,
                                        width: '80%',
                                        maxHeight: '60%'
                                    }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
                                        {label || 'Select an option'}
                                    </Text>

                                    <FlatList
                                        data={options}
                                        keyExtractor={(item) => item.value}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={{
                                                    padding: 15,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#eee'
                                                }}
                                                onPress={() => {
                                                    onChange(item.value);
                                                    setVisible(false);
                                                }}
                                            >
                                                <Text style={{ fontSize: 16 }}>
                                                    {item.label}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                )
            }}
        />
    )
}