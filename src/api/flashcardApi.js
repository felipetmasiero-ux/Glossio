const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "authToken";

async function request(path, { token: explicitToken, ...options } = {}) {
    const token = explicitToken || localStorage.getItem(TOKEN_KEY);

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ([]));

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
    }

    return data;
}

export function getFlashcards() {
    return request("/flashcards");
}

// `token` can be passed explicitly for a flush right as the user logs out,
// when the stored token may already have been cleared from localStorage.
export function saveFlashcards(flashcards, token) {
    return request("/flashcards", {
        method: "PUT",
        body: JSON.stringify(flashcards),
        token
    });
}
