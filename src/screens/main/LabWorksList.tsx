import { useState, useEffect } from "react";

import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import LabWorkCard from "../../../components/LabWorkCard";

import useLabWorks from "../../hooks/useLabWorks";

import { StackScreenProps } from "@react-navigation/stack";
import { LabWorksStackParamList } from "../../navigation/types";

import { theme } from "../../theme";

import { useAuth } from "../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

type Props = StackScreenProps<LabWorksStackParamList, "LabWorksList">;

export default function LabWorksList({ navigation }: Props) {
    const { labWorks } = useLabWorks();

    const [ passedLabs, setPassedLabs ] = useState<number[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(
            doc(db, "users", user.uid),
            (docSnap) => {
                if (docSnap.exists()) {
                    setPassedLabs(docSnap.data().passedLabs ?? []);
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
            data={ labWorks }
            renderItem={({ item }) => {
                return (
                    <LabWorkCard
                        title={ item.title }
                        isCompleted={ passedLabs.includes(item.id) }
                        onPress={() => navigation.navigate("ViewLabWork", { labWork: item })} />
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