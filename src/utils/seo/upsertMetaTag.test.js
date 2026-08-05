import { describe, expect, it, beforeEach } from "vitest";

import { upsertMetaTag } from "./upsertMetaTag";

describe("upsertMetaTag", () => {

    beforeEach(() => {
        document.head.innerHTML = "";
    });

    it("creates the tag when none exists yet", () => {

        upsertMetaTag("name", "robots", "index, follow");

        const tag = document.head.querySelector('meta[name="robots"]');
        expect(tag.getAttribute("content")).toBe("index, follow");

    });

    it("updates an existing tag in place instead of duplicating it", () => {

        document.head.innerHTML = '<meta name="description" content="old">';

        upsertMetaTag("name", "description", "new");

        const tags = document.head.querySelectorAll('meta[name="description"]');
        expect(tags).toHaveLength(1);
        expect(tags[0].getAttribute("content")).toBe("new");

    });

    it("supports the property attribute (Open Graph tags)", () => {

        upsertMetaTag("property", "og:title", "Hello");

        const tag = document.head.querySelector('meta[property="og:title"]');
        expect(tag.getAttribute("content")).toBe("Hello");

    });

    it("does nothing when content is null/undefined", () => {

        upsertMetaTag("name", "description", undefined);

        expect(document.head.querySelector('meta[name="description"]')).toBeNull();

    });

});
