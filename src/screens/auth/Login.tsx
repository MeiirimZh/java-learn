import { useState } from "react";

import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AppText from "../../../components/AppText";

import { useAuth } from "../../context/AuthContext";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

import { theme } from "../../theme";

type Props = StackScreenProps<AuthStackParamList, "Login">;

export default function Login({ navigation }: Props) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
        }
        catch (error: any) {
            Alert.alert("Ошибка входа", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={ styles.main }>
            <AppText style={{ fontSize: 24, alignSelf: 'center', color: theme.colors.text }}>Вход</AppText>
            <View style={ styles.form }>
                <TextInput
                    style={ [styles.textInput, styles.shadow] }
                    placeholder="Email"
                    value={ email }
                    onChangeText={ setEmail }
                    keyboardType="email-address"
                    autoCapitalize="none" />
                <TextInput
                    style={ [styles.textInput, styles.shadow] }
                    placeholder="Пароль"
                    value={ password }
                    onChangeText={ setPassword }
                    secureTextEntry />
                <TouchableOpacity
                    style={ [styles.submitButton, styles.shadow] }
                    onPress={ handleLogin } >
                    <AppText style={{ color: theme.colors.onPrimary }}>Войти</AppText>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={{ alignItems: 'center', width: '100%', padding: theme.spacing.md }} 
                    onPress={() => navigation.navigate("Register")}>
                    <AppText style={{ color: theme.colors.textMuted }}>Нет аккаунта?</AppText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        gap: 20,

        padding: 50
    },
    form: {
        gap: theme.spacing.md
    },

    textInput: {
        backgroundColor: theme.colors.bgLight,

        borderRadius: 10,

        padding: theme.spacing.md
    },
    submitButton: {
        alignItems: 'center',

        backgroundColor: theme.colors.primary,

        borderRadius: 10,

        padding: theme.spacing.md
    },

    shadow: {
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    }
});