import { useMemo } from "react";

import { useParams } from "react-router-dom";

import { useLanguage } from "./useLanguage";

import { LessonRepository } from "../utils/lessons/LessonRepository";

export function useLesson() {

    const { id } = useParams();

    const { language } = useLanguage();

    return useMemo(() => {

        return LessonRepository.getById(

            language.toLowerCase(),

            id

        );

    }, [language, id]);

}