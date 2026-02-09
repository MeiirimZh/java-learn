export const CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS lab_works (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        pdf_id INTEGER REFERENCES pdf(id)
    );
`;

export const INSERT = `
    INSERT INTO lab_works VALUES
    (?, ?, ?);
`;

export const DROP_TABLE = `
    DROP TABLE IF EXISTS lab_works;
`;