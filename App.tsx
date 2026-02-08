import { SQLiteProvider } from "expo-sqlite";
import * as LecturesQueries from "./src/database/queries/LecturesQueries";
import * as CoursesQueries from "./src/database/queries/CoursesQueries";
import * as PdfQueries from "./src/database/queries/PdfQueries";
import * as LabWorksQueries from "./src/database/queries/LabWorksQueries";
import * as TestsQueries from "./src/database/queries/TestsQueries";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import Lectures from "./screens/Lectures";
import LabWorks from "./screens/LabWorks";
import Tests from "./screens/Tests";

import { courses } from "./assets/materials/courses";
import { lectures } from "./assets/materials/lectures";
import { pdf } from "./assets/materials/pdf";
import { labWorks } from "./assets/materials/labWorks";
import { tests } from "./assets/materials/tests";

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
        await db.execAsync(CoursesQueries.DROP_TABLE);
        await db.execAsync(CoursesQueries.CREATE_TABLE);
        for (const course of courses) {
          await db.runAsync(CoursesQueries.INSERT, [
            course.title,
          ]);
        }

        await db.execAsync(LecturesQueries.DROP_TABLE);
        await db.execAsync(LecturesQueries.CREATE_TABLE);
        for (const lecture of lectures) {
          await db.runAsync(LecturesQueries.INSERT, [
            lecture.id,
            lecture.title,
            lecture.course_id,
            lecture.level,
            lecture.number,
            lecture.description,
            lecture.content
          ]);
        }

        await db.execAsync(PdfQueries.DROP_TABLE);
        await db.execAsync(PdfQueries.CREATE_TABLE);
        for (const pdf_file of pdf) {
          await db.runAsync(PdfQueries.INSERT, [
            pdf_file.title,
            pdf_file.file_name
          ]);
        }

        await db.execAsync(LabWorksQueries.DROP_TABLE);
        await db.execAsync(LabWorksQueries.CREATE_TABLE);
        for (const labWork of labWorks) {
          await db.runAsync(LabWorksQueries.INSERT, [
            labWork.id,
            labWork.title,
            labWork.pdf_id
          ]);
        }

        await db.execAsync(TestsQueries.DROP_TABLE);
        await db.execAsync(TestsQueries.CREATE_TABLE);
        for (const test of tests) {
          await db.runAsync(TestsQueries.INSERT, [
            test.id,
            test.title,
            test.link
          ]);
        }
      }}
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