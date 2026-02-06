import { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Lecture } from "../types";

type RootStackParamList = {
    ViewLecture: { lecture: Lecture }
}

type Props = StackScreenProps<RootStackParamList, "ViewLecture">;

export default function ViewLecture({ route, navigation }: Props) {
    const { lecture } = route.params;
    
    return (
        <View>
            <Text>Просмотр лекции</Text>
        </View>
    )
}