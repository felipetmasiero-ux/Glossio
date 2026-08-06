import { EVENT_TYPES } from "../../../constants/events";
import { LessonRepository } from "../../lessons/LessonRepository";
import { getLanguageFromId } from "../../courses/getLanguageFromId";
import { TOPIC_LABELS } from "../../../constants/topics";
import { RECOMMENDATION_TYPES, MIN_MISTAKES_FOR_TOPIC } from "../../../constants/adaptiveLearning";

// A topic that keeps showing up across *wrong* answers, regardless of which
// specific lesson they came from - "this pattern in general trips you up",
// distinct from recommendWeakLessons' "this one lesson trips you up".
// Reuses the same lessonId -> topic resolution recommendWeakLessons relies
// on (LessonRepository), not a second copy of it.
export function recommendWeakTopics({ events, language }) {

    const mistakesByTopic = new Map();

    events.forEach(event => {

        const isWrongAnswer =
            (event.type === EVENT_TYPES.QUIZ_COMPLETED || event.type === EVENT_TYPES.EXERCISE_COMPLETED)
            && event.payload?.correct === false;

        if (!isWrongAnswer) {
            return;
        }

        const lessonId = event.payload?.lessonId;

        if (!lessonId || getLanguageFromId(lessonId) !== language) {
            return;
        }

        const topic = LessonRepository.getById(language, lessonId)?.topic;

        if (!topic) {
            return;
        }

        mistakesByTopic.set(topic, (mistakesByTopic.get(topic) ?? 0) + 1);

    });

    const [weakestTopic] = [...mistakesByTopic.entries()]
        .filter(([, count]) => count >= MIN_MISTAKES_FOR_TOPIC)
        .sort((a, b) => b[1] - a[1]);

    if (!weakestTopic) {
        return [];
    }

    const [topic, count] = weakestTopic;

    return [{
        id: `weak-topic-${language}-${topic}`,
        type: RECOMMENDATION_TYPES.REVIEW_TOPIC,
        priority: 2,
        title: `Revisar vocabulário: ${TOPIC_LABELS[topic] ?? topic}`,
        reason: `Esse tópico aparece com frequência nos seus erros (${count} ${count === 1 ? "vez" : "vezes"}).`,
        href: "/my-flashcards",
        icon: "target"
    }];

}
