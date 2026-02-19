import { StyleSheet, View, ScrollView, Image } from "react-native";
import AppText from "../../../components/AppText";
import HorizontalDivider from "../../../components/HorizontalDivider";

import { useWindowDimensions } from "react-native";

import { theme } from "../../theme";

export default function About() {
    const { width } = useWindowDimensions();

    const educationImg = require("../../../assets/images/education.jpg");

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={ false }>
            <View style={{ width: width, position: 'relative', marginBottom: theme.spacing.lg }}>
                <Image
                    source={ educationImg }
                    style={{
                        width: width,
                        height: width / (710 / 280),
                        alignSelf: 'center'
                    }}
                    resizeMode="cover"
                />
            </View>

            <AppText style={ styles.title }>Об учебнике</AppText>

            <HorizontalDivider style={{ width: width - theme.spacing.lg * 2, marginBottom: theme.spacing.lg }} />

            <View style={{ paddingHorizontal: theme.spacing.lg, gap: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
                <AppText style={ styles.infoText }>
                    Вашему вниманию предлагается мобильный учебно-методический комплект дисциплины "Информационные системы", которая читается в третьем семестре и является составной частью модуля "Web-программирование и интернет-технологии" обязательного для подготовки студентов по направлению 06130100 Программное обеспечение квалификации 3W06130102 web-дизайнер.
                </AppText>
                <HorizontalDivider style={{ width: width - theme.spacing.lg * 2 }} />
                <AppText style={ styles.infoText }>
                    Состав мобильного учебного-методического комплекса:
                </AppText>
                <AppText style={ styles.infoText }>
                    1. Презентация дисциплины. Дает краткую характеристику учебного материала и отображает основные положения тем.
                </AppText>
                <AppText style={ styles.infoText }>
                    2. Рабочая программа модуля. Содержит перечень тем и основных рассматриваемых вопросов. В целях облегчения работы с УМК предложены методические указания по изучению материала.
                </AppText>
                <AppText style={ styles.infoText }>
                    3. Учебно-практическое пособие. Предназначено непосредственно для изучения учебного материала. Процесс изучения материала включает в себя усвоение теоретического материала и ответы на контрольные вопросы по каждой теме. 
                </AppText>
                <AppText style={ styles.infoText }>
                    4. Презентации. Содержит дополнения к приведенным в занятиях темам прикладных разделов дисциплины. 
                </AppText>
                <HorizontalDivider style={{ width: width - theme.spacing.lg * 2 }} />
                <AppText style={ styles.infoText }>
                    Для самостоятельной работы с учебно- практическим пособием рекомендуется ознакомиться с программой курса: 
                </AppText>
                <AppText style={ styles.infoText }>
                    • повторить курс информатики, теории систем и системного анализа, восполнив имеющиеся пробелы;  
                </AppText>
                <AppText style={ styles.infoText }>
                    • последовательно проработать разделы курса по учебно-практическому пособию; 
                </AppText>
                <AppText style={ styles.infoText }>
                    • составить краткий конспект учебного пособия; 
                </AppText>
                <AppText style={ styles.infoText }>
                    • ответить на вопросы по каждому разделу, подготовиться к контрольным точкам по примерным вопросам к ним; 
                </AppText>
                <AppText style={ styles.infoText }>
                    • сдать контрольные точки по дисциплине. 
                </AppText>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: 24,

        color: theme.colors.text,

        textAlign: 'center',

        marginBottom: theme.spacing.lg
    },
    infoText: {
        color: theme.colors.textMuted
    }
});