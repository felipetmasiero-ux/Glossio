import { useState, useEffect, useCallback } from "react";
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

    return (
        <LastActivityContext.Provider value={{
            lastActivity,
            setActivity,
            clearActivity
        }}>
            {children}
        </LastActivityContext.Provider>
    );
}
