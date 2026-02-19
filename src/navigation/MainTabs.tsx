import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/main/Home";
import About from "../screens/main/About";
import Lectures from "../screens/main/Lectures";
import LabWorks from "../screens/main/LabWorks";
import Tests from "../screens/main/Tests";
import Profile from "../screens/main/Profile";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? 'home' : 'home-outline',
                About: focused ? 'folder' : 'folder-outline',
                Lectures: focused ? 'book' : 'book-outline',
                LabWorks: focused ? 'flask' : 'flask-outline',
                Tests: focused ? 'clipboard' : 'clipboard-outline',
                Profile: focused ? 'person' : 'person-outline',
              } as const;

              return (
                <Ionicons
                  name={icons[route.name as keyof typeof icons]}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textMuted,
            tabBarStyle: { height: 100 },

            headerStyle: {
              backgroundColor: theme.colors.primary,
              height: 100
            },
            headerTitleStyle: {
              color: theme.colors.onPrimary
            }
          })}>
            <Tab.Screen name="Home" component={ Home } options={{ title: 'Информация' }} />
            <Tab.Screen name="About" component={ About } options={{ title: 'Об учебнике' }} />
            <Tab.Screen name="Lectures" component={ Lectures } options={{ title: 'Лекции', headerShown: false }} />
            <Tab.Screen name="LabWorks" component={ LabWorks } options={{ title: 'Лаб. работы', headerShown: false }} />
            <Tab.Screen name="Tests" component={ Tests } options={{ title: 'Тесты' }} />
            <Tab.Screen name="Profile" component={ Profile } options={{ title: 'Профиль' }} />
        </Tab.Navigator>
    )
}