import { useState, useEffect } from "react";

import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import LectureCard from "../../../components/LectureCard";

import useLectures from "../../hooks/useLectures";
import useCourses from "../../hooks/useCourses";

import { StackScreenProps } from "@react-navigation/stack";
import { LecturesStackParamList } from "../../navigation/types";

import { theme } from "../../theme";

import { useAuth } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

type Props = StackScreenProps<LecturesStackParamList, "LecturesList">;

export default function LecturesList({ navigation }: Props) {
    const { lectures } = useLectures();
    const { courses } = useCourses();

    const [ passedLectures, setPassedLectures ] = useState<number[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(
            doc(db, "users", user.uid),
            (docSnap) => {
                if (docSnap.exists()) {
                    setPassedLectures(docSnap.data().passedLectures ?? []);
                }
                setLoading(false);
            }
        );

        return unsubscribe;
    }, [user]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={ theme.colors.primary } />
            </View>
        )
    }

    return (
        <View style={ styles.main }>
            <FlatList
            data={ lectures }
            renderItem={({item}) => {
                const course = courses.find(
        		    (course) => course.id === item.course_id
        	    );
        	    const course_title = course ? course.title : "Без курса";

                return (
                    <LectureCard
                        title={ item.title } 
                        isCompleted={ passedLectures.includes(item.id) }
                        course_title={ course_title }
                        level={ item.level }
                        number={ item.number }
                        description={ item.description.replace(/\s*\n\s*/g, " ").trim() }
                        onPress={() => navigation.navigate("ViewLecture", { lecture: item })} />
                )
            }}
            showsVerticalScrollIndicator={ false }
            ItemSeparatorComponent={() => (
                <View style={{ height: theme.spacing.md }} />
            )} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: theme.spacing.md
    }
});