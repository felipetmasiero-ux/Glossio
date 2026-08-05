import { describe, expect, it, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useSeo } from "./useSeo";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_URL } from "../config/seo";

function wrapper({ children }) {
    return <MemoryRouter initialEntries={["/my-flashcards"]}>{children}</MemoryRouter>;
}

describe("useSeo", () => {

    beforeEach(() => {
        document.head.innerHTML = "";
        document.title = "";
    });

    it("sets document.title from the given title, suffixed with the site name", () => {

        renderHook(() => useSeo({ title: "Meus Flashcards" }), { wrapper });

        expect(document.title).toBe("Meus Flashcards — Glossio");

    });

    it("falls back to the site default title when none is given", () => {

        renderHook(() => useSeo(), { wrapper });

        expect(document.title).toBe(DEFAULT_TITLE);

    });

    it("sets description, robots and canonical from the current route", () => {

        renderHook(() => useSeo({ title: "Meus Flashcards", robots: "noindex, nofollow" }), { wrapper });

        expect(document.head.querySelector('meta[name="description"]').getAttribute("content")).toBe(DEFAULT_DESCRIPTION);
        expect(document.head.querySelector('meta[name="robots"]').getAttribute("content")).toBe("noindex, nofollow");
        expect(document.head.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(`${SITE_URL}/my-flashcards`);

    });

    it("sets Open Graph and Twitter Card tags", () => {

        renderHook(() => useSeo({ title: "Meus Flashcards", description: "Sua coleção pessoal de vocabulário." }), { wrapper });

        expect(document.head.querySelector('meta[property="og:title"]').getAttribute("content")).toBe("Meus Flashcards — Glossio");
        expect(document.head.querySelector('meta[property="og:description"]').getAttribute("content")).toBe("Sua coleção pessoal de vocabulário.");
        expect(document.head.querySelector('meta[property="og:url"]').getAttribute("content")).toBe(`${SITE_URL}/my-flashcards`);
        expect(document.head.querySelector('meta[name="twitter:card"]').getAttribute("content")).toBe("summary_large_image");

    });

    it("adds JSON-LD when given, and removes it when a later render has none", () => {

        const { rerender } = renderHook(
            ({ jsonLd }) => useSeo({ title: "Home", jsonLd }),
            { wrapper, initialProps: { jsonLd: { "@type": "WebSite" } } }
        );

        expect(document.getElementById("seo-json-ld")).not.toBeNull();

        rerender({ jsonLd: undefined });

        expect(document.getElementById("seo-json-ld")).toBeNull();

    });

    it("does not duplicate meta tags across re-renders with the same values", () => {

        const { rerender } = renderHook(() => useSeo({ title: "Meus Flashcards" }), { wrapper });

        rerender();
        rerender();

        expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
        expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);

    });

});
