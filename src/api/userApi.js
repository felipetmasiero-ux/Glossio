import { request } from "./httpClient";

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
