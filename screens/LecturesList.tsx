import { StyleSheet, View, FlatList } from "react-native";
import LectureCard from "../components/LectureCard";

import useLectures from "../src/hooks/useLectures";
import useCourses from "../src/hooks/useCourses";

import { theme } from "../src/theme";

export default function LecturesList() {
    const { lectures } = useLectures();
    const { courses } = useCourses();

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
                        isCompleted={ false }
                        course_title={ course_title }
                        level={ item.level }
                        number={ item.number }
                        description={ item.description }
                        onPress={() => console.log("Lecture pressed!")} />
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