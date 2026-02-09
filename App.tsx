import { useState } from "react";

import { SQLiteProvider } from "expo-sqlite";
import DatabaseInitializer from "./src/database/DatabaseInitializer";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import Lectures from "./screens/Lectures";
import LabWorks from "./screens/LabWorks";
import Tests from "./screens/Tests";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "./src/theme";
import { useFonts } from "expo-font";

const Tab = createBottomTabNavigator();

export default function App() {
  const [ ready, setReady ] = useState<boolean>(false);

  const [ fontsLoaded ] = useFonts({
      'Roboto Regular': require('./assets/fonts/Roboto Regular.ttf'),
      'Roboto Bold': require('./assets/fonts/Roboto Bold.ttf'),
    });

  if (!fontsLoaded) {
    return null;
  }

  if (!ready) {
    return (
      <DatabaseInitializer onReady={() => setReady(true)} />
    )
  }

  return (
    <SQLiteProvider databaseName="local.db"
      options={{ useNewConnection: false }}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? 'home' : 'home-outline',
                Lectures: focused ? 'book' : 'book-outline',
                LabWorks: focused ? 'flask' : 'flask-outline',
                Tests: focused ? 'clipboard' : 'clipboard-outline',
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
              height: 100
            }
          })}>
            <Tab.Screen name="Home" component={ Home } options={{ title: 'Главная' }} />
            <Tab.Screen name="Lectures" component={ Lectures } options={{ title: 'Лекции', headerShown: false }} />
            <Tab.Screen name="LabWorks" component={ LabWorks } options={{ title: 'Лаб. работы', headerShown: false }} />
            <Tab.Screen name="Tests" component={ Tests } options={{ title: 'Тесты' }} />
          </Tab.Navigator>
        </NavigationContainer>
    </SQLiteProvider>
  )
}