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

        await expect(page.getByText("2 palavras · 0 favoritas · 2 tópicos")).toBeVisible();
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
        await expect(page.getByText("1 palavras · 0 favoritas · 1 tópicos")).toBeVisible();
    });

    test("favoriting a card fills the star and updates the collection info", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);
        await page.getByRole("heading", { name: "Cumprimentos" }).click();

        const card = page.locator(".flashcard-item").filter({ hasText: "hello" });
        const star = card.getByRole("button", { name: "Adicionar aos favoritos" });

        await star.click();

        await expect(card.getByRole("button", { name: "Remover dos favoritos" })).toBeVisible();
        await expect(page.getByText("2 palavras · 1 favoritas · 2 tópicos")).toBeVisible();
    });

    test("unfavoriting a card empties the star and updates the collection info", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);
        await page.getByRole("heading", { name: "Cumprimentos" }).click();

        const card = page.locator(".flashcard-item").filter({ hasText: "hello" });
        await card.getByRole("button", { name: "Adicionar aos favoritos" }).click();
        await expect(card.getByRole("button", { name: "Remover dos favoritos" })).toBeVisible();

        await card.getByRole("button", { name: "Remover dos favoritos" }).click();

        await expect(card.getByRole("button", { name: "Adicionar aos favoritos" })).toBeVisible();
        await expect(page.getByText("2 palavras · 0 favoritas · 2 tópicos")).toBeVisible();
    });

    test("the favorites-only filter shows only favorited cards, combined with search", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);
        await page.getByRole("heading", { name: "Cumprimentos" }).click();
        await page.locator(".flashcard-item").filter({ hasText: "hello" })
            .getByRole("button", { name: "Adicionar aos favoritos" }).click();

        await page.getByRole("button", { name: "Favoritos", exact: true }).click();

        await expect(page.getByText("1 palavras · 1 favoritas · 1 tópicos")).toBeVisible();
        await expect(page.locator(".flashcard-item").filter({ hasText: "hello" })).toBeVisible();
        await expect(page.locator(".flashcard-item").filter({ hasText: "Nice to meet you." })).toHaveCount(0);

        await page.getByRole("button", { name: "Todos", exact: true }).click();
        await expect(page.getByText("2 palavras · 1 favoritas · 2 tópicos")).toBeVisible();
    });

    test("favorite state persists after a full page reload", async ({ authedPage: page }) => {
        await seedTwoCollections(page);

        await goToMyFlashcards(page);
        await page.getByRole("heading", { name: "Cumprimentos" }).click();
        await page.locator(".flashcard-item").filter({ hasText: "hello" })
            .getByRole("button", { name: "Adicionar aos favoritos" }).click();

        await page.reload();

        // Cloud sync re-hydrates on reload before this renders; give it room
        // under real network/db latency (same pattern used elsewhere).
        await page.getByRole("heading", { name: "Cumprimentos" }).click();
        await expect(
            page.locator(".flashcard-item").filter({ hasText: "hello" })
                .getByRole("button", { name: "Remover dos favoritos" })
        ).toBeVisible({ timeout: 15_000 });
    });

    test("sorting alphabetically orders cards within a collection by word", async ({ authedPage: page }) => {
        await openModule(page, "English A1");
        await openLesson(page, "Greetings");
        await addFlashcardFromLessonVocabulary(page, "Good night");
        await addFlashcardFromLessonVocabulary(page, "hello");

        await goToMyFlashcards(page);
        await page.getByRole("heading", { name: "Cumprimentos" }).click();

        await page.getByLabel("Ordenar por").selectOption("alpha");

        const words = page.locator(".flashcard-item h3");
        await expect(words.first()).toHaveText(/good night/i);
        await expect(words.nth(1)).toHaveText(/hello/i);
    });

});
