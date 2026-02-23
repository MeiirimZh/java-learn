import { createStackNavigator } from "@react-navigation/stack";
import { LecturesStackParamList } from "../../navigation/types";

import LecturesList from "./LecturesList";
import ViewLecture from "./ViewLecture";

import { theme } from "../../theme";

const Stack = createStackNavigator<LecturesStackParamList>();

export default function Lectures() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                    height: 100
                },
                headerTintColor: theme.colors.onPrimary
            }}>
            <Stack.Screen name="LecturesList" component={ LecturesList } options={{ title: 'Лекции' }} />
            <Stack.Screen name="ViewLecture" component={ ViewLecture } />
        </Stack.Navigator>
    )
}