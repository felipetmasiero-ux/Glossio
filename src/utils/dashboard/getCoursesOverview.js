import { CourseRepository } from "../courses/CourseRepository";
import { getCourseProgress } from "./getCourseProgress";

const LANGUAGES = [
    { key: "English", flag: "🇺🇸" },
    { key: "French", flag: "🇫🇷" },
    { key: "Portuguese", flag: "🇧🇷" }
];

export function getCoursesOverview({ completedLessons = [] } = {}) {

    return LANGUAGES.map(({ key, flag }) => {

        const course = CourseRepository.getByLanguage(key);

        const hasContent = (course?.modules?.length ?? 0) > 0;

        if (!hasContent) {

            return {
                language: key,
                flag,
                title: course?.title ?? key,
                comingSoon: true
            };

        }

        const progress = getCourseProgress(key, completedLessons);

        return {
            language: key,
            flag,
            title: course.title,
            comingSoon: false,
            level: course.modules.at(-1)?.level ?? null,
            percentage: progress.percentage,
            lastModule: progress.lastModule,
            href: "/lessons"
        };

    });

}
