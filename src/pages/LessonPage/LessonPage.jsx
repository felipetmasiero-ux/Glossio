import { Link, useParams } from "react-router-dom";

import { LessonReader } from "../../components/lessons/LessonReader/LessonReader";
import { useLessons } from "../../hooks/useLessons";
import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";

export function LessonPage() {

    const { id } = useParams();

    const { language } = useLanguage();

    const lessons = useLessons();

    const { completedLessons } = useLessonProgress();

    const lesson = lessons.find(

        lesson => lesson.id === id

    );

    if (!lesson) {

        return <h1>Lesson not found.</h1>;

    }

    const locked = !ModuleRepository.isLessonUnlocked(

        language,

        lesson.id,

        completedLessons

    );

    if (locked) {

        return (

            <h1>

                🔒 Complete the previous lesson first.{" "}

                <Link to="/lessons">

                    Back to modules

                </Link>

            </h1>

        );

    }

    return (

        <LessonReader

            lesson={lesson}

        />

    );

}
