const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "authToken";

async function request(path, options = {}) {
    const token = localStorage.getItem(TOKEN_KEY);

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
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
