import { expect } from "@playwright/test";

/**
 * Adds a flashcard from a lesson's Vocabulary section: flips the card to
 * reveal the translation, opens the word popup, then confirms "Adicionar".
 * The lesson-variant WordPopup closes itself right after adding.
 */
export async function addFlashcardFromLessonVocabulary(page, word) {
    const cards = page.locator(".vocabulary-card");

    // .count() does not auto-wait like other locator actions - it just
    // reads whatever is in the DOM right now, so wait for the section to
    // have actually rendered first.
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();

    let index = -1;
    for (let i = 0; i < count; i++) {
        if ((await cards.nth(i).textContent())?.toLowerCase().includes(word.toLowerCase())) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        throw new Error(`No vocabulary card found containing "${word}"`);
    }

    const card = cards.nth(index);
    await card.click(); // reveal translation
    await card.click(); // open the word popup

    await page.getByRole("button", { name: /Adicionar/ }).click();
}
