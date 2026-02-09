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

export interface LabWork {
    id: number;
    title: string;
    pdf_id: number;
};

export interface Test {
    id: number;
    title: string;
    link: string;
}

const names = [
  "Лабораторная работа №1.pdf",
  "Лабораторная работа №2.pdf",
  "Лабораторная работа №3.pdf",
  "Лабораторная работа №4.pdf",
  "Лабораторная работа №5.pdf",
  "Лабораторная работа №6.pdf",
  "Лабораторная работа №7.pdf",
  "Лабораторная работа №8.pdf",
  "Лабораторная работа №9.pdf",
  "Лабораторная работа №10.pdf",
  "Лабораторная работа №11.pdf",
  "Лабораторная работа №12.pdf",
  "Лабораторная работа №13.pdf",
  "Лабораторная работа №14.pdf",
  "Лабораторная работа №15.pdf",
] as const;

export type PdfFileName = typeof names[number];