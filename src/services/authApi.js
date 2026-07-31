const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
    let response;

    try {
        response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        });
    } catch {
        throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || "Algo deu errado. Tente novamente.");
    }

    return data;
}

export function registerRequest({ name, email, password, preferredLanguage }) {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, preferredLanguage })
    });
}

export function loginRequest({ email, password }) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}

export function meRequest(token) {
    return request("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
    });
}
