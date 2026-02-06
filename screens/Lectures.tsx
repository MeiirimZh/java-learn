import { createStackNavigator } from "@react-navigation/stack";

import LecturesList from "./LecturesList";
import ViewLecture from "./ViewLecture";

const Stack = createStackNavigator();

export default function Lectures() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LecturesList" component={ LecturesList } options={{ title: 'Лекции' }} />
            <Stack.Screen name="ViewLecture" component={ ViewLecture } />
        </Stack.Navigator>
    )
}