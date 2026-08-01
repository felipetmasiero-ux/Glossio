import { request } from "../api/httpClient";

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
