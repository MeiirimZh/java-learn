import { useLayoutEffect } from "react";
import { View, Text } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { LecturesStackParamList } from "../src/navigation/types";

type Props = StackScreenProps<LecturesStackParamList, "ViewLecture">;

export default function ViewLecture({ route, navigation }: Props) {
    const { lecture } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: lecture.title
        });
    }, [navigation, lecture.title]);
    
    return (
        <View>
            <Text>{ lecture.content }</Text>
        </View>
    )
}