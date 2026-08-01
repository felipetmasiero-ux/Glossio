/**
 * Navigates via the navbar's in-app links (client-side routing) rather
 * than page.goto(). A hard page.goto() forces a full reload, which
 * remounts useCloudSync and re-hydrates from the server - if a change was
 * just made locally and hasn't been pushed yet (cloud sync pushes on an
 * interval), the hydrate can overwrite it with stale server data. Real
 * users navigating inside the app never trigger this; only a hard refresh
 * would, which is a cloud-sync concern this test suite isn't here to fix.
 */
export async function goToViaNavbar(page, label) {
    await page.getByRole("link", { name: label, exact: true }).click();
}

/** Reaches My Flashcards (/my-flashcards) the way a user would: Flashcards -> "Ver coleção completa". */
export async function goToMyFlashcards(page) {
    await goToViaNavbar(page, "Flashcards");
    await page.getByRole("link", { name: "Ver coleção completa" }).click();
}
