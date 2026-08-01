import { test, expect } from "./fixtures/test-fixtures.js";
import { makeTestUser, submitRegisterForm, submitLoginForm, registerAndOnboard, logout } from "./fixtures/auth-helpers.js";

test.describe("Authentication", () => {

    test("blocks access to a protected route when logged out", async ({ page }) => {
        await page.goto("/home");
        await page.waitForURL("**/login");
        await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();
    });

    test("registers a new user and reaches the language picker", async ({ page }) => {
        const user = makeTestUser("register");

        await submitRegisterForm(page, user);

        await page.waitForURL("**/choose-language");
        await expect(page.getByRole("heading", { name: "Escolha seu idioma" })).toBeVisible();
    });

    test("rejects registering the same email twice", async ({ page }) => {
        const user = makeTestUser("dup-email");

        await submitRegisterForm(page, user);
        await page.waitForURL("**/choose-language");

        // Second registration attempt with the exact same email.
        await submitRegisterForm(page, user);

        await expect(page.getByRole("alert")).toHaveText("Já existe uma conta com este e-mail.");
        await expect(page).toHaveURL(/\/register$/);
    });

    test("logs in an existing user and reaches home", async ({ page }) => {
        const user = makeTestUser("login");
        await registerAndOnboard(page, user, "English");

        await logout(page);

        await submitLoginForm(page, user);
        await page.waitForURL("**/home");
        await expect(page.getByRole("button", { name: "Sair" })).toBeVisible();
    });

    test("rejects an incorrect password", async ({ page }) => {
        const user = makeTestUser("wrong-pass");
        await registerAndOnboard(page, user, "English");
        await logout(page);

        await submitLoginForm(page, { email: user.email, password: "TotallyWrongPassword1" });

        await expect(page.getByRole("alert")).toHaveText("E-mail ou senha inválidos.");
        await expect(page).toHaveURL(/\/login$/);
    });

    test("logs out and blocks the previously accessible route", async ({ page }) => {
        const user = makeTestUser("logout");
        await registerAndOnboard(page, user, "English");

        await logout(page);

        await page.goto("/home");
        await page.waitForURL("**/login");
    });

    test("keeps the session after a full page refresh", async ({ page }) => {
        const user = makeTestUser("refresh");
        await registerAndOnboard(page, user, "English");

        await page.reload();

        // AuthProvider re-validates the token via /auth/me on mount; give it
        // a moment instead of asserting immediately after reload.
        await expect(page.getByRole("button", { name: "Sair" })).toBeVisible();
        await expect(page).toHaveURL(/\/home$/);
    });

});
