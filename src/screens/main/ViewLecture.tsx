import { useLayoutEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";

import { StackScreenProps } from "@react-navigation/stack";
import { LecturesStackParamList } from "../../navigation/types";

import { theme } from "../../theme";

type Props = StackScreenProps<LecturesStackParamList, "ViewLecture">;

export default function ViewLecture({ route, navigation }: Props) {
    const { lecture } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: lecture.title
        });
    }, [navigation, lecture.title]);
    
    return (
        <View style={ styles.main }>
            <ScrollView
                showsVerticalScrollIndicator={ false }>
                <Markdown>{ lecture.content }</Markdown>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: theme.spacing.md
    }
});