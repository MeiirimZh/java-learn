export const CREATE_TABLE = `
    CREATE TABLE lectures (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        course_id INTEGER REFERENCES courses(id),
        level INTEGER NOT NULL,
        number INTEGER NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO lectures VALUES
    (?, ?, ?, ?, ?, ?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS lectures;
`;