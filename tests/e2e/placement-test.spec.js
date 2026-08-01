import { test, expect } from "./fixtures/test-fixtures.js";

// Every question in the data bank has its correct option at index 0, so
// answering "all firsts" is a deterministic 100% run, and "all seconds" is a
// deterministic 0% run - no randomness needed to control the outcome.
async function answerAllQuestions(page, { optionIndex = 0, count } = {}) {

    for (let i = 0; i < count; i++) {
        await page.locator(".placement-test-question__option").nth(optionIndex).click();
        await page.getByRole("button", { name: /Próxima|Ver resultado/ }).click();
    }

}

test.describe("Placement Test", () => {

    test("is reachable from the Landing page while logged out", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("button", { name: /Já sabe um pouco/ }).click();
        await page.waitForURL("**/placement-test");

        await expect(page.getByRole("heading", { name: "Qual idioma você quer testar?" })).toBeVisible();
    });

    test("completes a full test and recommends a level based on performance", async ({ authedPage: page }) => {
        await page.goto("/placement-test");

        await page.locator(".language-card").filter({ hasText: "English" }).click();
        await expect(page.getByRole("heading", { name: "Pronto para começar?" })).toBeVisible();

        await page.getByRole("button", { name: "Iniciar teste" }).click();
        await expect(page.getByText("Pergunta 1 de 18")).toBeVisible();

        await answerAllQuestions(page, { optionIndex: 0, count: 18 }); // 100% correct

        await expect(page.getByRole("heading", { name: "English", level: 1 })).toBeVisible();
        await expect(page.getByText("Nível recomendado")).toBeVisible();
        await expect(page.getByText("A2", { exact: true })).toBeVisible();
    });

    test("recommends A1 when the learner struggles with the questions", async ({ authedPage: page }) => {
        await page.goto("/placement-test");

        await page.locator(".language-card").filter({ hasText: "English" }).click();
        await page.getByRole("button", { name: "Iniciar teste" }).click();

        await answerAllQuestions(page, { optionIndex: 1, count: 18 }); // every answer wrong

        await expect(page.getByText("A1", { exact: true })).toBeVisible();
        await expect(page.getByText(/ponto de partida ideal/)).toBeVisible();
    });

    test("recommends the module and opens it directly, without unlocking anything else", async ({ authedPage: page }) => {
        await page.goto("/placement-test");

        await page.locator(".language-card").filter({ hasText: "English" }).click();
        await page.getByRole("button", { name: "Iniciar teste" }).click();
        await answerAllQuestions(page, { optionIndex: 0, count: 18 });

        await page.getByRole("button", { name: /Começar pelo A2/ }).click();

        await page.waitForURL(/\/lessons\/module\/english-a2/);
        await expect(page.getByRole("heading", { name: "English A2" })).toBeVisible();
    });

    test("retaking the test returns to the language picker and can produce a different result", async ({ authedPage: page }) => {
        await page.goto("/placement-test");

        await page.locator(".language-card").filter({ hasText: "English" }).click();
        await page.getByRole("button", { name: "Iniciar teste" }).click();
        await answerAllQuestions(page, { optionIndex: 0, count: 18 });

        await expect(page.getByText("A2", { exact: true })).toBeVisible();

        await page.getByRole("button", { name: "Refazer teste" }).click();
        await expect(page.getByRole("heading", { name: "Qual idioma você quer testar?" })).toBeVisible();

        await page.locator(".language-card").filter({ hasText: "English" }).click();
        await page.getByRole("button", { name: "Iniciar teste" }).click();
        await answerAllQuestions(page, { optionIndex: 1, count: 18 });

        await expect(page.getByText("A1", { exact: true })).toBeVisible();
    });

    test("works end-to-end for a language with only one available level (Portuguese)", async ({ authedPage: page }) => {
        await page.goto("/placement-test");

        await page.locator(".language-card").filter({ hasText: "Português" }).click();
        await page.getByRole("button", { name: "Iniciar teste" }).click();
        await expect(page.getByText(/Pergunta 1 de 1[45]/)).toBeVisible();

        await answerAllQuestions(page, { optionIndex: 0, count: 15 });

        await expect(page.getByRole("heading", { name: "Portuguese", level: 1 })).toBeVisible();
        await expect(page.getByText("A1", { exact: true })).toBeVisible();
    });

    test("shows a read-only summary of the latest test in Profile", async ({ authedPage: page }) => {
        await page.goto("/placement-test");
        await page.locator(".language-card").filter({ hasText: "English" }).click();
        await page.getByRole("button", { name: "Iniciar teste" }).click();
        await answerAllQuestions(page, { optionIndex: 0, count: 18 });

        await page.goto("/profile");
        await expect(page.getByText("Último teste: English A2")).toBeVisible();
    });

    test("shows a summary card in Home that updates after taking the test", async ({ authedPage: page }) => {
        await page.goto("/home");
        await expect(page.getByRole("heading", { name: "Teste de nivelamento" })).toBeVisible();
        await expect(page.getByRole("button", { name: "Fazer teste" })).toBeVisible();

        await page.getByRole("button", { name: "Fazer teste" }).click();
        await page.waitForURL("**/placement-test");
        await page.locator(".language-card").filter({ hasText: "English" }).click();
        await page.getByRole("button", { name: "Iniciar teste" }).click();
        await answerAllQuestions(page, { optionIndex: 0, count: 18 });

        await page.goto("/home");
        await expect(page.getByText("English · A2")).toBeVisible();
        await expect(page.getByRole("button", { name: "Refazer teste" })).toBeVisible();
    });

    test("is found by the universal search and navigates to the test", async ({ authedPage: page }) => {
        await page.goto("/search");
        await page.getByPlaceholder("Pesquisar...").fill("nivelamento");
        await page.waitForTimeout(500);

        await expect(page.getByRole("heading", { name: /Placement Test/ })).toBeVisible();

        await page.getByRole("button", { name: /Placement Test/ }).click();
        await page.waitForURL("**/placement-test");
    });

});
