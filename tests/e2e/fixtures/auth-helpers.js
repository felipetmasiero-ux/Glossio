// Plain, framework-agnostic helpers for the auth/onboarding flow. Kept
// separate from test-fixtures.js so any spec can import just what it needs
// without pulling in the full custom `test` object.

const PASSWORD = "TestPass123!";

/**
 * A unique, disposable test user. Every call returns different credentials
 * so tests never collide with each other or with a previous run - this is
 * our "cleanup" story: instead of deleting rows from a real Postgres DB
 * (there is no such endpoint, and we're not allowed to touch the backend),
 * every test simply creates data nobody else will ever reuse.
 */
export function makeTestUser(label = "user") {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
        name: `E2E ${label} ${unique}`,
        email: `e2e-${label}-${unique}@glossio-tests.local`,
        password: PASSWORD
    };
}

export async function fillAuthField(page, placeholder, value) {
    await page.getByPlaceholder(placeholder, { exact: true }).fill(value);
}

/** Fills and submits the registration form. Leaves the caller to await navigation. */
export async function submitRegisterForm(page, user) {
    await page.goto("/register");
    await fillAuthField(page, "Nome", user.name);
    await fillAuthField(page, "E-mail", user.email);
    await fillAuthField(page, "Senha (mínimo 8 caracteres)", user.password);
    await page.getByRole("button", { name: "Criar conta" }).click();
}

/** Fills and submits the login form. Leaves the caller to await navigation. */
export async function submitLoginForm(page, { email, password }) {
    // Going through a public page first guarantees a fresh history entry
    // for /login. Without this, logging back in right after logout() can
    // inherit a stale `location.state.from` left over from ProtectedRoute's
    // own redirect-with-state (it fires from whatever protected page the
    // user was on when logging out), sending the login redirect to that old
    // page instead of home. It has to be a route outside ProtectedRoute
    // (just "/", "/login" or "/register" qualify) - anything else re-enters
    // the same trap from a different page.
    await page.goto("/");
    await page.goto("/login");
    await fillAuthField(page, "E-mail", email);
    await fillAuthField(page, "Senha", password);
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
}

/** Registers a brand-new user through the real UI and waits for the language picker. */
export async function registerNewUser(page, user) {
    await submitRegisterForm(page, user);
    await page.waitForURL("**/choose-language");
}

const LANGUAGE_NATIVE_NAME = {
    English: "English",
    French: "Français",
    Portuguese: "Português"
};

/** Picks a language on /choose-language and waits for the redirect to /home. */
export async function chooseLanguage(page, language) {
    await page.waitForURL("**/choose-language");
    await page
        .locator(".language-card")
        .filter({ hasText: LANGUAGE_NATIVE_NAME[language] })
        .click();
    await page.waitForURL("**/home");
}

/** Full onboarding: register -> pick a language -> land on /home. */
export async function registerAndOnboard(page, user, language = "English") {
    await registerNewUser(page, user);
    await chooseLanguage(page, language);
}

export async function logout(page) {
    await page.getByRole("button", { name: "Sair" }).click();
    await page.waitForURL("**/login");
}
