import { test, expect } from "./fixtures/test-fixtures.js";
import { makeTestUser, registerAndOnboard, submitLoginForm, chooseLanguage } from "./fixtures/auth-helpers.js";
import { openModule, openLesson } from "./fixtures/lesson-helpers.js";
import { addFlashcardFromLessonVocabulary } from "./fixtures/flashcard-helpers.js";
import { goToMyFlashcards } from "./fixtures/nav-helpers.js";
import { readAuthToken, waitForFlashcardSynced } from "./fixtures/sync-helpers.js";

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
        await pageB.getByRole("heading", { name: "Cumprimentos" }).click();
        await expect(pageB.locator(".flashcard-item").filter({ hasText: "hello" })).toBeVisible();

        await contextA.close();
        await contextB.close();
    });

    test("favoriting a flashcard in one browser shows up favorited after logging in from another", async ({ browser, request }) => {
        const user = makeTestUser("favorite-sync");

        const contextA = await browser.newContext();
        const pageA = await contextA.newPage();

        await registerAndOnboard(pageA, user, "English");
        await openModule(pageA, "English A1");
        await openLesson(pageA, "Greetings");
        await addFlashcardFromLessonVocabulary(pageA, "hello");

        await goToMyFlashcards(pageA);
        await pageA.getByRole("heading", { name: "Cumprimentos" }).click();
        await pageA.locator(".flashcard-item").filter({ hasText: "hello" })
            .getByRole("button", { name: "Adicionar aos favoritos" }).click();

        const token = await readAuthToken(pageA);
        await expect(async () => {
            const response = await request.get("http://localhost:4000/api/flashcards", {
                headers: { Authorization: `Bearer ${token}` }
            });
            expect(response.ok()).toBeTruthy();
            const cards = await response.json();
            expect(cards.some(card => card.word.toLowerCase() === "hello" && card.favorite)).toBeTruthy();
        }).toPass({ timeout: 20_000, intervals: [500, 1000, 2000] });

        const contextB = await browser.newContext();
        const pageB = await contextB.newPage();

        await submitLoginForm(pageB, user);
        await chooseLanguage(pageB, "English");

        await goToMyFlashcards(pageB);
        await pageB.getByRole("heading", { name: "Cumprimentos" }).click();
        await expect(
            pageB.locator(".flashcard-item").filter({ hasText: "hello" })
                .getByRole("button", { name: "Remover dos favoritos" })
        ).toBeVisible();

        await contextA.close();
        await contextB.close();
    });

    // Regression test (Sprint 33) for the project's most serious known bug:
    // cloud sync only pushes local changes every 8s (or on pagehide), and
    // hydrate() used to unconditionally overwrite local state with whatever
    // the server still had on file - so refreshing right after a change,
    // before either of those had a chance to run, silently reverted it. The
    // fix tracks a persisted "last confirmed synced" marker per resource and
    // only lets the server overwrite local when local still matches it.
    test("a local change survives an immediate refresh, before the periodic push fires", async ({ page, request }) => {
        const user = makeTestUser("refresh-race");
        await registerAndOnboard(page, user, "English");

        await openModule(page, "English A1");
        await openLesson(page, "Greetings");
        await addFlashcardFromLessonVocabulary(page, "hello");

        await page.reload();

        await goToMyFlashcards(page);
        await page.getByRole("heading", { name: "Cumprimentos" }).click();
        await expect(page.locator(".flashcard-item").filter({ hasText: "hello" })).toBeVisible({ timeout: 15_000 });

        // It should still reach the server eventually too - either via the
        // pagehide-triggered flush right before the reload, or the next tick.
        const token = await readAuthToken(page);
        await waitForFlashcardSynced(request, token, "hello");
    });

});
