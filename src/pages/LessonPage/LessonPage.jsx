import { Link, useParams } from "react-router-dom";

import { LessonReader } from "../../components/lessons/LessonReader/LessonReader";
import { Icon } from "../../components/common/Icon/Icon";
import "./LessonPage.css";
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

        return (
            <div className="page-container">
                <h1>Lição não encontrada.</h1>
            </div>
        );

    }

    const locked = !ModuleRepository.isLessonUnlocked(

        language,

        lesson.id,

        completedLessons

    );

    if (locked) {

        return (

            <div className="page-container">
                <h1 className="lesson-locked">
                    <Icon name="lock" size={22} />
                    Complete a lição anterior primeiro.
                </h1>
                <Link to="/lessons">Voltar aos módulos</Link>
            </div>

        );

    }

    return (

        <LessonReader

            lesson={lesson}

        />

    );

}
