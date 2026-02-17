import { useState, useEffect } from "react";

import { StyleSheet, View, FlatList, Linking, ActivityIndicator } from "react-native";
import TestCard from "../../../components/TestCard";

import useTests from "../../../src/hooks/useTests";

import { theme } from "../../../src/theme";

import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Tests() {
    const { tests } = useTests();

    const [ passedTests, setPassedTests ] = useState<number[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(
            doc(db, "users", user.uid),
            (docSnap) => {
                if (docSnap.exists()) {
                    setPassedTests(docSnap.data().passedTests ?? []);
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
            data={ tests }
            renderItem={({ item }) => (
                <TestCard
                    title={ item.title }
                    isCompleted={ passedTests.includes(item.id) }
                    onPress={() => {
                        const updateUser = async () => {
                            if (!user) return;

                            await updateDoc(doc(db, "users", user.uid), {
                                passedTests: arrayUnion(item.id)
                            });
                        };

                        updateUser();

                        Linking.openURL(item.link)
                    }} />
            )}
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