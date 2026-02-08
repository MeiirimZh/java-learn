import { StyleSheet, View, FlatList, Linking } from "react-native";
import TestCard from "../components/TestCard";

import useTests from "../src/hooks/useTests";

import { theme } from "../src/theme";

export default function Tests() {
    const { tests } = useTests();

    return (
        <View style={ styles.main }>
            <FlatList
            data={ tests }
            renderItem={({ item }) => (
                <TestCard
                    title={ item.title }
                    isCompleted={ false }
                    onPress={() => Linking.openURL(item.link)} />
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