import { describe, expect, it } from "vitest";

import { registerUser, loginUser } from "./authService.js";
import { HttpError } from "../utils/HttpError.js";

// Exercises registerUser()/loginUser() directly against the real database,
// bypassing the HTTP layer entirely - deliberately, since both endpoints sit
// behind strict rate limiters (3/hour register, 5/15min login) that a full
// validation-case matrix would otherwise exhaust against itself. The HTTP
// route wiring (rate limiting included) is covered separately, with far
// fewer calls, in tests/security.integration.test.js and
// tests/rateLimit.integration.test.js.
function creds(overrides = {}) {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: "Test User",
        email: `authsvc-${unique}@glossio-tests.local`,
        password: "TestPass123!",
        ...overrides
    };
}

describe("registerUser", () => {

    it("registers a user with valid data", async () => {
        const result = await registerUser(creds());

        expect(result.token).toBeTruthy();
        expect(result.user.passwordHash).toBeUndefined();
    });

    it("rejects a missing name", async () => {
        await expect(registerUser(creds({ name: undefined }))).rejects.toThrow(HttpError);
    });

    it("rejects a blank (whitespace-only) name", async () => {
        await expect(registerUser(creds({ name: "   " }))).rejects.toThrow(HttpError);
    });

    it("rejects a name beyond 100 characters", async () => {
        await expect(registerUser(creds({ name: "a".repeat(101) }))).rejects.toThrow(HttpError);
    });

    it("rejects an invalid email", async () => {
        await expect(registerUser(creds({ email: "not-an-email" }))).rejects.toThrow(HttpError);
    });

    it("rejects a password shorter than 8 characters", async () => {
        await expect(registerUser(creds({ password: "short" }))).rejects.toThrow(/8/);
    });

    it("rejects a password longer than 100 characters", async () => {
        await expect(registerUser(creds({ password: "a".repeat(200) }))).rejects.toThrow(HttpError);
    });

    it("rejects a duplicate email", async () => {
        const user = creds();
        await registerUser(user);

        await expect(registerUser(user)).rejects.toMatchObject({ status: 409 });
    });

    it("trims and sanitizes the name before storing it", async () => {
        const result = await registerUser(creds({ name: "  Ana   Silva  " }));
        expect(result.user.name).toBe("Ana Silva");
    });

});

describe("loginUser", () => {

    it("logs in with correct credentials", async () => {
        const user = creds();
        await registerUser(user);

        const result = await loginUser({ email: user.email, password: user.password });
        expect(result.token).toBeTruthy();
    });

    it("rejects a wrong password with a generic message (no account-exists signal)", async () => {
        const user = creds();
        await registerUser(user);

        await expect(loginUser({ email: user.email, password: "wrong-password" }))
            .rejects.toMatchObject({ status: 401, message: "E-mail ou senha inválidos." });
    });

    it("rejects a non-existent email with the exact same generic message", async () => {
        await expect(loginUser({ email: "nobody@glossio-tests.local", password: "whatever123" }))
            .rejects.toMatchObject({ status: 401, message: "E-mail ou senha inválidos." });
    });

    it("rejects a missing password", async () => {
        const user = creds();
        await registerUser(user);

        await expect(loginUser({ email: user.email, password: undefined })).rejects.toThrow(HttpError);
    });

});
