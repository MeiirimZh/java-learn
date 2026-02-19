import { StyleSheet, View, StatusBar, Image, ScrollView } from "react-native";
import AppText from "../../../components/AppText";
import HorizontalDivider from "../../../components/HorizontalDivider";

import { useWindowDimensions } from "react-native";

import { theme } from "../../theme";

export default function Home() {
    const { width } = useWindowDimensions();

    const educationImg = require("../../../assets/images/education.jpg");
    const svetlanaImg = require("../../../assets/images/svetlana.png");

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ width: width, position: 'relative' }}>
                <Image
                    source={ educationImg }
                    style={{
                        width: width,
                        height: width / (710 / 280),
                        alignSelf: 'center'
                    }}
                    resizeMode="cover"
                />

                <Image
                    source={ svetlanaImg }
                    style={ [styles.authorImg, { position: 'absolute', bottom: -60 }] }
                />
            </View>

            <View style={ styles.authorTitleContainer }>
                <AppText 
                    style={ [styles.authorName, { marginTop: 70 }] }>
                        {"Абдрахманова Светлана\nВладимировна"}
                </AppText>
                <AppText style={{ color: theme.colors.textMuted }}>Информационные ресурсы</AppText>
            </View>

            <HorizontalDivider style={{ width: width - theme.spacing.lg * 2, marginBottom: theme.spacing.lg }} />
            
            <View style={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.lg }}>
                <AppText style={ styles.infoText }>
                    Абдрахманова Светлана Владимировна, преподаватель специальных дисциплин высшей категории.
                </AppText>
                <AppText style={ styles.infoText }>
                    Преподает программирование на JavaScript, PHP, SQL, C#, Java.
                </AppText>
                <AppText style={ styles.infoText }>
                    Имеет почетные грамоты за вклад в развитие образования от Министерства просвещения РК.
                </AppText>
                <AppText style={ styles.infoText }>
                    Является экспертом WorldSkills по компетенции "Web - дизайн".
                </AppText>
            </View>

            <StatusBar barStyle="light-content" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    authorImg: {
        alignSelf: 'center',

        width: 120,
        height: 120,

        borderRadius: 60,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: theme.colors.bgLight
    },
    authorTitleContainer: {
        alignItems: 'center',
        gap: theme.spacing.sm,

        marginBottom: theme.spacing.lg
    },
    authorName: {
        fontFamily: theme.fonts.bold,
        fontSize: 20,

        color: theme.colors.text,

        textAlign: 'center'
    },

    infoText: {
        color: theme.colors.textMuted
    }
});