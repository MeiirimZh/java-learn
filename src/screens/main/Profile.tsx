import { useAuth } from "../../context/AuthContext";

import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "../../../components/AppText";

import { theme } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
    const { user, logout } = useAuth();

    return (
        <View style={ styles.container }>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                <Ionicons name="mail" color={ theme.colors.textMuted } />
                <AppText>{ user?.email ?? "Неизвестно" }</AppText>
            </View>
            <TouchableOpacity
                style={ styles.bottomButton }
                onPress={ logout }>
                <AppText style={ styles.bottomButtonText }>Выйти</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        padding: theme.spacing.md
    },

    bottomButton: {
        position: 'absolute',
        bottom: theme.spacing.md,

        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.danger,
        borderRadius: 10,

        padding: theme.spacing.md
    },
    bottomButtonText: {
        color: theme.colors.danger
    }
});