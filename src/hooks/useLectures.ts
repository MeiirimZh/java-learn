import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { Lecture } from "../../types";

const useLectures = () => {
    const [ lectures, setLectures ] = useState<Lecture[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();
    
    const loadLectures = async () => {
        try {
            const results = await db.getAllAsync<Lecture>("SELECT * FROM lectures ORDER BY id;");
            setLectures(results);
        }
        catch (error) {
            console.log("Database error: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLectures();
    }, []);

    return { lectures, setLectures, loading };
};

export default useLectures;