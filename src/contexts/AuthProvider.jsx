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
