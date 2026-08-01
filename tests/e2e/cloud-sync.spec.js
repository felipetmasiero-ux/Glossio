import { test, expect } from "./fixtures/test-fixtures.js";
import { makeTestUser, registerAndOnboard, submitLoginForm, chooseLanguage } from "./fixtures/auth-helpers.js";
import { openModule, openLesson } from "./fixtures/lesson-helpers.js";
import { addFlashcardFromLessonVocabulary } from "./fixtures/flashcard-helpers.js";
import { goToMyFlashcards } from "./fixtures/nav-helpers.js";

const API_URL = "http://localhost:4000/api";

/** Reads the JWT AuthProvider stores in localStorage under "authToken". */
async function readAuthToken(page) {
    return page.evaluate(() => localStorage.getItem("authToken"));
}

/**
 * Cloud sync only pushes on an interval (or on pagehide), so instead of an
 * arbitrary sleep we poll the real backend until the change we expect has
 * actually landed - an explicit wait on real state, not on a clock.
 */
async function waitForFlashcardSynced(request, token, word) {
    await expect(async () => {
        const response = await request.get(`${API_URL}/flashcards`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        expect(response.ok()).toBeTruthy();
        const cards = await response.json();
        expect(cards.some(card => card.word.toLowerCase() === word.toLowerCase())).toBeTruthy();
    }).toPass({ timeout: 20_000, intervals: [500, 1000, 2000] });
}

test.describe("Cloud Sync", () => {

    test("a flashcard added in one browser appears after logging in from another", async ({ browser, request }) => {
        const user = makeTestUser("cloud-sync");

        const contextA = await browser.newContext();
        const pageA = await contextA.newPage();

        await registerAndOnboard(pageA, user, "English");
        await openModule(pageA, "English A1");
        await openLesson(pageA, "Greetings");
        await addFlashcardFromLessonVocabulary(pageA, "hello");

        const token = await readAuthToken(pageA);
        expect(token).toBeTruthy();

        await waitForFlashcardSynced(request, token, "hello");

        const contextB = await browser.newContext();
        const pageB = await contextB.newPage();

        await submitLoginForm(pageB, user);
        // A brand-new browser has no "language" in its own localStorage yet
        // (that preference isn't part of what cloud sync carries over), so
        // logging in from it lands on the language picker, same as any
        // other first-time device for this account.
        await chooseLanguage(pageB, "English");

        await goToMyFlashcards(pageB);
        // NOTE: flashcards are always grouped under "Outros" today due to a
        // real app bug (see collect.spec.js) - not something this test is
        // meant to catch, so we just open whatever single collection exists.
        await pageB.getByRole("heading", { name: "Outros" }).click();
        await expect(pageB.locator(".flashcard-item").filter({ hasText: "hello" })).toBeVisible();

        await contextA.close();
        await contextB.close();
    });

});
