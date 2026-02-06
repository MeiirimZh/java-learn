import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import AppText from "./AppText";

import { theme } from "../src/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    title: string;
    isCompleted: boolean;
    course_title: string;
    level: number;
    number: number
    description: string;
    onPress: () => void;
};

export default function LectureCard({ title, isCompleted, course_title, level, number, description, onPress }: Props) {
    const {width, height} = useWindowDimensions();
    const levelAndNumber = `${level} уровень, ${number} лекция`;

    return (
        <View style={ {width: width - theme.spacing.md * 2, padding: theme.spacing.sm} } >
            <TouchableOpacity style={ styles.main } onPress={ onPress } >
                <View style={ styles.header } >
                    <AppText numberOfLines={ 2 } style={ [styles.titleText, {width: width - theme.spacing.md * 5 - 24}] } >
                        { title }
                    </AppText>

                    {isCompleted && <Ionicons name="checkmark-circle" size={ 24 } color='green' /> }
                </View>

                <View style={ styles.details } >
                    <AppText style={ styles.detailsText } numberOfLines={ 1 } >{ course_title }</AppText>
                    <AppText style={ styles.detailsText } numberOfLines={ 1 } >{ levelAndNumber }</AppText>
                </View>

                <View>
                    <AppText style={ styles.descText } numberOfLines={ 7 } >{ description }</AppText>
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

        marginBottom: theme.spacing.sm
    },
    details: {
        marginBottom: theme.spacing.sm
    },

    titleText: {
        fontFamily: theme.fonts.bold
    },
    detailsText: {
        color: theme.colors.textMuted
    },
    descText: {
        fontSize: 12
    }
});