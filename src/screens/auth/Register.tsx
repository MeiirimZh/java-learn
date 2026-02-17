import { useState } from "react";

import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AppText from "../../../components/AppText";

import { useAuth } from "../../context/AuthContext";
import { FirebaseError } from "firebase/app";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/types";

import { theme } from "../../theme";
import LogoIcon from "../../../assets/svg/LogoIcon";

import Toast from "react-native-toast-message";

type Props = StackScreenProps<AuthStackParamList, "Register">;

export default function Register({ navigation }: Props) {
    const { register } = useAuth();
    const [ name, setName ] = useState<string>("");
    const [ surname, setSurname ] = useState<string>("");
    const [ group, setGroup ] = useState<string>("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleRegister = async () => {
        setLoading(true);

        if (!name || !surname || !group) {
            Toast.show({
                type: 'error',
                text1: 'Ошибка ⚠️',
                text2: 'Заполните все поля'
            });

            return;
        }

        try {
            await register(email, password, name.trim(), surname.trim(), group.trim());
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                let msg: string = "Ошибка";

                if (error.code === "auth/invalid-email") {
                    msg = "Неверный email";
                }
                else if (error.code === "auth/missing-password") {
                    msg = "Вы не ввели пароль";
                }
                else if (error.code === "auth/email-already-in-use") {
                    msg = "Аккаунт с таким email уже существует";
                }
                else if (error.code === "auth/weak-password") {
                    msg = "Слабый пароль"
                }

                Toast.show({
                    type: 'error',
                    text1: 'Ошибка ⚠️',
                    text2: msg
                });
            }
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
                            placeholder="Имя"
                            value={ name }
                            onChangeText={ setName }
                            style={ [styles.textInput, styles.shadow] } />
                        <TextInput 
                            placeholder="Фамилия"
                            value={ surname }
                            onChangeText={ setSurname }
                            style={ [styles.textInput, styles.shadow] } />
                        <TextInput 
                            placeholder="Группа"
                            value={ group }
                            onChangeText={ setGroup }
                            style={ [styles.textInput, styles.shadow] } />
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