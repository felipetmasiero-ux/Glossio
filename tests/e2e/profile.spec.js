import { test, expect } from "./fixtures/test-fixtures.js";
import { submitLoginForm, logout, registerAndOnboard } from "./fixtures/auth-helpers.js";

test.describe("Profile", () => {

    test("edits name and bio", async ({ authedPage: page }) => {
        await page.goto("/profile");

        await page.getByLabel("Nome").fill("Novo Nome de Teste");
        await page.getByLabel("Bio").fill("Aprendendo idiomas com o Glossio.");
        await page.getByRole("button", { name: "Salvar", exact: true }).click();

        await expect(page.getByText("Perfil salvo.")).toBeVisible();
        await expect(page.getByLabel("Nome")).toHaveValue("Novo Nome de Teste");
        await expect(page.getByLabel("Bio")).toHaveValue("Aprendendo idiomas com o Glossio.");
    });

    test("edits the avatar URL", async ({ authedPage: page }) => {
        await page.goto("/profile");

        const avatarUrl = "https://example.com/avatar.png";
        await page.getByPlaceholder("URL do avatar").fill(avatarUrl);
        await page.getByRole("button", { name: "Salvar", exact: true }).click();

        await expect(page.getByText("Perfil salvo.")).toBeVisible();
        await expect(page.getByPlaceholder("URL do avatar")).toHaveValue(avatarUrl);
    });

    test("changes the password and can log in with the new one", async ({ page, newUser }) => {
        await registerAndOnboard(page, newUser, "English");

        await page.goto("/profile");
        await page.getByRole("button", { name: "Alterar senha" }).click();

        const newPassword = "BrandNewPass456!";
        await page.getByPlaceholder("Senha atual").fill(newUser.password);
        await page.getByPlaceholder("Nova senha", { exact: true }).fill(newPassword);
        await page.getByPlaceholder("Confirmar nova senha").fill(newPassword);
        await page.getByRole("button", { name: "Salvar nova senha" }).click();

        await expect(page.getByText("Senha alterada.")).toBeVisible();

        await logout(page);
        await submitLoginForm(page, { email: newUser.email, password: newPassword });
        await page.waitForURL("**/home");
    });

    test("rejects a password change with a mismatched confirmation", async ({ authedPage: page }) => {
        await page.goto("/profile");
        await page.getByRole("button", { name: "Alterar senha" }).click();

        await page.getByPlaceholder("Senha atual").fill("whatever-current");
        await page.getByPlaceholder("Nova senha", { exact: true }).fill("NewPassword123!");
        await page.getByPlaceholder("Confirmar nova senha").fill("DoesNotMatch123!");
        await page.getByRole("button", { name: "Salvar nova senha" }).click();

        await expect(page.getByRole("alert")).toHaveText("As senhas não coincidem.");
    });

    test("keeps profile edits after logging out and back in", async ({ page, newUser }) => {
        await registerAndOnboard(page, newUser, "English");

        await page.goto("/profile");
        await page.getByLabel("Nome").fill("Persistente Depois do Logout");
        await page.getByRole("button", { name: "Salvar", exact: true }).click();
        await expect(page.getByText("Perfil salvo.")).toBeVisible();

        await logout(page);
        await submitLoginForm(page, newUser);
        await page.waitForURL("**/home");

        await page.goto("/profile");
        await expect(page.getByLabel("Nome")).toHaveValue("Persistente Depois do Logout");
    });

});
