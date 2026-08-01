import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const APP_JSX = path.join(ROOT, "src/App.jsx");

test.describe("PWA", () => {

    test("registers a service worker that controls the page", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        // A page is only "controlled" from its second load onward.
        await page.reload();
        await page.waitForLoadState("networkidle");

        const state = await page.evaluate(async () => {
            const reg = await navigator.serviceWorker.getRegistration();
            return {
                hasRegistration: !!reg,
                hasController: !!navigator.serviceWorker.controller
            };
        });

        expect(state.hasRegistration).toBe(true);
        expect(state.hasController).toBe(true);
    });

    test("exposes a valid, linked web manifest", async ({ page }) => {
        await page.goto("/");

        const manifestHref = await page.locator('link[rel="manifest"]').getAttribute("href");
        expect(manifestHref).toBeTruthy();

        const response = await page.request.get(manifestHref);
        expect(response.ok()).toBeTruthy();

        const manifest = await response.json();
        expect(manifest.name).toBe("Glossio");
        expect(manifest.short_name).toBe("Glossio");
        expect(manifest.display).toBe("standalone");
        expect(manifest.theme_color).toBe("#2C3E63");

        const sizes = manifest.icons.map(icon => icon.sizes);
        expect(sizes).toEqual(expect.arrayContaining(["192x192", "512x512"]));
        expect(manifest.icons.some(icon => icon.purpose === "maskable")).toBe(true);
    });

    test("serves the cached app shell for a public route while offline", async ({ page, context }) => {
        // The HTML cache is keyed per exact URL (NetworkFirst), so the
        // specific route being asserted offline must have been visited for
        // real first - visiting "/" doesn't warm up "/login" too.
        await page.goto("/login");
        await page.waitForLoadState("networkidle");
        await page.reload();
        await page.waitForLoadState("networkidle");

        await context.setOffline(true);

        await page.goto("/login");
        await expect(page.getByRole("heading", { name: "Entrar" })).toBeVisible();

        await context.setOffline(false);
    });

    test("falls back to the static offline page for a route that was never cached", async ({ page, context }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.reload();
        await page.waitForLoadState("networkidle");

        await context.setOffline(true);

        await page.goto("/some-route-never-visited-before");
        await expect(page.getByText("Você está offline.")).toBeVisible();
        await expect(page.getByRole("button", { name: "Tentar novamente" })).toBeVisible();

        await context.setOffline(false);
    });

    test("shows the update prompt once a new version is deployed", async ({ page }) => {
        test.slow();

        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.reload();
        await page.waitForLoadState("networkidle");

        const original = fs.readFileSync(APP_JSX, "utf8");
        const changed = original.replace('className="app-layout"', 'className="app-layout-e2e-marker"');
        expect(changed).not.toBe(original);

        try {
            fs.writeFileSync(APP_JSX, changed);
            execSync("npm run build", { cwd: ROOT, stdio: "pipe" });
        } finally {
            fs.writeFileSync(APP_JSX, original);
        }

        const reg = await page.evaluate(async () => {
            const registration = await navigator.serviceWorker.getRegistration();
            await registration.update();
            for (let i = 0; i < 15; i++) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (registration.waiting) break;
            }
            return { hasWaiting: !!registration.waiting };
        });
        expect(reg.hasWaiting).toBe(true);

        await expect(page.getByText("Nova versão disponível.")).toBeVisible();
        await expect(page.getByRole("button", { name: "Atualizar" })).toBeVisible();

        // Rebuild once more with the original source so the running preview
        // server (and any test that runs after this one) is back to normal.
        execSync("npm run build", { cwd: ROOT, stdio: "pipe" });
    });

});
