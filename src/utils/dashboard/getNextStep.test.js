import { describe, expect, it } from "vitest";

import { getNextStep } from "./getNextStep";

const reviewsDue = { due: 3, total: 10, hasReviews: true };
const reviewsClear = { due: 0, total: 10, hasReviews: false };

const activityExercise = { type: "exercise", label: "Continuar exercícios", href: "/exercises/lesson-1" };
const activityVideo = { type: "video", label: "Continuar vídeo", href: "/explore/video-1" };

const continueInProgress = { status: "in-progress", href: "/lessons/lesson-2" };
const continueFinished = { status: "finished" };
const continueEmpty = { status: "empty" };

const relatedVideos = [{ id: "video-food" }];

describe("getNextStep", () => {

    it("reviews win over everything else", () => {

        const result = getNextStep({
            reviews: reviewsDue,
            lastActivity: activityExercise,
            continueLearning: continueInProgress,
            relatedContent: relatedVideos,
            nextLevel: { level: "A2", available: true }
        });

        expect(result).toEqual({
            type: "review",
            label: "Revisar agora",
            href: "/flashcards",
            priority: 1
        });

    });

    it("an activity in progress wins over continuing a lesson", () => {

        const result = getNextStep({
            reviews: reviewsClear,
            lastActivity: activityVideo,
            continueLearning: continueInProgress,
            relatedContent: relatedVideos,
            nextLevel: null
        });

        expect(result).toEqual({
            type: "video",
            label: "Continuar vídeo",
            href: "/explore/video-1",
            priority: 2
        });

    });

    it("continuing a lesson wins over exploring related content", () => {

        const result = getNextStep({
            reviews: reviewsClear,
            lastActivity: null,
            continueLearning: continueInProgress,
            relatedContent: relatedVideos,
            nextLevel: null
        });

        expect(result).toEqual({
            type: "lesson",
            label: "Continuar lição",
            href: "/lessons/lesson-2",
            priority: 3
        });

    });

    it("exploring related content wins over a finished course", () => {

        const result = getNextStep({
            reviews: reviewsClear,
            lastActivity: null,
            continueLearning: continueFinished,
            relatedContent: relatedVideos,
            nextLevel: { level: "A2", available: true }
        });

        expect(result).toEqual({
            type: "explore",
            label: "Explorar conteúdo relacionado",
            href: "/explore/video-food",
            priority: 4
        });

    });

    it("a finished course returns the next level when content is available", () => {

        const result = getNextStep({
            reviews: reviewsClear,
            lastActivity: null,
            continueLearning: continueFinished,
            relatedContent: [],
            nextLevel: { level: "A2", available: true }
        });

        expect(result).toEqual({
            type: "next-level",
            label: "Começar módulo A2",
            href: "/lessons",
            priority: 5
        });

    });

    it("a finished course falls back to reviewing modules when no next level exists yet", () => {

        const result = getNextStep({
            reviews: reviewsClear,
            lastActivity: null,
            continueLearning: continueFinished,
            relatedContent: [],
            nextLevel: null
        });

        expect(result).toEqual({
            type: "review-modules",
            label: "Revisar módulos",
            href: "/lessons",
            priority: 5
        });

    });

    it("returns null when there is nothing to suggest", () => {

        const result = getNextStep({
            reviews: reviewsClear,
            lastActivity: null,
            continueLearning: continueEmpty,
            relatedContent: [],
            nextLevel: null
        });

        expect(result).toBeNull();

    });

});
