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

    // Regression test (Sprint 33): ProtectedRoute always attached
    // state={{from: location}} to its "/login" redirect, even when the
    // redirect was caused by the user logging out from a protected page (not
    // a deep-link attempt). That stale "from" could win a render race against
    // the navbar's own clean logout navigation, and would then send a later,
    // unrelated login back to whatever protected page the user had been on
    // when they logged out - here, deliberately NOT going through any
    // pre-navigation "flush" step, to exercise the app's own redirect logic
    // directly rather than a test-side workaround.
    test("logging back in after logout lands on home, not a previously visited protected page", async ({ page }) => {
        const user = makeTestUser("clean-redirect");
        await registerAndOnboard(page, user, "English");

        await page.getByRole("link", { name: "Flashcards", exact: true }).click();
        await page.waitForURL("**/flashcards");

        await logout(page);

        await page.getByPlaceholder("E-mail", { exact: true }).fill(user.email);
        await page.getByPlaceholder("Senha", { exact: true }).fill(user.password);
        await page.getByRole("button", { name: "Entrar", exact: true }).click();

        await page.waitForURL("**/home");
        await expect(page).toHaveURL(/\/home$/);
    });

});
