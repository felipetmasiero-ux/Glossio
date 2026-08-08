import { describe, expect, it } from "vitest";

import { getFocusableElements } from "./getFocusableElements";

function buildContainer(html) {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    return container;
}

describe("getFocusableElements", () => {

    it("returns an empty array for a missing container", () => {
        expect(getFocusableElements(null)).toEqual([]);
    });

    it("finds links, buttons, inputs, selects and textareas", () => {

        const container = buildContainer(`
            <a href="/x">link</a>
            <button>button</button>
            <input />
            <select><option>a</option></select>
            <textarea></textarea>
        `);

        expect(getFocusableElements(container)).toHaveLength(5);

    });

    it("excludes disabled form elements", () => {

        const container = buildContainer(`
            <button disabled>disabled button</button>
            <input disabled />
            <button>enabled button</button>
        `);

        const focusable = getFocusableElements(container);

        expect(focusable).toHaveLength(1);
        expect(focusable[0].textContent).toBe("enabled button");

    });

    it("excludes a link with no href", () => {

        const container = buildContainer(`<a>not focusable</a><a href="/x">focusable</a>`);

        expect(getFocusableElements(container)).toHaveLength(1);

    });

    it("excludes elements with tabIndex=-1 but includes other explicit tabIndex values", () => {

        const container = buildContainer(`
            <div tabindex="-1">skip me</div>
            <div tabindex="0">include me</div>
        `);

        const focusable = getFocusableElements(container);

        expect(focusable).toHaveLength(1);
        expect(focusable[0].textContent).toBe("include me");

    });

    it("preserves document order", () => {

        const container = buildContainer(`
            <button>first</button>
            <input />
            <button>last</button>
        `);

        const focusable = getFocusableElements(container);

        expect(focusable[0].textContent).toBe("first");
        expect(focusable[2].textContent).toBe("last");

    });

});
