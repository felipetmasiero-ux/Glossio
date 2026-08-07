import { describe, expect, it, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";

vi.mock("../../../utils/webVitals/reportWebVitals", () => ({
    reportWebVitals: vi.fn()
}));

import { reportWebVitals } from "../../../utils/webVitals/reportWebVitals";
import { WebVitalsReporter } from "./WebVitalsReporter";

describe("WebVitalsReporter", () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders nothing", () => {

        const { container } = render(<WebVitalsReporter />);

        expect(container.firstChild).toBeNull();

    });

    it("starts Web Vitals reporting once on mount", () => {

        const { rerender } = render(<WebVitalsReporter />);
        rerender(<WebVitalsReporter />);

        expect(reportWebVitals).toHaveBeenCalledTimes(1);

    });

});
