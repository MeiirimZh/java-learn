import { useState } from "react";

import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AppText from "../../../components/AppText";

import { useAuth } from "../../context/AuthContext";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

import { theme } from "../../theme";
import LogoIcon from "../../../assets/svg/LogoIcon";

type Props = StackScreenProps<AuthStackParamList, "Register">;

export default function Register({ navigation }: Props) {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await register(email, password);
        }
        catch (error: any) {
            Alert.alert("Ошибка регистрации", error.message);
        } finally {
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
                    <AppText style={{ fontSize: 24, alignSelf: 'center', color: theme.colors.text }}>Регистрация</AppText>
                    <View style={ styles.form }>
                        <TextInput
                            placeholder="Email"
                            value={ email }
                            onChangeText={ setEmail }
                            style={ [styles.textInput, styles.shadow] }
                            keyboardType="email-address"
                            autoCapitalize="none" />
                        <TextInput
                            placeholder="Пароль"
                            value={ password }
                            onChangeText={ setPassword }
                            style={ [styles.textInput, styles.shadow] }
                            secureTextEntry />
                        <TouchableOpacity
                            style={ [styles.submitButton, styles.shadow] }
                            onPress={ handleRegister } >
                            <AppText style={{ color: theme.colors.onPrimary }}>Зарегистрироваться</AppText>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ alignItems: 'center', width: '100%', padding: theme.spacing.md }} 
                            onPress={() => navigation.navigate("Login")}>
                            <AppText style={{ color: theme.colors.textMuted }}>Уже есть аккаунт?</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
  );
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