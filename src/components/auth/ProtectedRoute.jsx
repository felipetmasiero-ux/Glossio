import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCloudSync } from "../../hooks/useCloudSync";

export function ProtectedRoute() {

    const { isAuthenticated, isLoading } = useAuth();
    const { isHydrating } = useCloudSync();
    const location = useLocation();

    // Distinguishes "arrived here already logged out" (a deep link worth
    // returning to after login) from "was logged in on this very route and
    // just logged out" (nothing to return to). Without this, logging out
    // re-triggers this same redirect with state={{from: <the page they just
    // left}}, which can win a render race against the navbar's own clean
    // "/login" navigation and leak that page's path into the *next* login's
    // redirect target - including, via the browser's back button, letting
    // logged-out users land back on a protected page's history entry.
    //
    // Adjusted during render (React's documented pattern for "remember a
    // prop/state value has ever been true") rather than in an effect, since
    // an effect would only flip this after an extra render.
    const [wasAuthenticated, setWasAuthenticated] = useState(isAuthenticated);

    if (isAuthenticated && !wasAuthenticated) {
        setWasAuthenticated(true);
    }

    if (isLoading) return null;

    if (!isAuthenticated) {
        const state = wasAuthenticated ? undefined : { from: location };
        return <Navigate to="/login" state={state} replace />;
    }

    if (isHydrating) return null;

    return <Outlet />;

}
