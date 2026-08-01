import { expect } from "@playwright/test";

const API_URL = "http://localhost:4000/api";

/** Reads the JWT AuthProvider stores in localStorage under "authToken". */
export async function readAuthToken(page) {
    return page.evaluate(() => localStorage.getItem("authToken"));
}

/**
 * Cloud sync only pushes on an interval (or on pagehide), so instead of an
 * arbitrary sleep we poll the real backend until the change we expect has
 * actually landed - an explicit wait on real state, not on a clock.
 */
export async function waitForFlashcardSynced(request, token, word) {
    await expect(async () => {
        const response = await request.get(`${API_URL}/flashcards`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        expect(response.ok()).toBeTruthy();
        const cards = await response.json();
        expect(cards.some(card => card.word.toLowerCase() === word.toLowerCase())).toBeTruthy();
    }).toPass({ timeout: 20_000, intervals: [500, 1000, 2000] });
}
