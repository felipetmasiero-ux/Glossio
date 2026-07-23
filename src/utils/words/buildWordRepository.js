import { normalizeWord } from "./normalizeWord";
import { lessonBlocks } from "../../components/lessons/blocks";

export function buildWordRepository(lesson) {

    const repository = new Map();

    function add(word) {

        if (!word?.word) return;

        repository.set(
            normalizeWord(word.word),
            word
        );

    }

    lesson.vocabulary?.forEach(add);

    lesson.blocks?.forEach(block => {

        const getVocabulary = lessonBlocks[block.type]?.getVocabulary;

        getVocabulary?.(block).forEach(add);

    });

    return repository;

}