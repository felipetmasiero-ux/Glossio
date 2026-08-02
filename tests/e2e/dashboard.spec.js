import { test, expect } from "./fixtures/test-fixtures.js";

const DAY = 24 * 60 * 60 * 1000;

async function seedActivity(page, { events = [], flashcards = [] }) {

    await page.evaluate(({ events, flashcards }) => {
        localStorage.setItem("events", JSON.stringify(events));
        localStorage.setItem("flashcards", JSON.stringify(flashcards));
    }, { events, flashcards });

    await page.reload();

}

test.describe("Dashboard Intelligence (Home)", () => {

    test("renders every new dashboard section, with sensible empty states", async ({ authedPage: page }) => {

        await page.goto("/home");

        await expect(page.getByRole("heading", { name: "Atividade", exact: true })).toBeVisible();
        await expect(page.getByText("Últimos 90 dias")).toBeVisible();

        await expect(page.getByText("Sequência atual").first()).toBeVisible();
        await expect(page.getByText("Maior sequência")).toBeVisible();
        await expect(page.getByText("Dias este mês")).toBeVisible();

        await expect(page.getByText("Próximas revisões")).toBeVisible();
        await expect(page.getByText("Hoje", { exact: true })).toBeVisible();
        await expect(page.getByText("Amanhã", { exact: true })).toBeVisible();
        await expect(page.getByText("Próximos 7 dias", { exact: true })).toBeVisible();

        await expect(page.getByRole("heading", { name: "Atividade recente" })).toBeVisible();
        await expect(page.getByText("Nenhuma atividade ainda")).toBeVisible();

        await expect(page.getByRole("heading", { name: "Distribuição do vocabulário" })).toBeVisible();
        await expect(page.locator(".vocabulary-distribution-card__level").first()).toHaveText("A1");

        await expect(page.getByRole("heading", { name: "Evolução semanal" })).toBeVisible();
        await expect(page.locator(".weekly-evolution-card__legend")).toContainText("Revisões");
        await expect(page.locator(".weekly-evolution-card__legend")).toContainText("Lições");
        await expect(page.locator(".weekly-evolution-card__legend")).toContainText("Vídeos");

    });

    test("heatmap cells expose an accessible label per day", async ({ authedPage: page }) => {

        await page.goto("/home");

        const cells = page.locator(".activity-heatmap__cell[role='img']");

        await expect(cells).toHaveCount(90);
        await expect(cells.last()).toHaveAttribute("aria-label", /atividades? em/);

    });

    test("recent activity groups real events by day with resolved titles", async ({ authedPage: page }) => {

        await page.goto("/home");

        const now = Date.now();

        await seedActivity(page, {
            events: [
                { id: "e1", type: "LESSON_COMPLETED", timestamp: now, payload: { lessonId: "english-a1-family" } },
                { id: "e2", type: "FLASHCARD_REVIEWED", timestamp: now, payload: { cardId: "card-1" } },
                { id: "e3", type: "FLASHCARD_REVIEWED", timestamp: now, payload: { cardId: "card-2" } },
                { id: "e4", type: "VIDEO_COMPLETED", timestamp: now - DAY, payload: { videoId: "en-a1-meeting-family" } }
            ],
            flashcards: [
                { id: "card-1", word: "hello", translation: "olá", language: "English", favorite: false, createdAt: now, updatedAt: now, repetitions: 1, interval: 1, easeFactor: 2.5, nextReview: now, lastReviewedAt: now },
                { id: "card-2", word: "bye", translation: "tchau", language: "English", favorite: false, createdAt: now, updatedAt: now, repetitions: 1, interval: 1, easeFactor: 2.5, nextReview: now, lastReviewedAt: now }
            ]
        });

        await expect(page.getByText('Concluiu "Family"')).toBeVisible();
        await expect(page.getByText("Revisou 2 palavras")).toBeVisible();
        await expect(page.getByText('Assistiu "Talking About Family"')).toBeVisible();

    });

    test("upcoming reviews reflects real flashcard due dates", async ({ authedPage: page }) => {

        await page.goto("/home");

        const now = Date.now();

        await seedActivity(page, {
            events: [],
            flashcards: [
                { id: "c1", word: "hello", translation: "olá", language: "English", favorite: false, createdAt: now, updatedAt: now, repetitions: 1, interval: 1, easeFactor: 2.5, nextReview: now, lastReviewedAt: null },
                { id: "c2", word: "bye", translation: "tchau", language: "English", favorite: false, createdAt: now, updatedAt: now, repetitions: 1, interval: 1, easeFactor: 2.5, nextReview: now + DAY + 1000, lastReviewedAt: null },
                { id: "c3", word: "please", translation: "por favor", language: "English", favorite: false, createdAt: now, updatedAt: now, repetitions: 1, interval: 1, easeFactor: 2.5, nextReview: now + 5 * DAY, lastReviewedAt: null }
            ]
        });

        const rows = page.locator(".upcoming-reviews-card__row");

        await expect(rows.nth(0)).toContainText("Hoje");
        await expect(rows.nth(0)).toContainText("1");

        await expect(rows.nth(1)).toContainText("Amanhã");
        await expect(rows.nth(1)).toContainText("1");

        await expect(rows.nth(2)).toContainText("Próximos 7 dias");
        await expect(rows.nth(2)).toContainText("3");

    });

    test("stays usable on a mobile viewport: cards stack and the heatmap scrolls in place", async ({ authedPage: page }) => {

        await page.setViewportSize({ width: 375, height: 800 });
        await page.goto("/home");

        const streakBox = await page.locator(".stats-grid").first().boundingBox();
        const upcomingBox = await page.getByText("Próximas revisões").locator("..").boundingBox();

        expect(upcomingBox.y).toBeGreaterThan(streakBox.y + streakBox.height - 5);

        const heatmapScroll = page.locator(".activity-heatmap__scroll");
        await expect(heatmapScroll).toBeVisible();

        const pageHasNoHorizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
        );

        expect(pageHasNoHorizontalOverflow).toBe(true);

    });

});
