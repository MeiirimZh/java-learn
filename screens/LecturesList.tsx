import { View, Text, FlatList } from "react-native";

import useLectures from "../src/hooks/useLectures";

export default function LecturesList() {
    const { lectures, loading } = useLectures();

    return (
        <View>
            <FlatList data={ lectures } renderItem={({item}) => (
                <Text>{ item.title }</Text>
            )} />
        </View>
    )
}