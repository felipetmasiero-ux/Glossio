export function getNextStep({

    reviews,

    lastActivity,

    continueLearning,

    relatedContent,

    nextLevel

}) {

    if (reviews?.hasReviews) {

        return {
            type: "review",
            label: "Revisar agora",
            href: "/flashcards",
            priority: 1
        };

    }

    if (lastActivity) {

        return {
            type: lastActivity.type,
            label: lastActivity.label,
            href: lastActivity.href,
            priority: 2
        };

    }

    if (continueLearning?.status === "in-progress") {

        return {
            type: "lesson",
            label: "Continuar lição",
            href: continueLearning.href,
            priority: 3
        };

    }

    if (relatedContent && relatedContent.length > 0) {

        return {
            type: "explore",
            label: "Explorar conteúdo relacionado",
            href: `/explore/${relatedContent[0].id}`,
            priority: 4
        };

    }

    if (continueLearning?.status === "finished") {

        if (nextLevel?.available) {

            return {
                type: "next-level",
                label: `Começar módulo ${nextLevel.level}`,
                href: "/lessons",
                priority: 5
            };

        }

        return {
            type: "review-modules",
            label: "Revisar módulos",
            href: "/lessons",
            priority: 5
        };

    }

    return null;

}
