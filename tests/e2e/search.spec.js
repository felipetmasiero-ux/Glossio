import { test, expect } from "./fixtures/test-fixtures.js";
import { openModule, openLesson } from "./fixtures/lesson-helpers.js";
import { addFlashcardFromLessonVocabulary } from "./fixtures/flashcard-helpers.js";

async function search(page, term) {
    await page.goto("/search");
    await page.getByPlaceholder("Pesquisar...").fill(term);
    // Real-time, debounced (~200ms) - no submit button to click.
    await page.waitForTimeout(500);
}

test.describe("Universal Search", () => {

    test("the navbar search icon opens the search page", async ({ authedPage: page }) => {
        await page.getByRole("link", { name: "Buscar" }).click();
        await page.waitForURL("**/search");
        await expect(page.getByRole("heading", { name: "Pesquisa universal" })).toBeVisible();
    });

    test("shows a prompt before anything is typed, and searches in real time without a submit button", async ({ authedPage: page }) => {
        await page.goto("/search");

        await expect(page.getByText("Busque em todo o Glossio")).toBeVisible();
        await expect(page.getByRole("button", { name: /search/i })).toHaveCount(0);

        await page.getByPlaceholder("Pesquisar...").fill("greetings");
        await expect(page.getByRole("heading", { name: /Lições/ })).toBeVisible({ timeout: 2_000 });
    });

    test("shows the empty state for a query that matches nothing", async ({ authedPage: page }) => {
        await search(page, "xyznotarealquery123");

        await expect(page.getByText("Nenhum resultado encontrado.")).toBeVisible();
        await expect(page.getByText("Tente outra palavra.")).toBeVisible();
    });

    test("finds and opens a lesson by title", async ({ authedPage: page }) => {
        await search(page, "Greetings");

        const lessonsSection = page.getByRole("heading", { name: /Lições/ });
        await expect(lessonsSection).toBeVisible();

        const result = page.getByRole("button", { name: /Greetings/ });
        await expect(result).toBeVisible();
        await expect(result).toContainText("English");
        await expect(result).toContainText("A1");

        await result.click();
        await page.waitForURL(/\/lessons\/[^/]+$/);
        await expect(page.getByRole("heading", { name: "Greetings", level: 1 })).toBeVisible();
    });

    test("finds and opens a video by title", async ({ authedPage: page }) => {
        await search(page, "Ordering Coffee");

        const result = page.getByRole("button", { name: /Ordering Coffee/ });
        await expect(result).toBeVisible();
        await expect(result).toContainText("Explore");

        await result.click();
        await page.waitForURL(/\/explore\/[^/]+$/);
        await expect(page.getByRole("heading", { name: "Ordering Coffee at a Café", level: 1 })).toBeVisible();
    });

    test("finds a dictionary word and expands an inline preview without navigating or opening a modal", async ({ authedPage: page }) => {
        await search(page, "hello");

        const result = page.getByRole("button", { name: /^hello/ });
        await expect(result).toBeVisible();
        await expect(result).toContainText("olá");
        await expect(result).toHaveAttribute("aria-expanded", "false");

        await result.click();

        await expect(result).toHaveAttribute("aria-expanded", "true");
        await expect(page.getByText("Hello! Welcome to Glossio.")).toBeVisible();
        // Still the same page - a lookup, not a page navigation.
        await expect(page).toHaveURL(/\/search$/);
        // No "add to flashcards" action here - pure consultation.
        await expect(page.getByRole("button", { name: /Adicionar/ })).toHaveCount(0);
    });

    test("finds a flashcard and opens it in the collection, prefilling its search", async ({ authedPage: page }) => {
        await openModule(page, "English A1");
        await openLesson(page, "Greetings");
        await addFlashcardFromLessonVocabulary(page, "hello");

        await search(page, "hello");

        const flashcardsSection = page.getByRole("heading", { name: /Flashcards/ });
        await expect(flashcardsSection).toBeVisible();

        const result = page.getByRole("button", { name: /^hello/ }).last();
        await result.click();

        await page.waitForURL(/\/my-flashcards/);
        await expect(page.getByPlaceholder("Buscar...")).toHaveValue("hello");
        await expect(page.locator(".flashcard-item").filter({ hasText: "hello" })).toBeVisible();
    });

    test("ranks an exact title match above a match found only via topic or description", async ({ authedPage: page }) => {
        await search(page, "greet");

        const rows = page.locator(".search-result-row__title");
        // "Greetings" (title starts with "greet") must outrank any lesson that
        // only matched through its topic/module/subtitle.
        await expect(rows.first()).toHaveText(/greet/i);
    });

    test("highlights the matched substring within a result's title", async ({ authedPage: page }) => {
        // "rant" only appears mid-word, inside "Restaurant" - not a prefix
        // match - confirming the highlight isn't limited to the start of the word.
        await search(page, "rant");

        const result = page.getByRole("button", { name: /At the Restaurant/ }).first();
        await expect(result).toBeVisible();
        await expect(result.locator("mark")).toHaveText(/rant/i);
    });

});
