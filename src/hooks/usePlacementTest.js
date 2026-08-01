import { useMemo, useState } from "react";

import { PlacementTestRepository } from "../repositories/PlacementTestRepository";
import { ModuleRepository } from "../utils/courses/ModuleRepository";
import { calculatePlacementResult } from "../utils/placementTest/calculatePlacementResult";
import { PlacementTestStorage } from "../utils/placementTest/placementTestStorage";

const STEPS = {
    LANGUAGE: "language",
    QUIZ: "quiz",
    RESULT: "result"
};

export function usePlacementTest() {

    const [step, setStep] = useState(STEPS.LANGUAGE);
    const [language, setLanguage] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const currentQuestion = questions[currentIndex] ?? null;
    const isLastQuestion = currentIndex === questions.length - 1;

    function selectLanguage(selected) {

        // Fixed order, exactly as authored - no shuffling, no adaptive
        // selection, so the same language always presents the same test.
        const nextQuestions = PlacementTestRepository.getQuestions(selected);

        setLanguage(selected);
        setQuestions(nextQuestions);
        setCurrentIndex(0);
        setAnswers({});
        setResult(null);
        setStep(STEPS.QUIZ);

    }

    function answerCurrent(optionIndex) {

        if (!currentQuestion) return;

        setAnswers(previous => ({ ...previous, [currentQuestion.id]: optionIndex }));

    }

    function goToPreviousQuestion() {
        setCurrentIndex(previous => Math.max(0, previous - 1));
    }

    function goToNextQuestion() {

        if (!isLastQuestion) {
            setCurrentIndex(previous => previous + 1);
            return;
        }

        const availableLevels = PlacementTestRepository.getAvailableLevels(language);

        const computed = calculatePlacementResult({ questions, answers, availableLevels });

        const recommendedModule = ModuleRepository.getAll(language)
            .find(module => module.level === computed.recommendedLevel) ?? null;

        const fullResult = {
            ...computed,
            language,
            recommendedModuleId: recommendedModule?.id ?? null,
            recommendedModuleTitle: recommendedModule?.title ?? null
        };

        PlacementTestStorage.saveResult(language, fullResult);

        setResult(fullResult);
        setStep(STEPS.RESULT);

    }

    function retake() {
        setStep(STEPS.LANGUAGE);
        setLanguage(null);
        setQuestions([]);
        setCurrentIndex(0);
        setAnswers({});
        setResult(null);
    }

    const progress = useMemo(() => ({
        current: currentIndex + 1,
        total: questions.length
    }), [currentIndex, questions.length]);

    return {
        step,
        STEPS,
        language,
        currentQuestion,
        currentAnswer: currentQuestion ? answers[currentQuestion.id] ?? null : null,
        isLastQuestion,
        progress,
        result,
        selectLanguage,
        answerCurrent,
        goToPreviousQuestion,
        goToNextQuestion,
        retake
    };

}
