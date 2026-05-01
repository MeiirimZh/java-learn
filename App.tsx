import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";

import { useFonts } from "expo-font";

import Toast from "react-native-toast-message";

export default function App() {
  const [ fontsLoaded ] = useFonts({
    'Roboto Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
      return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>

      <Toast />
    </AuthProvider>
  )
}