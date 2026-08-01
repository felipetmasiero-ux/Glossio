import { test, expect } from "./fixtures/test-fixtures.js";
import { openModule, openLesson, completeCurrentLesson } from "./fixtures/lesson-helpers.js";
import { addFlashcardFromLessonVocabulary } from "./fixtures/flashcard-helpers.js";
import { goToMyFlashcards } from "./fixtures/nav-helpers.js";

async function seedTwoCollections(page) {
    await openModule(page, "English A1");
    await openLesson(page, "Greetings");
    await addFlashcardFromLessonVocabulary(page, "hello");
    await completeCurrentLesson(page); // lands on the Introductions lesson

    await expect(page.getByRole("heading", { name: "Introductions", level: 1 })).toBeVisible();
    await addFlashcardFromLessonVocabulary(page, "Nice to meet you.");
}

test.describe("Collect", () => {

    // "hello" (Greetings lesson) and "Nice to meet you." (Introductions
    // lesson) carry different dictionary topics ("greetings"/"introductions"),
    // so they land in two separate collections - Sprint 33 fixed the language-
    // casing bug (DictionaryRepository.getEntry received "English" from
    // LanguageContext but the dictionary is keyed by lowercase "english") that
    // used to send every flashcard into "Outros" regardless of its real topic.
    test("flashcards are listed and counted, grouped by their real topic", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);

        await expect(page.getByText("2 palavras · 2 tópicos")).toBeVisible();
        await expect(page.getByRole("heading", { name: "Cumprimentos", level: 3 })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Apresentações", level: 3 })).toBeVisible();

        await page.getByRole("heading", { name: "Cumprimentos" }).click();
        await expect(page.locator(".flashcard-item").filter({ hasText: "hello" })).toBeVisible();

        await page.getByRole("heading", { name: "Apresentações" }).click();
        await expect(page.locator(".flashcard-item").filter({ hasText: "Nice to meet you." })).toBeVisible();
    });

    test("searching filters flashcards by word or translation", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);
        await page.getByPlaceholder("Buscar...").fill("hello");

        await expect(page.getByText("hello", { exact: true })).toBeVisible();
        await expect(page.locator(".flashcard-item").filter({ hasText: "Nice to meet you." })).toHaveCount(0);
    });

    test("removes a flashcard from the collection", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);
        await page.getByRole("heading", { name: "Cumprimentos" }).click(); // expand the collection

        const card = page.locator(".flashcard-item").filter({ hasText: "hello" });
        await expect(card).toBeVisible();
        await card.getByRole("button", { name: "Excluir" }).click();

        await expect(card).toHaveCount(0);
        await expect(page.getByText("1 palavras · 1 tópicos")).toBeVisible();
    });

});
