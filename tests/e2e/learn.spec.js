import { test, expect } from "./fixtures/test-fixtures.js";
import { openModule, openLesson, completeCurrentLesson } from "./fixtures/lesson-helpers.js";

const MODULE_TITLE = "English A1";
const FIRST_LESSON = "Greetings";
const SECOND_LESSON = "Introductions";

test.describe("Learn", () => {

    test("choosing a language lands on /home", async ({ authedPage: page }) => {
        await expect(page).toHaveURL(/\/home$/);
        await expect(page.locator(".navbar__badge")).toHaveText("🇺🇸 English");
    });

    test("opens a module and its lesson list", async ({ authedPage: page }) => {
        await openModule(page, MODULE_TITLE);

        await expect(page.getByRole("heading", { name: MODULE_TITLE })).toBeVisible();
        await expect(page.getByRole("navigation", { name: "Lições do módulo" })).toBeVisible();
        await expect(page.getByRole("button", { name: `Começar ${FIRST_LESSON}` })).toBeEnabled();
    });

    test("the second lesson starts locked", async ({ authedPage: page }) => {
        await openModule(page, MODULE_TITLE);

        await expect(
            page.getByRole("button", { name: `${SECOND_LESSON} — lição bloqueada` })
        ).toBeDisabled();
    });

    test("opens the first lesson and reads through its content", async ({ authedPage: page }) => {
        await openModule(page, MODULE_TITLE);
        await openLesson(page, FIRST_LESSON);

        await expect(page.getByRole("heading", { name: FIRST_LESSON, level: 1 })).toBeVisible();
        await expect(page.locator(".lesson-navigation").getByText("Anterior")).toBeDisabled();
        await expect(page.locator(".lesson-navigation button").last()).toHaveText(/Concluir lição/);
    });

    test("completing a lesson unlocks the next one", async ({ authedPage: page }) => {
        await openModule(page, MODULE_TITLE);
        await openLesson(page, FIRST_LESSON);

        await completeCurrentLesson(page);

        // Completing lesson 1 of many navigates straight to lesson 2.
        await expect(page.getByRole("heading", { name: SECOND_LESSON, level: 1 })).toBeVisible();

        await openModule(page, MODULE_TITLE);
        await expect(
            page.getByRole("button", { name: `Começar ${SECOND_LESSON}` })
        ).toBeEnabled();
    });

    test("completing every lesson in a module reaches the completion screen", async ({ authedPage: page }) => {
        test.slow();

        await openModule(page, MODULE_TITLE);
        await openLesson(page, FIRST_LESSON);

        // Keep completing lessons until we land on the module-complete route
        // instead of another lesson - independent of exactly how many
        // lessons the module has.
        for (let guard = 0; guard < 30; guard++) {
            await completeCurrentLesson(page);

            if (/\/lessons\/module\/[^/]+\/complete$/.test(page.url())) {
                break;
            }
        }

        await expect(page).toHaveURL(/\/lessons\/module\/[^/]+\/complete$/);
        await expect(page.getByText("Módulo concluído")).toBeVisible();
        await expect(page.getByRole("heading", { name: MODULE_TITLE })).toBeVisible();
    });

});
