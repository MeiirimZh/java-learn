import { View, StatusBar } from "react-native";
import AppText from "../../../components/AppText";

export default function Home() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AppText>Главная</AppText>

            <StatusBar barStyle="dark-content" />
        </View>
    )
}