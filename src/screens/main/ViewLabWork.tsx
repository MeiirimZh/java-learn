import { useState, useLayoutEffect, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../../components/AppText";

import usePdf from "../../hooks/usePdf";

import { StackScreenProps } from "@react-navigation/stack";
import { LabWorksStackParamList } from "../../navigation/types";

import PdfView from "../../../components/PdfView";

import { theme } from "../../theme";

import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";

type Props = StackScreenProps<LabWorksStackParamList, "ViewLabWork">;

export default function ViewLabWork({ route, navigation }: Props) {
    const { labWork } = route.params;
    const { pdf } = usePdf();

    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalPages, setTotalPages ] = useState<number>(0);
    const [ haveRead, setHaveRead ] = useState<boolean>(false);

    const { user } = useAuth();

    const pdfMap = {
        1: require('../../../assets/presentations/lab_work_1.pdf'),
        2: require('../../../assets/presentations/lab_work_2.pdf'),
        3: require('../../../assets/presentations/lab_work_3.pdf'),
        4: require('../../../assets/presentations/lab_work_4.pdf'),
        5: require('../../../assets/presentations/lab_work_5.pdf'),
        6: require('../../../assets/presentations/lab_work_6.pdf'),
        7: require('../../../assets/presentations/lab_work_7.pdf'),
        8: require('../../../assets/presentations/lab_work_8.pdf'),
        9: require('../../../assets/presentations/lab_work_9.pdf'),
        10: require('../../../assets/presentations/lab_work_10.pdf'),
        11: require('../../../assets/presentations/lab_work_11.pdf'),
        12: require('../../../assets/presentations/lab_work_12.pdf'),
        13: require('../../../assets/presentations/lab_work_13.pdf'),
        14: require('../../../assets/presentations/lab_work_14.pdf'),
        15: require('../../../assets/presentations/lab_work_15.pdf'),
    } as const;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: labWork.title
        });
    }, [navigation, labWork.title]);
    
    useEffect(() => {
        if (currentPage === totalPages && totalPages > 0) {
            setHaveRead(true);
        }
    }, [currentPage, totalPages]);

    const pdfFile = pdf.find(
        (pdfFile) => pdfFile.id === labWork.pdf_id
    );

    useEffect(() => {
        if (!user || !haveRead) return;

        const updateUser = async () => {
            await updateDoc(doc(db, "users", user.uid), {
                passedLabs: arrayUnion(labWork.id)
            });
        };

        updateUser();
    }, [haveRead, user, labWork.id]);

    if (!pdfFile) {
        return (
            <View>
                <AppText>PDF не найден</AppText>
            </View>
        )
    }

    const pdfSource = pdfMap[pdfFile.id as keyof typeof pdfMap];

    if (!pdfFile) return null;

    return (
        <View style={ styles.main }>
            <PdfView
                path={ pdfSource }
                onLoadComplete={ (numberOfPages) => setTotalPages(numberOfPages) }
                onPageChanged={ (page, numberOfPages) => setCurrentPage(page) } />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,

        padding: theme.spacing.md
    }
});