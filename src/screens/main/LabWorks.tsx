import { createStackNavigator } from "@react-navigation/stack";
import { LabWorksStackParamList } from "../../navigation/types";

import LabWorksList from "./LabWorksList";
import ViewLabWork from "./ViewLabWork";

const Stack = createStackNavigator<LabWorksStackParamList>();

export default function LabWorks() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    height: 100
                }
            }}>
            <Stack.Screen name="LabWorksList" component={ LabWorksList } options={{ title: 'Лабораторные работы' }} />
            <Stack.Screen name="ViewLabWork" component={ ViewLabWork } />
        </Stack.Navigator>
    )
}