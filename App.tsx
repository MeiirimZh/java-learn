import { SQLiteProvider } from "expo-sqlite";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import Lectures from "./screens/Lectures";

const Tab = createBottomTabNavigator();

export default function App() {
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
          <Tab.Navigator>
            <Tab.Screen name="Home" component={ Home } />
            <Tab.Screen name="Lectures" component={ Lectures } />
          </Tab.Navigator>
        </NavigationContainer>
    </SQLiteProvider>
  )
}