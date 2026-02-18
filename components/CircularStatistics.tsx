import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import * as Progress from "react-native-progress";

import { theme } from "../src/theme";

type Props = {
    title: string,
    passedCount: number,
    totalCount: number,
    progress: number,
    size: number,
    color: string
};

export default function CircularStatistics({ title, passedCount, totalCount, progress, size, color }: Props) {
    return (
        <View style={ styles.container }>
            <AppText style={ styles.title }>{ title }</AppText>
            <AppText>Пройдено { passedCount }/{ totalCount }</AppText>
            <Progress.Circle progress={ progress } size={ size } color={ color } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: theme.spacing.sm
    },
    title: {
        fontFamily: theme.fonts.bold
    }
});