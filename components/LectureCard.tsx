import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import AppText from "./AppText";

import { theme } from "../src/theme";
import { Ionicons } from "@expo/vector-icons";

import HarvardIcon from "../assets/svg/HarvardIcon";
import LogoIcon from "../assets/svg/LogoIcon";

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
    const { width } = useWindowDimensions();
    const levelAndNumber = `${level} уровень, ${number} лекция`;

    const courseIcon = () => {
        if (course_title === "JAVA 25 SELF") {
            return (
                <LogoIcon width={ 50 } height={ 50 } />
            )
        }
        else if (course_title === "Harvard CS50") {
            return (
                <HarvardIcon width={ 50 } height={ 50 } />
            )
        }
    };

    const completedIcon = () => {
        if (isCompleted) {
            return (
                <Ionicons 
                    style={{ position: 'absolute', right: -8, top: -8 }}
                    name="checkmark-circle"
                    color="green"
                    size={ 16 } />
            )
        }
    };

    return (
        <View style={ {width: width - theme.spacing.md * 2, padding: theme.spacing.sm} } >
            <TouchableOpacity style={ styles.main } onPress={ onPress } >
                <View style={ styles.header } >
                    <AppText numberOfLines={ 2 } style={ [styles.titleText, {width: width - theme.spacing.md * 6 - 50}] } >
                        { title }
                    </AppText>

                    <View style={{ position: 'relative' }}>
                        { courseIcon() }
                        { completedIcon() }
                    </View>
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
        gap: theme.spacing.md,

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