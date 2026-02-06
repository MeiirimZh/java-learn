import { SQLiteProvider } from "expo-sqlite";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import Lectures from "./screens/Lectures";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "./src/theme";
import { useFonts } from "expo-font";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
      'Roboto Regular': require('./assets/fonts/Roboto Regular.ttf'),
      'Roboto Bold': require('./assets/fonts/Roboto Bold.ttf'),
    });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="local.db"
      onInit={async (db) => {
        await db.execAsync(`
          DROP TABLE IF EXISTS lectures;

          CREATE TABLE IF NOT EXISTS lectures (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
          );

          INSERT INTO lectures (title)
          VALUES
          ('Основы Java'),
          ('Hello World');
        `);
      }}
      options={{ useNewConnection: false }}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? 'home' : 'home-outline',
                Lectures: focused ? 'book' : 'book-outline'
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
          </Tab.Navigator>
        </NavigationContainer>
    </SQLiteProvider>
  )
}