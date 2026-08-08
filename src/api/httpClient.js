const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "authToken";
const TIMEOUT_MS = 15000;

// Single shared request helper for every API module - previously each of
// progressApi/lessonProgressApi/flashcardApi/videoProgressApi/eventsApi/
// userApi/authApi duplicated its own near-identical version of this
// function, and only some of them guarded against fetch() itself throwing
// (a network error, not just a non-2xx response), so the error message the
// user saw for the same underlying problem depended on which endpoint they
// happened to hit. This is the one place that now standardizes it: a lost
// connection, a timeout, and a 5xx all get a consistent, Portuguese message.
export async function request(path, { token: explicitToken, ...options } = {}) {

    const token = explicitToken ?? localStorage.getItem(TOKEN_KEY);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response;

    try {
        response = await fetch(`${API_URL}${path}`, {
            ...options,
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers
            }
        });
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Tempo de conexão esgotado. Tente novamente.", { cause: error });
        }
        throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.", { cause: error });
    } finally {
        clearTimeout(timeoutId);
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        // `status` is what lets a caller (see AuthProvider's use of this
        // for /auth/me) tell "the server actually answered, and said no"
        // apart from the network/timeout case above, which never reaches
        // here and never gets a `status` at all.
        const message = response.status >= 500
            ? (data.error || "Erro no servidor. Tente novamente em instantes.")
            : (data.error || "Algo deu errado. Tente novamente.");
        const error = new Error(message);
        error.status = response.status;
        throw error;
    }

    return data;
}
