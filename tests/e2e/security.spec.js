import { test, expect } from "./fixtures/test-fixtures.js";
import { makeTestUser, submitRegisterForm } from "./fixtures/auth-helpers.js";

test.describe("Security hardening", () => {

    test("rejects registration with a weak (too short) password, with a friendly message", async ({ page }) => {
        const user = makeTestUser("weak-pw");

        await submitRegisterForm(page, { ...user, password: "short" });

        await expect(page.getByRole("alert")).toHaveText("A senha deve ter no mínimo 8 caracteres.");
        await expect(page).toHaveURL(/\/register$/);
    });

    test("rejects registration with an email the server considers invalid, with a friendly message", async ({ page }) => {
        const user = makeTestUser("bad-email");

        // Passes the browser's own native type="email" check (no space, has
        // an @) but fails the backend's stricter validation (no dot in the
        // domain) - proving the server-side check is what's actually doing
        // the rejecting here, not just client-side HTML5 validation.
        await submitRegisterForm(page, { ...user, email: "no-dot-domain@localhost" });

        await expect(page.getByRole("alert")).toHaveText("Informe um e-mail válido.");
        await expect(page).toHaveURL(/\/register$/);
    });

    test("rejects an invalid avatar URL from the Profile page with a friendly message", async ({ authedPage: page }) => {
        await page.goto("/profile");

        await page.getByPlaceholder("URL do avatar").fill("javascript:alert(1)");
        await page.getByRole("button", { name: "Salvar" }).click();

        await expect(page.getByRole("alert")).toHaveText(/URL do avatar/);
    });

    test("shows a friendly message (not a raw 429) when the login rate limit is hit", async ({ page }) => {
        // Rather than actually exhausting the real limiter (relaxed in
        // dev/test specifically so the rest of this suite - which registers
        // a fresh disposable user per test - doesn't lock itself out; see
        // backend/src/middlewares/rateLimiters.js), this mocks the one
        // response the real limiter would produce, to verify the frontend
        // surfaces it exactly the way it surfaces any other server error.
        await page.route("**/api/auth/login", route => {
            route.fulfill({
                status: 429,
                contentType: "application/json",
                body: JSON.stringify({ error: "Muitas tentativas de login. Tente novamente mais tarde." })
            });
        });

        await page.goto("/login");
        await page.getByPlaceholder("E-mail", { exact: true }).fill("someone@example.com");
        await page.getByPlaceholder("Senha", { exact: true }).fill("whatever-password");
        await page.getByRole("button", { name: "Entrar", exact: true }).click();

        await expect(page.getByRole("alert")).toHaveText("Muitas tentativas de login. Tente novamente mais tarde.");
    });

    test("shows a friendly message for a generic server error instead of a raw stack trace", async ({ page }) => {
        await page.route("**/api/auth/login", route => {
            route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({ error: "Erro interno do servidor." })
            });
        });

        await page.goto("/login");
        await page.getByPlaceholder("E-mail", { exact: true }).fill("someone@example.com");
        await page.getByPlaceholder("Senha", { exact: true }).fill("whatever-password");
        await page.getByRole("button", { name: "Entrar", exact: true }).click();

        const alertText = await page.getByRole("alert").textContent();
        expect(alertText).toBe("Erro interno do servidor.");
        expect(alertText.toLowerCase()).not.toMatch(/prisma|stack|at .*\.js:\d+|node_modules/);
    });

});
