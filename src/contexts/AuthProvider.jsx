import { useEffect, useState, useCallback, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { registerRequest, loginRequest, meRequest } from "../services/authApi";

const TOKEN_KEY = "authToken";

// Last confirmed /auth/me (or login/register) response, cached alongside
// the token itself. Its only purpose is letting the app treat an existing
// token as authenticated - using the last user we actually confirmed -
// when /auth/me can't be reached at all (offline, timeout, backend down),
// instead of defaulting to "logged out" just because nothing fresh came
// back. It's always written/cleared together with TOKEN_KEY, in the same
// places, so the two never drift apart.
const USER_KEY = "authUser";

// /auth/me answers 401 for a missing/invalid/expired token and 404 when the
// token's own user id no longer exists (see backend authController.js's
// getUserById) - both are the server explicitly saying this session isn't
// valid. 403 isn't actually returned by this endpoint today, but is kept
// here since the task frames it as an equally explicit "no" if it ever is.
// Anything else - no HTTP response at all (network error/timeout, which
// never reaches this far - see httpClient.js) or a 5xx (the backend itself
// erroring) - is inconclusive, not a "no".
const INVALID_SESSION_STATUSES = new Set([401, 403, 404]);

function isInvalidSessionError(error) {
    return INVALID_SESSION_STATUSES.has(error?.status);
}

function loadCachedUser() {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function cacheUser(user) {
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_KEY);
    }
}

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    // Seeded from the last confirmed user (if any) instead of always
    // starting blank - this is what lets `isAuthenticated` (Boolean(user))
    // already read true for a returning user before /auth/me has even had
    // a chance to run, and stay true if that check turns out to be
    // unreachable rather than a real "no".
    const [user, setUser] = useState(() => loadCachedUser());
    const [isLoading, setIsLoading] = useState(() => Boolean(token));

    useEffect(() => {
        if (!token) return;

        meRequest(token)
            .then(({ user }) => {
                setUser(user);
                cacheUser(user);
            })
            .catch(error => {

                if (!isInvalidSessionError(error)) {
                    // Network error, timeout, or the backend itself
                    // erroring (5xx) - inconclusive, not proof the session
                    // is invalid. Leave the token and whatever user we
                    // already have (cached from before, or from an earlier
                    // successful check this session) untouched, so the app
                    // keeps working from local data instead of logging out.
                    return;
                }

                localStorage.removeItem(TOKEN_KEY);
                cacheUser(null);
                setToken(null);
                setUser(null);

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
        cacheUser(user);
        setToken(token);
        setUser(user);
    }, []);

    const register = useCallback(async ({ name, email, password, preferredLanguage }) => {
        const { token, user } = await registerRequest({ name, email, password, preferredLanguage });
        localStorage.setItem(TOKEN_KEY, token);
        cacheUser(user);
        setToken(token);
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        cacheUser(null);
        setToken(null);
        setUser(null);
    }, []);

    const updateUser = useCallback(patch => {
        setUser(previous => {
            const next = { ...previous, ...patch };
            cacheUser(next);
            return next;
        });
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
