import { describe, expect, it } from "vitest";

import {
    buildWebsiteSchema,
    buildEducationalOrgSchema,
    buildCourseSchema,
    buildFaqSchema,
    buildBreadcrumbSchema,
    combineSchemas
} from "./buildJsonLd";

describe("buildWebsiteSchema", () => {
    it("returns a WebSite schema with the site name and url", () => {
        expect(buildWebsiteSchema()).toEqual({
            "@type": "WebSite",
            name: "Glossio",
            url: "https://www.glossio.pro"
        });
    });
});

describe("buildEducationalOrgSchema", () => {
    it("returns an EducationalOrganization schema with a logo", () => {
        const schema = buildEducationalOrgSchema();
        expect(schema["@type"]).toBe("EducationalOrganization");
        expect(schema.logo).toBe("https://www.glossio.pro/icons/icon-512.png");
    });
});

describe("buildCourseSchema", () => {
    it("maps a module's title/description into a Course schema with a provider", () => {
        const schema = buildCourseSchema({ title: "English A1", description: "Learn the foundations." });
        expect(schema).toEqual({
            "@type": "Course",
            name: "English A1",
            description: "Learn the foundations.",
            provider: {
                "@type": "EducationalOrganization",
                name: "Glossio",
                url: "https://www.glossio.pro"
            }
        });
    });
});

describe("buildFaqSchema", () => {
    it("maps a list of {question, answer} into an FAQPage with positioned Question/Answer pairs", () => {
        const schema = buildFaqSchema([
            { question: "É grátis?", answer: "Sim, sem custo." },
            { question: "Funciona no celular?", answer: "Sim, é um PWA instalável." }
        ]);

        expect(schema).toEqual({
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "É grátis?",
                    acceptedAnswer: { "@type": "Answer", text: "Sim, sem custo." }
                },
                {
                    "@type": "Question",
                    name: "Funciona no celular?",
                    acceptedAnswer: { "@type": "Answer", text: "Sim, é um PWA instalável." }
                }
            ]
        });
    });
});

describe("buildBreadcrumbSchema", () => {
    it("maps an ordered list of {name, url} into positioned ListItems", () => {
        const schema = buildBreadcrumbSchema([
            { name: "Home", url: "https://www.glossio.pro/" },
            { name: "English A1", url: "https://www.glossio.pro/lessons/module/english-a1" }
        ]);

        expect(schema["@type"]).toBe("BreadcrumbList");
        expect(schema.itemListElement).toEqual([
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.glossio.pro/" },
            { "@type": "ListItem", position: 2, name: "English A1", item: "https://www.glossio.pro/lessons/module/english-a1" }
        ]);
    });
});

describe("combineSchemas", () => {

    it("wraps a single schema with @context directly (no @graph needed)", () => {
        const result = combineSchemas(buildWebsiteSchema());
        expect(result).toEqual({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Glossio",
            url: "https://www.glossio.pro"
        });
    });

    it("wraps multiple schemas in a single @graph block", () => {
        const result = combineSchemas(buildWebsiteSchema(), buildEducationalOrgSchema());
        expect(result["@context"]).toBe("https://schema.org");
        expect(result["@graph"]).toHaveLength(2);
        expect(result["@graph"][0]["@type"]).toBe("WebSite");
        expect(result["@graph"][1]["@type"]).toBe("EducationalOrganization");
    });

});
