import { StyleSheet, View, FlatList } from "react-native";
import LabWorkCard from "../components/LabWorkCard";

import useLabWorks from "../src/hooks/useLabWorks";

import { StackScreenProps } from "@react-navigation/stack";
import { LabWorksStackParamList } from "../src/navigation/types";

import { theme } from "../src/theme";

type Props = StackScreenProps<LabWorksStackParamList, "LabWorksList">;

export default function LabWorksList({ navigation }: Props) {
    const { labWorks } = useLabWorks();

    return (
        <View style={ styles.main }>
            <FlatList 
            data={ labWorks }
            renderItem={({ item }) => {
                return (
                    <LabWorkCard
                        title={ item.title }
                        isCompleted={ false }
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