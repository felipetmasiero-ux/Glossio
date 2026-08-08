import "./LessonReader.css";
import"../../../data/lessons/lesson.css";

import { useEffect, useRef } from "react";
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
import { Button } from "../../common/Button/Button";
import { Icon } from "../../common/Icon/Icon";

import { ModuleRepository } from "../../../utils/courses/ModuleRepository";
import { VideoRepository } from "../../../repositories/VideoRepository";
import { VideoProgressRepository } from "../../../repositories/VideoProgressRepository";
import { getRelatedContent } from "../../../utils/recommendations";
import { generateExercisesForLesson } from "../../../utils/exercises";

import { useLessonNavigator } from "../../../hooks/useLessonNavigator";
import { useLessonProgress } from "../../../hooks/useLessonProgress";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import { useAuth } from "../../../hooks/useAuth";
import { useLastActivity } from "../../../hooks/useLastActivity";
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

    const { lastActivity, setActivity, clearActivity } = useLastActivity();

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

    // Last Activity should only reflect genuine reading, not a page that
    // was opened and immediately left - so this only flips true from inside
    // handleNext/handlePrevious below (a real step change), never just from
    // mounting on step 0. Reset per lesson so arriving at a new lesson
    // (LessonPage doesn't remount between lessons, only the :id param
    // changes) starts this over instead of inheriting the previous
    // lesson's engagement.
    const hasEngagedRef = useRef(false);

    useEffect(() => {
        hasEngagedRef.current = false;
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

    // Fires once real engagement has happened (see hasEngagedRef above),
    // and again on every further step change - same "keep it fresh while
    // active" shape useExerciseSession/useStudySession already use for
    // their own activity types. `remaining`/`total` reuse the step
    // progress useLessonNavigator already tracks - no separate progress
    // system for this feature.
    useEffect(() => {

        if (!hasEngagedRef.current) return;

        setActivity({
            type: "lesson",
            language,
            lessonId: lesson.id,
            moduleId: currentModule?.id ?? null,
            remaining: steps.length - (current + 1),
            total: steps.length
        });

    }, [lesson.id, language, currentModule?.id, current, steps.length, setActivity]);

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

    // Same source of truth ExerciseSessionPage itself uses to decide
    // whether there's anything to practice (its own "Sem exercícios
    // disponíveis" empty state checks this exact same call's length) - so
    // the CTA below can never point at a session that turns out to be
    // empty. Only computed on the last step, same as relatedVideos above.
    const hasExercises = isLast
        ? generateExercisesForLesson(lesson).length > 0
        : false;

    function scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    // Shared by handleNext (isLast branch) and handlePractice below - both
    // mark the same lesson complete the same way, only the destination
    // after that differs.
    function markLessonComplete() {

        completeLesson(lesson.id, language);

        // Only clear if Last Activity is still actually about this
        // lesson - it may since have moved on to something else (e.g. a
        // video watched in the meantime), which must not be wiped out
        // just because this lesson also finished.
        if (lastActivity?.type === "lesson" && lastActivity?.lessonId === lesson.id) {
            clearActivity();
        }

    }

    // Completes the lesson exactly like "Concluir lição" does, but instead
    // of moving on to the next lesson/module, sends the reader straight
    // into practicing this same lesson's own exercises - reusing the
    // existing, generic /exercises/:lessonId route (ExerciseSessionPage
    // already resolves the lesson, generates its exercises via
    // generateExercisesForLesson, and handles its own "no exercises"/
    // finished states) rather than a new one. Progression is untouched:
    // this doesn't replace "Concluir lição" or change what the next lesson
    // is - it's an additional path out of the same completion moment.
    function handlePractice() {

        requireAuth(markLessonComplete)();

        navigate(`/exercises/${lesson.id}`);

    }

    function handleNext() {

        if (!isLast) {

            hasEngagedRef.current = true;

            next();

            scrollTop();

            return;

        }

        requireAuth(markLessonComplete)();

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

            hasEngagedRef.current = true;

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

                isAuthenticated={isAuthenticated}

                moduleId={currentModule?.id ?? null}

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

                isLast && hasExercises && (

                    <div className="lesson-reader__practice-cta">

                        <Button variant="secondary" onClick={handlePractice}>
                            <Icon name="pencil" size={16} />
                            Praticar exercícios desta lição
                        </Button>

                    </div>

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
