import { describe, expect, it } from "vitest";
import {
    sanitizeString,
    requireString,
    optionalString,
    requireEmail,
    requirePassword,
    optionalUrl,
    optionalTimezone,
    requireNumber,
    optionalPositiveNumber,
    requireTimestamp,
    requireArray
} from "./validators.js";
import { HttpError } from "./HttpError.js";

describe("sanitizeString", () => {

    it("trims, strips control characters, and collapses repeated spaces", () => {
        expect(sanitizeString("  hello   world  ")).toBe("hello world");
        expect(sanitizeString("bad\x00null\x07bell")).toBe("badnullbell");
    });

    it("preserves newlines and tabs (legitimate in multi-line fields)", () => {
        expect(sanitizeString("line one\nline two")).toBe("line one\nline two");
    });

    it("passes non-strings through unchanged", () => {
        expect(sanitizeString(42)).toBe(42);
        expect(sanitizeString(null)).toBe(null);
    });

});

describe("requireString", () => {

    it("accepts a string within bounds", () => {
        expect(requireString("hello", "Campo", { min: 1, max: 10 })).toBe("hello");
    });

    it("rejects a non-string", () => {
        expect(() => requireString(42, "Campo")).toThrow(HttpError);
        expect(() => requireString(null, "Campo")).toThrow(HttpError);
        expect(() => requireString(undefined, "Campo")).toThrow(HttpError);
    });

    it("rejects a string shorter than min", () => {
        expect(() => requireString("", "Campo", { min: 1 })).toThrow(/entre 1/);
    });

    it("rejects a huge string beyond max (payload abuse)", () => {
        const huge = "a".repeat(10_000);
        expect(() => requireString(huge, "Campo", { max: 100 })).toThrow(HttpError);
    });

});

describe("optionalString", () => {

    it("normalizes undefined/null/empty to null", () => {
        expect(optionalString(undefined, "Campo")).toBeNull();
        expect(optionalString(null, "Campo")).toBeNull();
        expect(optionalString("   ", "Campo")).toBeNull();
    });

    it("enforces max length when a value is present", () => {
        expect(() => optionalString("a".repeat(600), "Bio", { max: 500 })).toThrow(HttpError);
    });

});

describe("requireEmail", () => {

    it("accepts a well-formed email", () => {
        expect(requireEmail("user@example.com")).toBe("user@example.com");
    });

    it.each([
        "not-an-email",
        "missing-at.com",
        "@missing-local.com",
        "user@",
        ""
    ])("rejects invalid email %s", invalid => {
        expect(() => requireEmail(invalid)).toThrow(HttpError);
    });

    it("rejects an absurdly long email", () => {
        const huge = `${"a".repeat(300)}@example.com`;
        expect(() => requireEmail(huge)).toThrow(HttpError);
    });

});

describe("requirePassword", () => {

    it("accepts a password within the 8-100 range", () => {
        expect(requirePassword("password123")).toBe("password123");
    });

    it("rejects a password shorter than 8 characters", () => {
        expect(() => requirePassword("short")).toThrow(/mínimo 8/);
    });

    it("rejects a password longer than 100 characters", () => {
        expect(() => requirePassword("a".repeat(101))).toThrow(/máximo 100/);
    });

    it("rejects a missing password", () => {
        expect(() => requirePassword(undefined)).toThrow(HttpError);
    });

});

describe("optionalUrl", () => {

    it("accepts a well-formed http(s) URL", () => {
        expect(optionalUrl("https://example.com/avatar.png", "URL")).toBe("https://example.com/avatar.png");
    });

    it("normalizes empty/undefined to null", () => {
        expect(optionalUrl(undefined, "URL")).toBeNull();
        expect(optionalUrl("", "URL")).toBeNull();
    });

    it.each([
        "not-a-url",
        "javascript:alert(1)",
        "ftp://example.com/file",
        "data:text/html,<script>alert(1)</script>"
    ])("rejects an invalid or non-http(s) URL: %s", invalid => {
        expect(() => optionalUrl(invalid, "URL")).toThrow(HttpError);
    });

});

describe("optionalTimezone", () => {

    it("accepts a real IANA timezone", () => {
        expect(optionalTimezone("America/Sao_Paulo")).toBe("America/Sao_Paulo");
    });

    it("rejects a made-up timezone", () => {
        expect(() => optionalTimezone("Not/A_Timezone")).toThrow(HttpError);
    });

    it("normalizes empty/undefined to null", () => {
        expect(optionalTimezone(undefined)).toBeNull();
    });

});

describe("requireNumber", () => {

    it("accepts a finite number within range", () => {
        expect(requireNumber(5, "Campo", { min: 0, max: 10 })).toBe(5);
    });

    it("rejects NaN, Infinity, and non-numbers", () => {
        expect(() => requireNumber(NaN, "Campo")).toThrow(HttpError);
        expect(() => requireNumber(Infinity, "Campo")).toThrow(HttpError);
        expect(() => requireNumber("5", "Campo")).toThrow(HttpError);
    });

    it("rejects values outside the allowed range", () => {
        expect(() => requireNumber(-1, "Campo", { min: 0 })).toThrow(HttpError);
        expect(() => requireNumber(11, "Campo", { max: 10 })).toThrow(HttpError);
    });

});

describe("optionalPositiveNumber", () => {

    it("normalizes undefined/null to null (goal not configured)", () => {
        expect(optionalPositiveNumber(undefined, "Meta")).toBeNull();
        expect(optionalPositiveNumber(null, "Meta")).toBeNull();
    });

    it("rejects a negative number", () => {
        expect(() => optionalPositiveNumber(-5, "Meta")).toThrow(HttpError);
    });

    it("accepts zero and positive numbers within the ceiling", () => {
        expect(optionalPositiveNumber(0, "Meta")).toBe(0);
        expect(optionalPositiveNumber(20, "Meta", { max: 100 })).toBe(20);
    });

    it("rejects a value above the ceiling", () => {
        expect(() => optionalPositiveNumber(999_999, "Meta", { max: 100 })).toThrow(HttpError);
    });

});

describe("requireTimestamp", () => {

    it("accepts a plausible millisecond timestamp", () => {
        expect(requireTimestamp(Date.now(), "Data")).toBeTypeOf("number");
    });

    it("rejects a negative or non-finite timestamp", () => {
        expect(() => requireTimestamp(-1, "Data")).toThrow(HttpError);
        expect(() => requireTimestamp(NaN, "Data")).toThrow(HttpError);
    });

});

describe("requireArray", () => {

    it("accepts an array within the max length", () => {
        expect(requireArray([1, 2, 3], "Lista", { maxLength: 10 })).toEqual([1, 2, 3]);
    });

    it("rejects a non-array", () => {
        expect(() => requireArray("not an array", "Lista")).toThrow(HttpError);
        expect(() => requireArray({}, "Lista")).toThrow(HttpError);
    });

    it("rejects an array beyond the configured max length", () => {
        const huge = new Array(10_001).fill(0);
        expect(() => requireArray(huge, "Lista", { maxLength: 10_000 })).toThrow(HttpError);
    });

});
