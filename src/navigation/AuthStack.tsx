import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "./types";

import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={ Login } options={{ title: 'Вход' }} />
            <Stack.Screen name="Register" component={ Register } options={{ title: 'Регистрация' }} />
        </Stack.Navigator>
    )
}