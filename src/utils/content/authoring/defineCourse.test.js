import { describe, expect, it } from "vitest";

import { defineCourse } from "./defineCourse";

describe("defineCourse", () => {

    it("defaults id to language when not given", () => {
        const course = defineCourse({ language: "spanish", title: "Spanish", modules: [] });
        expect(course.id).toBe("spanish");
    });

    it("lets id be overridden when it needs to differ from language", () => {
        const course = defineCourse({ id: "spanish-latam", language: "spanish", title: "Spanish (LatAm)", modules: [] });
        expect(course.id).toBe("spanish-latam");
    });

    it("defaults description and cover", () => {
        const course = defineCourse({ language: "spanish", title: "Spanish", modules: [] });
        expect(course.description).toBe("");
        expect(course.cover).toBeNull();
    });

    it("passes modules through unchanged", () => {
        const modules = [{ id: "spanish-a1" }];
        const course = defineCourse({ language: "spanish", title: "Spanish", modules });
        expect(course.modules).toBe(modules);
    });

});
