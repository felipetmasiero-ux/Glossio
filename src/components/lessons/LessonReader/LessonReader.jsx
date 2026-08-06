import "./LessonReader.css";
import"../../../data/lessons/lesson.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LessonHero } from "../LessonHero/LessonHero";
import { LessonModuleNav } from "../LessonModuleNav/LessonModuleNav";
import { LessonObjectives } from "../LessonObjectives/LessonObjectives";
import { VocabularySection } from "../VocabularySection/VocabularySection";
import { LessonBlock } from "../blocks/LessonBlock/LessonBlock";
import { LessonSummary } from "../LessonSummary/LessonSummary";

import { ProgressIndicator } from "../common/ProgressIndicator/ProgressIndicator";
import { LessonNavigation } from "../common/LessonNavigation/LessonNavigation";
import { RecommendationSection } from "../../common/RecommendationSection/RecommendationSection";
import { ExploreRecommendationCard } from "../../common/ExploreRecommendationCard/ExploreRecommendationCard";

import { ModuleRepository } from "../../../utils/courses/ModuleRepository";
import { VideoRepository } from "../../../repositories/VideoRepository";
import { VideoProgressRepository } from "../../../repositories/VideoProgressRepository";
import { getRelatedContent } from "../../../utils/recommendations";

import { useLessonNavigator } from "../../../hooks/useLessonNavigator";
import { useLessonProgress } from "../../../hooks/useLessonProgress";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import { useAuth } from "../../../hooks/useAuth";
import { InlineSignupPrompt } from "../InlineSignupPrompt/InlineSignupPrompt";

// `lesson.language` (already on every lesson object), not LanguageContext -
// LessonReader is reachable while logged out (public preview mode, see
// App.jsx), where LanguageContext is empty unless the visitor happens to
// have used the app before. Using the lesson's own field means next/
// previous lesson, module progress and course progress all resolve
// correctly regardless of auth state or local language history.
export function LessonReader({ lesson }) {

    const navigate = useNavigate();

    const language = lesson.language;

    const { completedLessons, completeLesson } = useLessonProgress();

    const { isAuthenticated } = useAuth();

    const requireAuth = useRequireAuth();

    const {

        current,
        currentStep,
        steps,
        next,
        previous,
        isFirst,
        isLast,
        stepTitle

    } = useLessonNavigator(lesson);

    // A new lesson.id means a different lesson is being read - whether the
    // user just followed a Next/Previous link, opened one directly by URL,
    // or picked it from the module's lesson list. Always land at the top,
    // instantly (no animation), regardless of how they got here.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [lesson.id]);

    const nextLesson = ModuleRepository.getNextLesson(
        language,
        lesson.id
    );

    const previousLesson = ModuleRepository.getPreviousLesson(
        language,
        lesson.id
    );

    const currentModule = ModuleRepository.getByLesson(language, lesson.id);

    const lessonIndex = currentModule?.lessons.findIndex(
        moduleLesson => moduleLesson.id === lesson.id
    ) ?? 0;

    const moduleProgress = currentModule
        ? ModuleRepository.getProgress(currentModule, completedLessons)
        : { completed: 0, total: 0 };

    const courseProgress = ModuleRepository.getProgress(
        { lessons: ModuleRepository.getAllLessonsInOrder(language) },
        completedLessons
    );

    const relatedVideos = isLast
        ? getRelatedContent({
            source: lesson,
            candidates: VideoRepository.getAll(lesson.language),
            language: lesson.language,
            completedIds: Object.values(VideoProgressRepository.getProgress(lesson.language))
                .filter(entry => entry.completed)
                .map(entry => entry.videoId)
        })
        : [];

    function scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    function handleNext() {

        if (!isLast) {

            next();

            scrollTop();

            return;

        }

        requireAuth(() => completeLesson(lesson.id, language))();

        // The "module complete" celebration page is itself behind
        // ProtectedRoute (it shows personalized stats that don't exist for
        // a visitor) - for a signed-in reader it's still the right next
        // stop, but for a visitor finishing the module's last lesson,
        // sending them there would just bounce them straight to /login,
        // which is exactly the auto-redirect this whole feature avoids.
        if (isAuthenticated && currentModule && ModuleRepository.isLastLessonInModule(language, lesson.id)) {

            window.scrollTo(0, 0);

            navigate(`/lessons/module/${currentModule.id}/complete`);

            return;

        }

        if (nextLesson) {

            navigate(`/lessons/${nextLesson.id}`);

            return;

        }

        window.scrollTo(0, 0);

        // /lessons (no param) is the authenticated, LanguageContext-driven
        // module list; a visitor gets the public equivalent instead of
        // hitting ProtectedRoute.
        navigate(isAuthenticated ? "/lessons" : `/lessons/language/${language}`);

    }

    function handlePrevious() {

        if (!isFirst) {

            previous();

            scrollTop();

            return;

        }

        if (previousLesson) {

            navigate(`/lessons/${previousLesson.id}`);

        }

    }

    return (

        <div className="lesson-reader">

            <LessonModuleNav

                module={currentModule}

                lessonIndex={lessonIndex}

                moduleProgress={moduleProgress}

                courseProgress={courseProgress}

            />

            <LessonHero

                lesson={lesson}

            />

            <LessonObjectives

                objectives={lesson.objectives}

            />

            <VocabularySection

                lesson={lesson}

                vocabulary={lesson.vocabulary}

            />

            {!isAuthenticated && lesson.vocabulary?.length > 0 && <InlineSignupPrompt />}

            <h2 className="lesson-step-heading">

                {stepTitle}

            </h2>


            <ProgressIndicator

                current={current + 1}

                total={steps.length}

            />

            <div className="lesson-content paper-ruled animate-fade-in">

                {

                    currentStep.map(block => (

                        <LessonBlock
                            key={block.id}
                            block={block}
                            lesson={lesson}
                        />

                    ))

                }

            </div>

            {

                isLast && (

                    <LessonSummary

                        summary={lesson.summary}

                    />

                )

            }

            {

                isLast && (

                    <RecommendationSection
                        title="Pratique isso em contexto"
                        items={relatedVideos}
                        renderItem={video => (
                            <ExploreRecommendationCard key={video.id} video={video} />
                        )}
                    />

                )

            }

            <LessonNavigation

                hasPrevious={!isFirst || !!previousLesson}

                hasNext={true}

                nextLabel={

                    isLast

                        ? "Concluir lição"

                        : "Continuar leitura"

                }

                onPrevious={handlePrevious}

                onNext={handleNext}

            />

        </div>

    );

}
