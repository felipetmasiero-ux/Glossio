import { describe, expect, it, beforeEach } from "vitest";

import { upsertJsonLd, removeJsonLd } from "./jsonLdScript";

describe("upsertJsonLd / removeJsonLd", () => {

    beforeEach(() => {
        document.head.innerHTML = "";
    });

    it("creates a single application/ld+json script with the serialized data", () => {

        upsertJsonLd({ "@type": "WebSite", name: "Glossio" });

        const script = document.getElementById("seo-json-ld");
        expect(script.type).toBe("application/ld+json");
        expect(JSON.parse(script.textContent)).toEqual({ "@type": "WebSite", name: "Glossio" });

    });

    it("replaces the previous route's schema instead of appending a second one", () => {

        upsertJsonLd({ "@type": "WebSite" });
        upsertJsonLd({ "@type": "Course" });

        const scripts = document.querySelectorAll("script[type='application/ld+json']");
        expect(scripts).toHaveLength(1);
        expect(JSON.parse(scripts[0].textContent)["@type"]).toBe("Course");

    });

    it("removeJsonLd clears it", () => {

        upsertJsonLd({ "@type": "WebSite" });
        removeJsonLd();

        expect(document.getElementById("seo-json-ld")).toBeNull();

    });

    it("upsertJsonLd(null) removes any existing schema (a page without one shouldn't inherit the last one)", () => {

        upsertJsonLd({ "@type": "WebSite" });
        upsertJsonLd(null);

        expect(document.getElementById("seo-json-ld")).toBeNull();

    });

});
