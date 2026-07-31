import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCloudSync } from "../../hooks/useCloudSync";

export function ProtectedRoute() {

    const { isAuthenticated, isLoading } = useAuth();
    const { isHydrating } = useCloudSync();
    const location = useLocation();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isHydrating) return null;

    return <Outlet />;

}
