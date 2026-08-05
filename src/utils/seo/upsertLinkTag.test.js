import { describe, expect, it, beforeEach } from "vitest";

import { upsertLinkTag } from "./upsertLinkTag";

describe("upsertLinkTag", () => {

    beforeEach(() => {
        document.head.innerHTML = "";
    });

    it("creates the tag when none exists yet", () => {

        upsertLinkTag("canonical", "https://www.glossio.pro/login");

        const tag = document.head.querySelector('link[rel="canonical"]');
        expect(tag.getAttribute("href")).toBe("https://www.glossio.pro/login");

    });

    it("updates an existing canonical in place instead of duplicating it", () => {

        document.head.innerHTML = '<link rel="canonical" href="https://www.glossio.pro/">';

        upsertLinkTag("canonical", "https://www.glossio.pro/register");

        const tags = document.head.querySelectorAll('link[rel="canonical"]');
        expect(tags).toHaveLength(1);
        expect(tags[0].getAttribute("href")).toBe("https://www.glossio.pro/register");

    });

    it("does nothing when href is falsy", () => {

        upsertLinkTag("canonical", "");

        expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();

    });

});
