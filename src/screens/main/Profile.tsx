import { useState, useEffect } from "react";

import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import AppText from "../../../components/AppText";

import { theme } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import useLectures from "../../hooks/useLectures";
import useLabWorks from "../../hooks/useLabWorks";
import useTests from "../../hooks/useTests";

import CircularStatistics from "../../../components/CircularStatistics";

export default function Profile() {
    const { user, logout } = useAuth();
    
    const [ name, setName ] = useState<string>("");
    const [ surname, setSurname ] = useState<string>("");
    const [ group, setGroup ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(true);

    const [ passedLectures, setPassedLectures ] = useState<number[]>([]);
    const [ passedLabWorks, setPassedLabWorks ] = useState<number[]>([]);
    const [ passedTests, setPassedTests ] = useState<number[]>([]);

    const { lectures } = useLectures();
    const { labWorks } = useLabWorks();
    const { tests } = useTests();

    const lecturesCount = lectures.length;
    const labWorksCount = labWorks.length;
    const testsCount = tests.length;

    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(
            doc(db, "users", user.uid),
            (docSnap) => {
                if (docSnap.exists()) {
                    setName(docSnap.data().name);
                    setSurname(docSnap.data().surname);
                    setGroup(docSnap.data().group);

                    setPassedLectures(docSnap.data().passedLectures);
                    setPassedLabWorks(docSnap.data().passedLabs);
                    setPassedTests(docSnap.data().passedTests);
                }
                setLoading(false);
            }
        );
    
        return unsubscribe;
    }, [user]);

    const lecturesProgress =
        lecturesCount > 0
        ? passedLectures.length / lecturesCount
        : 0;

    const labWorksProgress =
        labWorksCount > 0
        ? passedLabWorks.length / labWorksCount
        : 0;

    const testsProgress =
        testsCount > 0
        ? passedTests.length / testsCount
        : 0;
    
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={ theme.colors.primary } />
            </View>
        )
    }

    return (
        <View style={ styles.container }>
            <AppText style={ styles.title }>{ surname } { name }</AppText>

            <View style={ styles.statistics }>
                <CircularStatistics
                    title="Лекции"
                    passedCount={ passedLectures.length }
                    totalCount={ lecturesCount }
                    progress={ lecturesProgress }
                    size={ 80 }
                    color={ theme.colors.primary } />

                <CircularStatistics
                    title="Лаб. работы"
                    passedCount={ passedLabWorks.length }
                    totalCount={ labWorksCount }
                    progress={ labWorksProgress }
                    size={ 80 }
                    color={ theme.colors.primary } />

                <CircularStatistics
                    title="Тесты"
                    passedCount={ passedTests.length }
                    totalCount={ testsCount }
                    progress={ testsProgress }
                    size={ 80 }
                    color={ theme.colors.primary } />
            </View>
        
            <TouchableOpacity
                style={ styles.bottomButton }
                onPress={ logout }>
                <AppText style={ styles.bottomButtonText }>Выйти</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,

        padding: theme.spacing.md
    },

    title: {
        fontFamily: theme.fonts.bold,
        fontSize: 18
    },
    statistics: {
        flexDirection: 'row',
        gap: theme.spacing.md
    },

    bottomButton: {
        position: 'absolute',
        bottom: theme.spacing.md,

        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.danger,
        borderRadius: 10,

        padding: theme.spacing.md
    },
    bottomButtonText: {
        color: theme.colors.danger
    }
});