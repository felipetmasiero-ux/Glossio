import { useNavigate, useParams } from "react-router-dom";

import { LessonReader } from "../../components/lessons/LessonReader/LessonReader";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import "./LessonPage.css";
import { useLessons } from "../../hooks/useLessons";
import { useLanguage } from "../../hooks/useLanguage";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";

export function LessonPage() {

    const navigate = useNavigate();

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
                <EmptyState
                    icon="book"
                    title="Lição não encontrada"
                    description="Esta lição pode ter sido movida ou não existe mais."
                    actionLabel="Voltar aos módulos"
                    onAction={() => {
                        window.scrollTo(0, 0);
                        navigate("/lessons");
                    }}
                />
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
                <EmptyState
                    icon="lock"
                    title="Lição bloqueada"
                    description="Complete a lição anterior primeiro para desbloquear esta."
                    actionLabel="Voltar aos módulos"
                    onAction={() => {
                        window.scrollTo(0, 0);
                        navigate("/lessons");
                    }}
                />
            </div>

        );

    }

    return (

        <LessonReader

            lesson={lesson}

        />

    );

}
