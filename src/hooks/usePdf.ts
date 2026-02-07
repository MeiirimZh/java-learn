import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { Pdf } from "../../types";

const usePdf = () => {
    const [ pdf, setPdf ] = useState<Pdf[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const db = useSQLiteContext();

    const loadPdf = async () => {
        try {
            const results = await db.getAllAsync<Pdf>("SELECT * FROM pdf ORDER BY id;");
            setPdf(results);
        }
        catch (error) {
            console.log("Database error: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPdf();
    }, []);

    return { pdf, setPdf, loading };
};

export default usePdf;