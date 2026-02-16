import { SQLiteProvider } from "expo-sqlite";

import * as LecturesQueries from "./queries/LecturesQueries";
import * as CoursesQueries from "./queries/CoursesQueries";
import * as PdfQueries from "./queries/PdfQueries";
import * as LabWorksQueries from "./queries/LabWorksQueries";
import * as TestsQueries from "./queries/TestsQueries";

import { courses } from "../../assets/materials/courses";
import { lectures } from "../../assets/materials/lectures";
import { pdf } from "../../assets/materials/pdf";
import { labWorks } from "../../assets/materials/labWorks";
import { tests } from "../../assets/materials/tests";

import { View, ActivityIndicator } from "react-native";
import AppText from "../../components/AppText";
import { theme } from "../theme";

type Props = {
    onReady: () => void;
}

export default function DatabaseInitializer({ onReady }: Props) {
    return (
	    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: theme.spacing.sm }}>
    	  <ActivityIndicator size="large" color={ theme.colors.primary } />
        <AppText style={{ color: theme.colors.textMuted }}>
			    Загрузка базы данных...
        </AppText>

        <SQLiteProvider
            databaseName="local.db"
            onInit={async (db) => {
                await db.execAsync(CoursesQueries.DROP_TABLE);
                await db.execAsync(CoursesQueries.CREATE_TABLE);
                for (const course of courses) {
                  await db.runAsync(CoursesQueries.INSERT, [
                    course.title,
                  ]);
                }

                await db.execAsync(LecturesQueries.DROP_TABLE);
                await db.execAsync(LecturesQueries.CREATE_TABLE);
                for (const lecture of lectures) {
                  await db.runAsync(LecturesQueries.INSERT, [
                    lecture.id,
                    lecture.title,
                    lecture.course_id,
                    lecture.level,
                    lecture.number,
                    lecture.description,
                    lecture.content
                  ]);
                }

                await db.execAsync(PdfQueries.DROP_TABLE);
                await db.execAsync(PdfQueries.CREATE_TABLE);
                for (const pdf_file of pdf) {
                  await db.runAsync(PdfQueries.INSERT, [
                    pdf_file.title,
                    pdf_file.file_name
                  ]);
                }

                await db.execAsync(LabWorksQueries.DROP_TABLE);
                await db.execAsync(LabWorksQueries.CREATE_TABLE);
                for (const labWork of labWorks) {
                  await db.runAsync(LabWorksQueries.INSERT, [
                    labWork.id,
                    labWork.title,
                    labWork.pdf_id
                  ]);
                }

                await db.execAsync(TestsQueries.DROP_TABLE);
                await db.execAsync(TestsQueries.CREATE_TABLE);
                for (const test of tests) {
                  await db.runAsync(TestsQueries.INSERT, [
                    test.id,
                    test.title,
                    test.link
                  ]);
                }

                onReady();
            	}}>
            	<></>
        </SQLiteProvider>
    </View>
    )
}