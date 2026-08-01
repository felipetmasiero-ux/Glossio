import { test, expect } from "./fixtures/test-fixtures.js";
import { openModule, openLesson } from "./fixtures/lesson-helpers.js";
import { addFlashcardFromLessonVocabulary } from "./fixtures/flashcard-helpers.js";
import { goToViaNavbar } from "./fixtures/nav-helpers.js";

const WORD = "hello";

async function addOneFlashcard(page) {
    await openModule(page, "English A1");
    await openLesson(page, "Greetings");
    await addFlashcardFromLessonVocabulary(page, WORD);
}

test.describe("Review", () => {

    test("adding a flashcard updates the home dashboard", async ({ authedPage: page }) => {
        await addOneFlashcard(page);

        await goToViaNavbar(page, "Home");
        const wordsLearnedCard = page.locator(".stats-card").filter({ hasText: "Palavras aprendidas" });
        await expect(wordsLearnedCard.locator(".stats-card__value")).toHaveText("1");

        await expect(page.getByText("Flashcards para revisar")).toBeVisible();
        await expect(page.getByText("1 ficha esperando")).toBeVisible();
    });

    test("starts a session, answers a card, and finishes it", async ({ authedPage: page }) => {
        await addOneFlashcard(page);

        await goToViaNavbar(page, "Flashcards");
        await page.getByRole("button", { name: "Começar a estudar" }).click();

        await expect(page.getByText(WORD, { exact: false })).toBeVisible();
        await page.getByRole("button", { name: "Revelar" }).click();

        await expect(page.locator(".answer-buttons")).toBeVisible();
        await page.getByRole("button", { name: "Bom" }).click();

        await expect(page.getByText("Sessão concluída")).toBeVisible();
        await expect(page.getByRole("heading", { name: "Muito bem!" })).toBeVisible();
    });

    test("finishing the only due review clears it from the home dashboard", async ({ authedPage: page }) => {
        await addOneFlashcard(page);

        await goToViaNavbar(page, "Flashcards");
        await page.getByRole("button", { name: "Começar a estudar" }).click();
        await page.getByRole("button", { name: "Revelar" }).click();
        await page.getByRole("button", { name: "Fácil" }).click();
        await expect(page.getByText("Sessão concluída")).toBeVisible();

        await goToViaNavbar(page, "Home");
        await expect(page.getByText("Tudo em dia!")).toBeVisible();
        await expect(page.getByText("Nenhuma revisão pendente hoje.")).toBeVisible();
    });

});
