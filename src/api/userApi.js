const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "authToken";

async function request(path, options = {}) {
    const token = localStorage.getItem(TOKEN_KEY);

    let response;

    try {
        response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

export function getUser() {
    return request("/user");
}

export function updateUser(patch) {
    return request("/user", {
        method: "PUT",
        body: JSON.stringify(patch)
    });
}

export function changePassword({ currentPassword, newPassword }) {
    return request("/user/password", {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword })
    });
}
