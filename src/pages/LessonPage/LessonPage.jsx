import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LessonReader } from "../../components/lessons/LessonReader/LessonReader";
import { EmptyState } from "../../components/common/EmptyState/EmptyState";
import { Seo } from "../../components/common/Seo/Seo";
import "./LessonPage.css";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import { LessonRepository } from "../../utils/lessons/LessonRepository";
import { ModuleRepository } from "../../utils/courses/ModuleRepository";
import { getLanguageFromId } from "../../utils/courses/getLanguageFromId";
import { trackEvent, ANALYTICS_EVENTS } from "../../utils/analytics";
import { buildBreadcrumbSchema, combineSchemas } from "../../utils/seo/buildJsonLd";
import { SITE_URL } from "../../config/seo";

// Public route (see App.jsx) - language comes from the lesson id itself,
// not LanguageContext. Looking it up via LanguageContext would silently
// fail for a visitor who never set one (an empty string resolves to no
// course at all), and would show the wrong language's content for a
// logged-in reader studying a different language than whatever this one
// lesson belongs to.
export function LessonPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const language = getLanguageFromId(id);

    const { completedLessons } = useLessonProgress();

    const lesson = LessonRepository.getById(language, id);

    // Computed before any early return (and the effect below placed
    // alongside it) so hooks stay unconditional - LessonPage doesn't remount
    // between lessons (same route, just a new :id param), so this is also
    // what re-fires "lesson_started" when navigating lesson to lesson.
    const locked = lesson
        ? !ModuleRepository.isLessonUnlocked(language, lesson.id, completedLessons)
        : false;

    useEffect(() => {

        if (lesson?.id && !locked) {
            trackEvent(ANALYTICS_EVENTS.LESSON_STARTED, { lessonId: lesson.id, language });
        }

    }, [lesson?.id, locked, language]);

    if (!lesson) {

        return (
            <div className="page-container">
                <Seo title="Lição não encontrada" robots="noindex, nofollow" />
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

    if (locked) {

        return (

            <div className="page-container">
                <Seo title="Lição bloqueada" robots="noindex, nofollow" />
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

    const module = ModuleRepository.getByLesson(language, lesson.id);

    const breadcrumbJsonLd = combineSchemas(buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Idiomas", url: `${SITE_URL}/languages` },
        ...(module ? [{ name: module.title, url: `${SITE_URL}/lessons/module/${module.id}` }] : []),
        { name: lesson.title, url: `${SITE_URL}/lessons/${lesson.id}` }
    ]));

    return (

        <>

            <Seo
                title={lesson.title}
                description={lesson.description}
                path={`/lessons/${lesson.id}`}
                jsonLd={breadcrumbJsonLd}
            />

            <LessonReader

                lesson={lesson}

            />

        </>

    );

}
