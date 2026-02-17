import { useLayoutEffect, useEffect, useState } from "react";
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

    const [ haveRead, setHaveRead ] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: lecture.title
        });
    }, [navigation, lecture.title]);

    useEffect(() => {
        if (!user || !haveRead) return;

        const updateUser = async () => {
            await updateDoc(doc(db, "users", user.uid), {
                passedLectures: arrayUnion(lecture.id)
            });
        };

        updateUser();
    }, [haveRead, user, lecture.id]);
    
    return (
        <View style={ styles.main }>
            <ScrollView
                style={ styles.lecture }
                showsVerticalScrollIndicator={ false }
                onScroll={({ nativeEvent }) => {
                    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

                    const isEndReached = 
                        layoutMeasurement.height + contentOffset.y >=
                        contentSize.height - 20;
                    
                    if (isEndReached) {
                        if (!haveRead) {
                            setHaveRead(true);
                        }
                    }
                }}
                scrollEventThrottle={16} >
                <Markdown>{ lecture.content }</Markdown>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: theme.spacing.md
    },
    lecture: {
        backgroundColor: theme.colors.bgLight,

        padding: theme.spacing.md
    }
});