import { describe, expect, it } from "vitest";

import { quiz } from "./quiz";
import { feedback } from "./feedback";
import { hint } from "./hint";

describe("quiz", () => {

    it("keeps working with just the original 4 arguments (every existing lesson calls it this way)", () => {

        const block = quiz("What is 'hello'?", ["Olá", "Tchau"], 0, "Hello means olá.");

        expect(block.type).toBe("quiz");
        expect(block.question).toBe("What is 'hello'?");
        expect(block.options).toEqual(["Olá", "Tchau"]);
        expect(block.answer).toBe(0);
        expect(block.explanation).toBe("Hello means olá.");
        expect(block.feedback).toBeUndefined();
        expect(block.id).toBeTruthy();

    });

    it("accepts an optional 5th feedback argument", () => {

        const block = quiz(
            "What is 'hello'?",
            ["Olá", "Tchau"],
            0,
            "Hello means olá.",
            feedback(hint("Think of a greeting."))
        );

        expect(block.feedback).toEqual({ hint: "Think of a greeting." });

    });

    it("still accepts an explicit id as the 6th argument", () => {

        const block = quiz("Q", ["A", "B"], 0, "E", feedback(), "custom-id");

        expect(block.id).toBe("custom-id");

    });

});
