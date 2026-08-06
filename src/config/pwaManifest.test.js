import { describe, expect, it } from "vitest";

import { pwaManifest } from "./pwaManifest";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "./seo";

describe("pwaManifest", () => {

    it("names the app consistently with the rest of the site", () => {
        expect(pwaManifest.name).toBe(SITE_NAME);
        expect(pwaManifest.short_name).toBe(SITE_NAME);
        expect(pwaManifest.description).toBe(DEFAULT_DESCRIPTION);
    });

    it("is installable as a standalone app from the root", () => {
        expect(pwaManifest.start_url).toBe("/");
        expect(pwaManifest.display).toBe("standalone");
        expect(pwaManifest.id).toBe("/");
    });

    it("includes both a regular and a maskable icon at 192 and 512", () => {

        const bySizeAndPurpose = (size, purpose) =>
            pwaManifest.icons.find(icon => icon.sizes === size && icon.purpose === purpose);

        expect(bySizeAndPurpose("192x192", "any")).toBeDefined();
        expect(bySizeAndPurpose("512x512", "any")).toBeDefined();
        expect(bySizeAndPurpose("192x192", "maskable")).toBeDefined();
        expect(bySizeAndPurpose("512x512", "maskable")).toBeDefined();

        pwaManifest.icons.forEach(icon => {
            expect(icon.type).toBe("image/png");
        });

    });

    it("declares theme/background colors matching index.html's theme-color meta tag", () => {
        expect(pwaManifest.theme_color).toBe("#2C3E63");
        expect(pwaManifest.background_color).toBeTruthy();
    });

    it("does not lock orientation - the app is used on both phones and desktop", () => {
        expect(pwaManifest.orientation).toBe("any");
    });

    it("declares at least one install category", () => {
        expect(pwaManifest.categories.length).toBeGreaterThan(0);
    });

});
