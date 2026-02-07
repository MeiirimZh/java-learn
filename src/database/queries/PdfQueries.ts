export const CREATE_TABLE = `
    CREATE TABLE pdf (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        file_name TEXT NOT NULL
    );
`;

export const INSERT = `
    INSERT INTO pdf (title, file_name) VALUES
    (?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS pdf;
`;