import { test, expect } from "./fixtures/test-fixtures.js";
import { makeTestUser, registerAndOnboard, submitLoginForm, chooseLanguage } from "./fixtures/auth-helpers.js";
import { openModule, openLesson, completeCurrentLesson } from "./fixtures/lesson-helpers.js";
import { goToViaNavbar } from "./fixtures/nav-helpers.js";
import { readAuthToken, waitForGoalsSynced } from "./fixtures/sync-helpers.js";

const MODULE_TITLE = "English A1";
const FIRST_LESSON = "Greetings";

async function fillGoal(page, fieldId, value) {
    await page.locator(`#${fieldId}`).fill(String(value));
}

test.describe("Study Goals", () => {

    test("is reachable from the Navbar and starts with the empty state", async ({ authedPage: page }) => {

        await goToViaNavbar(page, "Metas");
        await page.waitForURL("**/goals");

        await expect(page.getByRole("heading", { name: "Metas de estudo" })).toBeVisible();
        await expect(page.getByText("Nenhuma meta configurada ainda")).toBeVisible();

    });

    test("creates a daily lessons goal and sees it reflected on the Goals page", async ({ authedPage: page }) => {

        await page.goto("/goals");

        await fillGoal(page, "goal-dailyLessons", 2);
        await page.getByRole("button", { name: "Salvar metas" }).click();

        await expect(page.getByText("Metas salvas.")).toBeVisible();
        await expect(page.getByText("0 / 2")).toBeVisible();
        await expect(page.getByText("Complete mais 2 lições para bater a meta de hoje.")).toBeVisible();

    });

    test("creates a goal and sees the Today's Goals card appear on the dashboard", async ({ authedPage: page }) => {

        await page.goto("/goals");
        await fillGoal(page, "goal-dailyReviews", 20);
        await page.getByRole("button", { name: "Salvar metas" }).click();
        await expect(page.getByText("Metas salvas.")).toBeVisible();

        await goToViaNavbar(page, "Home");
        await page.waitForURL("**/home");

        await expect(page.getByRole("heading", { name: "Metas de hoje" })).toBeVisible();
        await expect(page.locator(".goals-progress-card__label")).toHaveText("Revisões");
        await expect(page.locator(".goals-progress-card").getByText("0 / 20")).toBeVisible();

    });

    test("editing an existing goal updates its target", async ({ authedPage: page }) => {

        await page.goto("/goals");
        await fillGoal(page, "goal-dailyLessons", 2);
        await page.getByRole("button", { name: "Salvar metas" }).click();
        await expect(page.getByText("Metas salvas.")).toBeVisible();

        await fillGoal(page, "goal-dailyLessons", 5);
        await page.getByRole("button", { name: "Salvar metas" }).click();

        await expect(page.getByText("0 / 5")).toBeVisible();

    });

    test("completing a real lesson automatically updates today's goal progress, no reload needed", async ({ authedPage: page }) => {

        await page.goto("/goals");
        await fillGoal(page, "goal-dailyLessons", 2);
        await page.getByRole("button", { name: "Salvar metas" }).click();
        await expect(page.getByText("Metas salvas.")).toBeVisible();

        await openModule(page, MODULE_TITLE);
        await openLesson(page, FIRST_LESSON);
        await completeCurrentLesson(page);

        await goToViaNavbar(page, "Home");
        await page.waitForURL("**/home");

        await expect(page.locator(".goals-progress-card").getByText("1 / 2")).toBeVisible();
        await expect(page.getByText("Você só precisa de mais 1 lição hoje.")).toBeVisible();

    });

    test("shows the last 7 days history, with today reflecting whether the goal was met", async ({ authedPage: page }) => {

        await page.goto("/goals");
        await fillGoal(page, "goal-dailyLessons", 1);
        await page.getByRole("button", { name: "Salvar metas" }).click();
        await expect(page.getByText("Metas salvas.")).toBeVisible();

        const todayCell = page.locator(".goal-history-strip__day").filter({ hasText: "Hoje" });
        await expect(todayCell).toHaveClass(/goal-history-strip__day--missed/);

        await openModule(page, MODULE_TITLE);
        await openLesson(page, FIRST_LESSON);
        await completeCurrentLesson(page);

        await goToViaNavbar(page, "Metas");
        await page.waitForURL("**/goals");

        await expect(page.locator(".goal-history-strip__day").filter({ hasText: "Hoje" })).toHaveClass(/goal-history-strip__day--completed/);

    });

    test("goals persist after a full page reload", async ({ authedPage: page }) => {

        await page.goto("/goals");
        await fillGoal(page, "goal-weeklyMinutes", 240);
        await page.getByRole("button", { name: "Salvar metas" }).click();
        await expect(page.getByText("Metas salvas.")).toBeVisible();

        await page.reload();

        await expect(page.locator("#goal-weeklyMinutes")).toHaveValue("240");

    });

    test("syncs a configured goal to another device after logging in", async ({ browser, request }) => {

        const user = makeTestUser("goals-sync");

        const contextA = await browser.newContext();
        const pageA = await contextA.newPage();

        await registerAndOnboard(pageA, user, "English");
        await pageA.goto("/goals");
        await fillGoal(pageA, "goal-dailyLessons", 3);
        await pageA.getByRole("button", { name: "Salvar metas" }).click();
        await expect(pageA.getByText("Metas salvas.")).toBeVisible();

        const token = await readAuthToken(pageA);
        expect(token).toBeTruthy();

        await waitForGoalsSynced(request, token, "dailyLessons", 3);

        const contextB = await browser.newContext();
        const pageB = await contextB.newPage();

        await submitLoginForm(pageB, user);
        await chooseLanguage(pageB, "English");

        await pageB.goto("/goals");
        await expect(pageB.locator("#goal-dailyLessons")).toHaveValue("3");

        await contextA.close();
        await contextB.close();

    });

});
