import { useState } from "react";

import { SQLiteProvider } from "expo-sqlite";
import DatabaseInitializer from "../database/DatabaseInitializer";

import { useAuth } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";

export default function RootNavigator() {
    const { user, loading } = useAuth();
    const [ ready, setReady ] = useState<boolean>(false);

    if (loading) {
        return null;
    }

    if (!ready) {
        return (
            <DatabaseInitializer onReady={() => setReady(true)} />
        )
    }

    if (!user) {
        return <AuthStack />;
    }

    return (
        <SQLiteProvider databaseName="local.db"
            options={{ useNewConnection: false }}>
                <MainTabs />
        </SQLiteProvider>
    )
}