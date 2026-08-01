import { test, expect } from "./fixtures/test-fixtures.js";

test.describe("Grammar Reference", () => {

    test("opens from the navbar and shows a default topic's content", async ({ authedPage: page }) => {
        await page.getByRole("link", { name: "Gramática", exact: true }).click();
        await page.waitForURL("**/grammar");

        await expect(page.getByRole("heading", { name: "Central de gramática" })).toBeVisible();
        // Organized by language and level, like the existing modules.
        await expect(page.getByRole("heading", { name: "English A1" })).toBeVisible();

        const content = page.locator(".grammar-page__content");
        await expect(content.getByRole("heading", { level: 2 })).toBeVisible();
    });

    test("switching topics opens the new content immediately, in the same page", async ({ authedPage: page }) => {
        await page.goto("/grammar");

        const content = page.locator(".grammar-page__content");

        await page.getByRole("button", { name: /Some vs Any/ }).click();
        await expect(content.getByRole("heading", { name: "Some vs Any", level: 2 })).toBeVisible();
        await expect(page).toHaveURL(/\/grammar$/); // no route change per topic

        await page.getByRole("button", { name: /Possessive 's/ }).click();
        await expect(content.getByRole("heading", { name: "Possessive 's", level: 2 })).toBeVisible();
    });

    test("shows rules, examples, and a related lesson/exercises link for a topic", async ({ authedPage: page }) => {
        await page.goto("/grammar");

        const content = page.locator(".grammar-page__content");
        await expect(content.getByRole("heading", { name: "Present Simple", level: 2 })).toBeVisible();

        await expect(content.getByText("Regras")).toBeVisible();
        await expect(content.getByText("Exemplos")).toBeVisible();
        await expect(content.getByText("Relacionado")).toBeVisible();
        await expect(content.getByRole("link", { name: /Lição: Present Simple/ })).toBeVisible();
        await expect(content.getByRole("link", { name: "Exercícios" })).toBeVisible();
    });

    test("searches within the grammar reference by title, rule, and example", async ({ authedPage: page }) => {
        await page.goto("/grammar");

        const search = page.getByPlaceholder("Buscar na gramática...");

        await search.fill("First Conditional");
        await expect(page.getByRole("button", { name: /First Conditional/ })).toBeVisible();
        await expect(page.getByRole("button", { name: /Present Simple/ })).toHaveCount(0);

        await search.fill("hospital"); // only appears in Present Simple's example
        await expect(page.getByRole("button", { name: /Present Simple/ })).toBeVisible();

        await search.fill("xyznotarealterm");
        await expect(page.getByText("Nenhum resultado encontrado.")).toBeVisible();
    });

    test("opens the accordion inline on a mobile-sized viewport", async ({ authedPage: page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto("/grammar");

        await expect(page.locator(".grammar-page__content")).toBeHidden();

        await page.getByRole("button", { name: /Some vs Any/ }).click();

        const mobileContent = page.locator(".grammar-nav-item__mobile-content");
        await expect(mobileContent.getByRole("heading", { name: "Some vs Any", level: 2 })).toBeVisible();
    });

    test("opens the full reference from a lesson's grammar block", async ({ authedPage: page }) => {
        await page.evaluate(() => {
            localStorage.setItem("lessonProgress", JSON.stringify([
                "english-a1-greetings", "english-a1-introductions", "english-a1-countries",
                "english-a1-numbers", "english-a1-days-months", "english-a1-family", "english-a1-jobs"
            ]));
        });

        await page.goto("/lessons/english-a1-present-simple");

        const link = page.getByRole("link", { name: "Ver referência completa" }).first();
        await expect(link).toBeVisible();
        await link.click();

        await page.waitForURL(/\/grammar\?topic=english-a1-present-simple/);
        await expect(
            page.locator(".grammar-page__content").getByRole("heading", { name: "Present Simple", level: 2 })
        ).toBeVisible();
    });

    test("opens a grammar topic from the universal search", async ({ authedPage: page }) => {
        await page.goto("/search");
        await page.getByPlaceholder("Pesquisar...").fill("Present Simple");
        await page.waitForTimeout(500);

        const grammarSection = page.getByRole("heading", { name: /Gramática/ });
        await expect(grammarSection).toBeVisible();

        const grammarResult = page.locator(".search-result-row", { hasText: "Presente simples" });
        await grammarResult.getByRole("button", { name: /Present Simple/ }).click();

        await page.waitForURL(/\/grammar\?topic=english-a1-present-simple/);
        await expect(
            page.locator(".grammar-page__content").getByRole("heading", { name: "Present Simple", level: 2 })
        ).toBeVisible();
    });

});
