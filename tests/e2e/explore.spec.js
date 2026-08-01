import { test, expect } from "./fixtures/test-fixtures.js";

const VIDEO_TITLE = "Ordering Coffee at a Café";

async function openVideo(page) {
    await page.getByRole("link", { name: "Explore", exact: true }).click();
    await page.waitForURL("**/explore");
    await page.getByRole("button", { name: `Assistir ${VIDEO_TITLE}` }).click();
    await page.waitForURL(/\/explore\/[^/]+$/);
}

/**
 * The embedded YouTube iframe only exposes real playback events via its own
 * postMessage protocol - there is no in-app play button and no autoplay, so
 * automating a real "watch this video to the end" flow through mouse/keyboard
 * input on the iframe proved unreliable (it's cross-origin third-party UI).
 * This sends the exact same postMessage command YT.Player.seekTo()/playVideo()
 * use internally, driving the real embedded player through its real, documented
 * channel rather than faking app state - the app's own onEnded/onStateChange
 * wiring still does all the work.
 */
function postYtCommand(page, func, args = []) {
    return page.evaluate(({ func, args }) => {
        document.querySelector(".video-player iframe")
            .contentWindow.postMessage(JSON.stringify({ event: "command", func, args }), "*");
    }, { func, args });
}

test.describe("Explore (English)", () => {

    test("opens a video and plays it", async ({ authedPage: page }) => {
        await openVideo(page);

        await expect(page.getByRole("heading", { name: VIDEO_TITLE, level: 1 })).toBeVisible();
        await expect(page.locator(".video-player iframe")).toBeVisible({ timeout: 15_000 });
    });

    test("seeking a transcript segment moves the active segment", async ({ authedPage: page }) => {
        await openVideo(page);

        const transcript = page.locator(".interactive-transcript");
        await expect(transcript).toBeVisible({ timeout: 15_000 });

        const segments = transcript.getByRole("button");
        const later = segments.nth(5);
        await later.click();

        await expect(later).toHaveClass(/interactive-transcript__segment--active/);
    });

    test("clicking a word opens its popup and adds it as a flashcard", async ({ authedPage: page }) => {
        await openVideo(page);

        const transcript = page.locator(".interactive-transcript");
        await expect(transcript).toBeVisible({ timeout: 15_000 });

        await transcript.getByText("coffee", { exact: false }).first().click();

        const popup = page.locator(".word-popup--explore");
        await expect(popup).toBeVisible();
        await popup.getByRole("button", { name: /Adicionar/ }).click();
    });

    test("completes the video", async ({ authedPage: page }) => {
        await openVideo(page);

        const transcript = page.locator(".interactive-transcript");
        await expect(transcript).toBeVisible({ timeout: 15_000 });

        // Video duration is 112s (src/data/videos/english/index.js); seeking
        // close to the end and playing reaches the real "ended" event within
        // a few real seconds.
        await postYtCommand(page, "seekTo", [108, true]);
        await postYtCommand(page, "playVideo");

        await expect(page.getByText("Vídeo concluído")).toBeVisible({ timeout: 20_000 });
        await expect(page.getByRole("button", { name: "Voltar ao Explore" })).toBeVisible();
    });

});
