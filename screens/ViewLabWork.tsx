import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { LabWorksStackParamList } from "../src/navigation/types";

import { theme } from "../src/theme";

type Props = StackScreenProps<LabWorksStackParamList, "ViewLabWork">;

export default function ViewLabWork({ route, navigation }: Props) {
    const { labWork } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: labWork.title
        });
    }, [navigation, labWork.title]);

    return (
        <View style={ styles.main }>
            
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: theme.spacing.md
    }
});