import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { ErrorBoundary } from "./ErrorBoundary";

vi.mock("../../../utils/errorTracking", () => ({
    captureException: vi.fn()
}));

import { captureException } from "../../../utils/errorTracking";

function Bomb() {
    throw new Error("kaboom");
}

describe("ErrorBoundary", () => {

    beforeEach(() => {
        // React logs the caught error to console.error on its own (dev
        // behavior) - suppressed here so the test output stays readable;
        // the assertions below cover what actually matters.
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it("renders children normally when nothing throws", () => {

        render(
            <ErrorBoundary>
                <p>Tudo certo por aqui</p>
            </ErrorBoundary>
        );

        expect(screen.getByText("Tudo certo por aqui")).not.toBeNull();
        expect(captureException).not.toHaveBeenCalled();

    });

    it("renders the friendly fallback and reports the error when a child throws", () => {

        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>
        );

        expect(screen.getByText("Algo deu errado.")).not.toBeNull();
        expect(screen.getByRole("button", { name: "Recarregar página" })).not.toBeNull();
        expect(screen.getByRole("button", { name: "Voltar ao início" })).not.toBeNull();

        expect(captureException).toHaveBeenCalledTimes(1);
        const [error, context] = captureException.mock.calls[0];
        expect(error.message).toBe("kaboom");
        expect(typeof context.componentStack).toBe("string");

    });

    it("reloads the page when 'Recarregar página' is clicked", () => {

        const reloadSpy = vi.fn();
        const originalLocation = window.location;
        Object.defineProperty(window, "location", { value: { ...originalLocation, reload: reloadSpy }, writable: true });

        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>
        );

        fireEvent.click(screen.getByRole("button", { name: "Recarregar página" }));

        expect(reloadSpy).toHaveBeenCalledTimes(1);

        Object.defineProperty(window, "location", { value: originalLocation, writable: true });

    });

});
