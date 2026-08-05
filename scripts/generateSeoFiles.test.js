import { describe, expect, it } from "vitest";

import { buildSitemap, buildRobotsTxt, PUBLIC_ROUTES, SITE_URL } from "./generateSeoFiles.js";

describe("buildSitemap", () => {

    it("includes every public route as an absolute URL", () => {
        const xml = buildSitemap();

        PUBLIC_ROUTES.forEach(({ path }) => {
            expect(xml).toContain(`<loc>${SITE_URL}${path}</loc>`);
        });
    });

    it("only lists public routes - no protected app routes leak in", () => {
        const xml = buildSitemap();

        expect(xml).not.toContain("/home");
        expect(xml).not.toContain("/my-flashcards");
        expect(xml).not.toContain("/lessons");
    });

    it("is well-formed XML with a single urlset root", () => {
        const xml = buildSitemap();

        expect(xml.trim().startsWith("<?xml")).toBe(true);
        expect((xml.match(/<urlset/g) || [])).toHaveLength(1);
        expect((xml.match(/<\/urlset>/g) || [])).toHaveLength(1);
    });

});

describe("buildRobotsTxt", () => {

    it("allows every public route", () => {
        const txt = buildRobotsTxt();

        expect(txt).toContain("Allow: /$");
        expect(txt).toContain("Allow: /login");
        expect(txt).toContain("Allow: /register");
        expect(txt).toContain("Allow: /placement-test");
    });

    it("disallows everything else with a single catch-all", () => {
        const txt = buildRobotsTxt();

        expect(txt).toContain("Disallow: /");
    });

    it("does not allow-list the bare '/' prefix (would swallow every protected route too)", () => {
        const txt = buildRobotsTxt();

        expect(txt).not.toMatch(/Allow: \/\n/);
    });

    it("points to the sitemap", () => {
        const txt = buildRobotsTxt();

        expect(txt).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    });

});
