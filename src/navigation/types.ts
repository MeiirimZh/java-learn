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

export type AuthStackParamList = {
    Login: undefined,
    Register: undefined
}