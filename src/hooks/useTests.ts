import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { Test } from "../../types";

const useTests = () => {
    const [ tests, setTests ] = useState<Test[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadTests = async () => {
        try {
            const results = await db.getAllAsync<Test>("SELECT * FROM tests ORDER BY id;");
            setTests(results);
        }
        catch (error) {
            console.log("Database error: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTests();
    }, []);

    return { tests, setTests, loading };
};

export default useTests;