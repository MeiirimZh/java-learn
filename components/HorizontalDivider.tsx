import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

import { theme } from "../src/theme";

type Props = {
    style?: StyleProp<ViewStyle>;
};

export default function HorizontalDivider({ style }: Props) {
    return (
        <View
            style={[
                {
                    alignSelf: 'center',
                    
                    backgroundColor: theme.colors.border,

                    height: StyleSheet.hairlineWidth
                },
                style 
            ]} />
    )
}