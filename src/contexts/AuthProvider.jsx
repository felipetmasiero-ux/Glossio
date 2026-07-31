import { useEffect, useState } from "react";
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

    async function login(email, password) {
        const { token, user } = await loginRequest({ email, password });
        localStorage.setItem(TOKEN_KEY, token);
        setToken(token);
        setUser(user);
    }

    async function register({ name, email, password, preferredLanguage }) {
        const { token, user } = await registerRequest({ name, email, password, preferredLanguage });
        localStorage.setItem(TOKEN_KEY, token);
        setToken(token);
        setUser(user);
    }

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    }

    function updateUser(patch) {
        setUser(previous => ({ ...previous, ...patch }));
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: Boolean(user),
                isLoading,
                login,
                register,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
