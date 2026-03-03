import { useState } from "react";

import { View, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import AppText from "../../../components/AppText";

import { useAuth } from "../../context/AuthContext";
import { FirebaseError } from "firebase/app";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

import { theme } from "../../theme";
import LogoIcon from "../../../assets/svg/LogoIcon";

import Toast from "react-native-toast-message";

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
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                let msg: string = "Ошибка";

                console.log(error.message);

                if (error.code === "auth/invalid-email") {
                    msg = "Неверный email";
                }
                else if  (error.code === "auth/missing-password") {
                    msg = "Неверный пароль";
                }
                else if  (error.code === "auth/invalid-credential") {
                    msg = "Неверный email или пароль";
                }

                Toast.show({
                    type: 'error',
                    text1: 'Ошибка ⚠️',
                    text2: msg
                });
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={ styles.main }>
            <View style={ styles.contentWrapper }>
                <LogoIcon 
                    width={ 100 }
                    height={ 100 }
                    style={ styles.logo } />
                <View style={ styles.content }>
                    <AppText style={{ fontSize: 24, alignSelf: 'center', color: theme.colors.text }}>Вход</AppText>
                    <View style={ styles.form }>
                        <TextInput
                            style={ [styles.textInput, styles.shadow] }
                            placeholder="Email"
                            placeholderTextColor={ theme.colors.textMuted }
                            value={ email }
                            onChangeText={ setEmail }
                            keyboardType="email-address"
                            autoCapitalize="none" />
                        <TextInput
                            style={ [styles.textInput, styles.shadow] }
                            placeholder="Пароль"
                            placeholderTextColor={ theme.colors.textMuted }
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
            </View>

            <StatusBar barStyle="dark-content" />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',

        padding: 50,

        backgroundColor: theme.colors.bg
    },
    contentWrapper: {
        position: 'relative'
    },
    content: {
        gap: theme.spacing.lg,
    },

    form: {
        gap: theme.spacing.md
    },
    logo: {
        position: 'absolute',
        top: -150,

        alignSelf: 'center'
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