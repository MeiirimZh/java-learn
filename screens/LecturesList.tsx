import { StyleSheet, View, FlatList } from "react-native";
import LectureCard from "../components/LectureCard";

import useLectures from "../src/hooks/useLectures";

import { theme } from "../src/theme";

export default function LecturesList() {
    const { lectures, loading } = useLectures();

    return (
        <View style={ styles.main }>
            <FlatList data={ lectures } renderItem={({item}) => {
                return (
                    <LectureCard
                        title={ item.title } 
                        isCompleted={ true }
                        course_title="Java"
                        level={ item.level }
                        number={ item.number }
                        description={ item.description }
                        onPress={() => console.log("Lecture pressed!")} />
                )
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: theme.spacing.md
    }
});