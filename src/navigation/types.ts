import { Lecture, LabWork } from "../../types"

export type LecturesStackParamList = {
    LecturesList: undefined,
    ViewLecture: {
        lecture: Lecture
    }
};

export type LabWorksStackParamList = {
    LabWorksList: undefined,
    ViewLabWork: {
        labWork: LabWork
    }
};