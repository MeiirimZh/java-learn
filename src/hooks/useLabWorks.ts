import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { LabWork } from "../../types";

const useLabWorks = () => {
    const [ labWorks, setLabWorks ] = useState<LabWork[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadLabWorks = async () => {
        try {
            const results = await db.getAllAsync<LabWork>("SELECT * FROM lab_works ORDER BY id;");
            setLabWorks(results);
        }
        catch (error) {
            console.log("Database error: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLabWorks();
    }, []);

    return { labWorks, setLabWorks, loading };
};

export default useLabWorks;