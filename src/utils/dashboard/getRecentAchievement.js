import { ModuleRepository } from "../courses/ModuleRepository";
import { EVENT_TYPES } from "../../constants/events";

export function getRecentAchievement({ language, events = [] }) {

    const lessonCompletedEvents = events
        .filter(event => event.type === EVENT_TYPES.LESSON_COMPLETED)
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp);

    for (const event of lessonCompletedEvents) {

        const lessonId = event.payload.lessonId;

        const module = ModuleRepository.getByLesson(language, lessonId);

        if (!module) continue;

        if (ModuleRepository.isLastLessonInModule(language, lessonId)) {

            return {
                title: `Módulo concluído: ${module.title}`,
                achievedAt: event.timestamp
            };

        }

    }

    return null;

}
