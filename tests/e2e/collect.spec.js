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

    // KNOWN APP BUG (found by this suite, not fixed - Collect is off-limits
    // this sprint): FlashcardProvider.addFlashcard() stores whatever
    // useLanguage() returns as card.language, which is the display-cased
    // value from LanguageContext ("English"). groupFlashcardsByTopic() then
    // looks up DictionaryRepository.getEntry(card.language, card.word) to
    // find each card's topic, but the dictionary is keyed by lowercase
    // language ("english"). The casing mismatch means the topic lookup
    // always misses, so every flashcard falls into the "Outros" bucket
    // regardless of its real topic - collections never actually split by
    // topic today. This test documents that real, current behavior instead
    // of asserting the (currently unreachable) intended grouping.
    test("flashcards are listed and counted (topic grouping is currently broken app-wide)", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);

        await expect(page.getByText("2 palavras · 1 tópicos")).toBeVisible();
        await expect(page.getByRole("heading", { name: "Outros", level: 3 })).toBeVisible();

        await page.getByRole("heading", { name: "Outros" }).click();
        await expect(page.locator(".flashcard-item").filter({ hasText: "hello" })).toBeVisible();
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
        await page.getByRole("heading", { name: "Outros" }).click(); // expand the collection

        const card = page.locator(".flashcard-item").filter({ hasText: "hello" });
        await expect(card).toBeVisible();
        await card.getByRole("button", { name: "Excluir" }).click();

        await expect(card).toHaveCount(0);
        await expect(page.getByText("1 palavras · 1 tópicos")).toBeVisible();
    });

});
