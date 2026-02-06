export const CREATE_TABLE = `
    CREATE TABLE courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO courses (title) VALUES
    (?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS courses;`
;