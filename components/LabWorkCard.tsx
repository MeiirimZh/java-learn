import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import AppText from "./AppText";

import { theme } from "../src/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    title: string;
    isCompleted: boolean;
    onPress: () => void;
};

export default function LabWorkCard({ title, isCompleted, onPress }: Props) {
    const {width, height} = useWindowDimensions();

    return (
        <View style={ {width: width - theme.spacing.md * 2, padding: theme.spacing.sm} } >
            <TouchableOpacity style={ styles.main } onPress={ onPress } >
                <View style={ styles.header } >
                    <AppText numberOfLines={ 3 } style={ [styles.titleText, {width: width - theme.spacing.md * 5 - 24}] } >
                        { title }
                    </AppText>

                    {isCompleted && <Ionicons name="checkmark-circle" size={ 24 } color='green' /> }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: theme.colors.bgLight,

        borderRadius: 10,

        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        padding: theme.spacing.md
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        height: 48,

        marginBottom: theme.spacing.sm
    },

    titleText: {
        fontFamily: theme.fonts.bold
    }
});