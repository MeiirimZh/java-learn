import { useLayoutEffect, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Markdown from "react-native-markdown-display";

import { StackScreenProps } from "@react-navigation/stack";
import { LecturesStackParamList } from "../../navigation/types";

import { theme } from "../../theme";

import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";

type Props = StackScreenProps<LecturesStackParamList, "ViewLecture">;

export default function ViewLecture({ route, navigation }: Props) {
    const { lecture } = route.params;
    const { user } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: lecture.title
        });
    }, [navigation, lecture.title]);

    useEffect(() => {
        if (!user) return;

        const updateUser = async () => {
            await updateDoc(doc(db, "users", user.uid), {
                passedLectures: arrayUnion(lecture.id)
            });
        };

        updateUser();
    }, [user, lecture.id]);
    
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