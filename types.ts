export interface Lecture {
    id: number;
    title: string;
    course_id: number;
    level: number;
    number: number;
    description: string;
    content: string;
};

export interface Course {
    id: number;
    title: string;
};

export interface Pdf {
    id: number;
    title: string;
    file_name: string;
};