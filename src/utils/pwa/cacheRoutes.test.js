import { describe, expect, it } from "vitest";

import {
    isApiRequest,
    isSameOriginStaticAsset,
    isSameOriginImage,
    isGoogleFontStylesheet,
    isGoogleFontFile
} from "./cacheRoutes";

const ORIGIN = "https://www.glossio.pro";

function url(path, origin = ORIGIN) {
    return new URL(path, origin);
}

function request(destination) {
    return { destination };
}

describe("isApiRequest", () => {

    it("matches any path under /api, regardless of origin", () => {
        expect(isApiRequest(url("/api/auth/login"))).toBe(true);
        expect(isApiRequest(url("/api/flashcards", "https://glossio-backend.onrender.com"))).toBe(true);
    });

    it("does not match app routes that merely contain 'api' elsewhere", () => {
        expect(isApiRequest(url("/lessons/api-basics"))).toBe(false);
    });

});

describe("isSameOriginStaticAsset", () => {

    it("matches same-origin scripts, styles and workers", () => {
        expect(isSameOriginStaticAsset(request("script"), url("/assets/index.js"), ORIGIN)).toBe(true);
        expect(isSameOriginStaticAsset(request("style"), url("/assets/index.css"), ORIGIN)).toBe(true);
        expect(isSameOriginStaticAsset(request("worker"), url("/sw.js"), ORIGIN)).toBe(true);
    });

    it("does not match cross-origin requests, even for the same destinations", () => {
        expect(isSameOriginStaticAsset(request("script"), url("/x.js", "https://evil.example"), ORIGIN)).toBe(false);
    });

    it("does not match other destinations, like images or documents", () => {
        expect(isSameOriginStaticAsset(request("image"), url("/cover.webp"), ORIGIN)).toBe(false);
        expect(isSameOriginStaticAsset(request("document"), url("/lessons/x"), ORIGIN)).toBe(false);
    });

});

describe("isSameOriginImage", () => {

    it("matches same-origin image requests only", () => {
        expect(isSameOriginImage(request("image"), url("/covers/english.webp"), ORIGIN)).toBe(true);
        expect(isSameOriginImage(request("script"), url("/assets/index.js"), ORIGIN)).toBe(false);
        expect(isSameOriginImage(request("image"), url("/x.png", "https://cdn.example"), ORIGIN)).toBe(false);
    });

});

describe("isGoogleFontStylesheet / isGoogleFontFile", () => {

    it("separates the fonts.googleapis.com stylesheet from the fonts.gstatic.com font files", () => {

        const stylesheetUrl = url("/css2?family=Inter", "https://fonts.googleapis.com");
        const fontFileUrl = url("/s/inter/v1/abc.woff2", "https://fonts.gstatic.com");

        expect(isGoogleFontStylesheet(stylesheetUrl)).toBe(true);
        expect(isGoogleFontFile(stylesheetUrl)).toBe(false);

        expect(isGoogleFontFile(fontFileUrl)).toBe(true);
        expect(isGoogleFontStylesheet(fontFileUrl)).toBe(false);

    });

    it("does not match unrelated third-party origins", () => {
        expect(isGoogleFontStylesheet(url("/", "https://www.googletagmanager.com"))).toBe(false);
        expect(isGoogleFontFile(url("/", "https://www.googletagmanager.com"))).toBe(false);
    });

});
