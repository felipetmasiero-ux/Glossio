import { useMemo } from "react";

import { useLanguage } from "./useLanguage";

import { LessonRepository } from "../utils/lessons/LessonRepository";

export function useLessons() {

    const { language } = useLanguage();

    return useMemo(() => {

        return LessonRepository.getAll(

            language.toLowerCase()

        );

    }, [language]);

}