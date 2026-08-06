import { useState, useCallback, useMemo } from "react";
import { AuthGateContext } from "./AuthGateContext";

// Backs the single global CTA (AuthGateBanner) that appears whenever a
// visitor attempts a restricted action - see useRequireAuth.js, the only
// thing that ever calls requestAuth. Deliberately just a message string,
// not a redirect: the visitor stays on the page they were on and chooses
// whether to follow through, per the "never auto-redirect to login" rule.
export function AuthGateProvider({ children }) {

    const [message, setMessage] = useState(null);

    const requestAuth = useCallback((nextMessage) => {
        setMessage(nextMessage);
    }, []);

    const dismiss = useCallback(() => {
        setMessage(null);
    }, []);

    const value = useMemo(() => ({
        message,
        requestAuth,
        dismiss
    }), [message, requestAuth, dismiss]);

    return (
        <AuthGateContext.Provider value={value}>
            {children}
        </AuthGateContext.Provider>
    );

}
