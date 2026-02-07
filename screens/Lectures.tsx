import { createStackNavigator } from "@react-navigation/stack";
import { LecturesStackParamList } from "../src/navigation/types";

import LecturesList from "./LecturesList";
import ViewLecture from "./ViewLecture";

const Stack = createStackNavigator<LecturesStackParamList>();

export default function Lectures() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    height: 100
                }
            }}>
            <Stack.Screen name="LecturesList" component={ LecturesList } options={{ title: 'Лекции' }} />
            <Stack.Screen name="ViewLecture" component={ ViewLecture } />
        </Stack.Navigator>
    )
}