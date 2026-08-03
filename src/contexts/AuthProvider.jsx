import { useEffect, useState, useCallback, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { registerRequest, loginRequest, meRequest } from "../services/authApi";

const TOKEN_KEY = "authToken";

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(() => Boolean(token));

    useEffect(() => {
        if (!token) return;

        meRequest(token)
            .then(({ user }) => setUser(user))
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY);
                setToken(null);
            })
            .finally(() => setIsLoading(false));
    }, [token]);

    // Logging out (or in) in one tab only ever touched *that* tab's own
    // React state - another open tab of the same browser kept rendering
    // protected routes with its last-known `user`/`isAuthenticated` until it
    // happened to be reloaded, since `token` here is per-tab in-memory
    // state, not re-read from localStorage. The `storage` event is the
    // standard way another tab learns a shared localStorage key changed (it
    // never fires in the tab that made the change, only in the others), so
    // this is what makes "Sair" actually end the session everywhere it's
    // open, not just in the tab the button was clicked in.
    useEffect(() => {

        function handleStorage(event) {

            if (event.key !== TOKEN_KEY) return;

            setToken(event.newValue);

            if (!event.newValue) {
                setUser(null);
            }

        }

        window.addEventListener("storage", handleStorage);

        return () => window.removeEventListener("storage", handleStorage);

    }, []);

    // None of these read `token`/`user`/`isLoading` from the closure - only
    // ever set them - so every one of them can have an empty dependency
    // array and stay referentially stable for the lifetime of the app.
    // AuthProvider sits at the very top of the provider tree, so before this
    // its every render (e.g. `isLoading` flipping off after the initial
    // /auth/me check) recreated a fresh value object and cascaded a
    // re-render through the *entire* app's context consumers.
    const login = useCallback(async (email, password) => {
        const { token, user } = await loginRequest({ email, password });
        localStorage.setItem(TOKEN_KEY, token);
        setToken(token);
        setUser(user);
    }, []);

    const register = useCallback(async ({ name, email, password, preferredLanguage }) => {
        const { token, user } = await registerRequest({ name, email, password, preferredLanguage });
        localStorage.setItem(TOKEN_KEY, token);
        setToken(token);
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    }, []);

    const updateUser = useCallback(patch => {
        setUser(previous => ({ ...previous, ...patch }));
    }, []);

    const value = useMemo(() => ({
        user,
        token,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        updateUser
    }), [user, token, isLoading, login, register, logout, updateUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
