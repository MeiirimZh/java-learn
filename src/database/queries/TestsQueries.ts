export const CREATE_TABLE = `
    CREATE TABLE tests (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        link TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO tests VALUES
    (?, ?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS tests;
`;