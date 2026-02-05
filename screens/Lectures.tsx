import { View, Text, FlatList, ActivityIndicator } from "react-native";
import useLectures from "../src/hooks/useLectures";

export default function Lectures() {
    const { lectures, loading } = useLectures();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <View>
            <FlatList data={ lectures } renderItem={({item}) => (
                <Text>{ item.title }</Text>
            )} />
        </View>
    )
}