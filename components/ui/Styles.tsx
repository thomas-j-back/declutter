import { StyleSheet } from 'react-native';

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
} as const;

const properties = [
    'margin',
    'marginVertical',
    'marginHorizontal',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
] as const;

type SpacingKey = keyof typeof spacing;
type PropertyKey = typeof properties[number];
type StyleConfig = {
    [K in `${PropertyKey}-${SpacingKey}`]: {
        [P in PropertyKey]: number;
    };
};

let stylesConfig: Partial<StyleConfig> = {};

properties.forEach((property) => {
    for (let size in spacing) {
        const key = `${property}-${size}` as `${PropertyKey}-${SpacingKey}`;
        stylesConfig[key] = {
            [property]: spacing[size as SpacingKey],
        } as { [P in PropertyKey]: number };
    }
});

const styles = StyleSheet.create(stylesConfig);

export default styles;
