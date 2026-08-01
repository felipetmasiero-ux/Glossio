import { expect } from "@playwright/test";

/**
 * From wherever the app currently is, opens a module card by its exact
 * title. Navigates via the in-app "Cursos" link (client-side routing)
 * rather than page.goto("/lessons") - a full page load remounts
 * useCloudSync, which re-hydrates from the server and can race a change
 * that hasn't been pushed there yet (cloud sync pushes on an interval).
 * Real users hit this the same way (a hard refresh right after finishing
 * something can revert it) but that's a cloud-sync concern, not something
 * this Learn-flow test should be tripped up by.
 */
export async function openModule(page, moduleTitle) {
    if (new URL(page.url()).pathname !== "/lessons") {
        await page.getByRole("link", { name: "Cursos" }).click();
        await page.waitForURL("**/lessons");
    }

    await page.locator(".module-row").filter({ hasText: moduleTitle }).click();
    await page.waitForURL("**/lessons/module/**");
}

/** From a module's lesson list, opens an unlocked lesson by its title. */
export async function openLesson(page, lessonTitle) {
    await page.getByRole("button", { name: `Começar ${lessonTitle}` }).click();
    await page.waitForURL(/\/lessons\/[^/]+$/);
}

/**
 * Advances the lesson reader to its end and clicks "Concluir lição".
 * Every lesson in the app is currently a single step (nothing uses the
 * `step()` block builder), so the primary nav button is always already
 * "Concluir lição" - this loop is written to also cope with a lesson that
 * does have multiple steps, without assuming today's content shape.
 */
export async function completeCurrentLesson(page) {
    const nextButton = page.locator(".lesson-navigation button").last();

    while ((await nextButton.textContent())?.includes("Continuar leitura")) {
        await nextButton.click();
    }

    await expect(nextButton).toHaveText(/Concluir lição/);
    await nextButton.click();
}
