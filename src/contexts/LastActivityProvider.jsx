import { useState, useEffect, useCallback, useMemo } from "react";
import { LastActivityContext } from "./LastActivityContext";
import {
    loadLastActivity,
    saveLastActivity
} from "../utils/dashboard/activity";

export function LastActivityProvider({ children }) {

    const [lastActivity, setLastActivity] = useState(loadLastActivity);

    useEffect(() => {
        saveLastActivity(lastActivity);
    }, [lastActivity]);

    const setActivity = useCallback((activity) => {
        setLastActivity({
            ...activity,
            updatedAt: Date.now()
        });
    }, []);

    const clearActivity = useCallback(() => {
        setLastActivity(null);
    }, []);

    const value = useMemo(() => ({
        lastActivity,
        setActivity,
        clearActivity
    }), [lastActivity, setActivity, clearActivity]);

    return (
        <LastActivityContext.Provider value={value}>
            {children}
        </LastActivityContext.Provider>
    );
}
