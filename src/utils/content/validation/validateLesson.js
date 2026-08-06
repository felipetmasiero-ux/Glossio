import { CEFR_LEVELS } from "../../../constants/cefrLevels";
import { SUPPORTED_LANGUAGES } from "../../../constants/languages";
import { TOPIC_LABELS } from "../../../constants/topics";
import { normalizeWord } from "../../../repositories/normalizeWord";
import { error, warning } from "./createIssue";
import { validateBlock } from "./validateBlock";

const SUPPORTED_LANGUAGE_CODES = new Set(SUPPORTED_LANGUAGES.map(language => language.toLowerCase()));

const REQUIRED_STRING_FIELDS = ["id", "language", "level", "category", "title", "description"];

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

// `dictionaryIds`: a Set of every normalized word/id available in this
// lesson's language dictionary - pass it to also catch vocabulary words
// that don't resolve to anything (see DictionaryRepository.getEntry, which
// silently drops them at render time). Omit it to skip that one check,
// e.g. when validating a lesson fixture in isolation.
// `moduleId`: enables the id-prefix check (every lesson id is expected to
// start with its module's id - see getLanguageFromId's own reasoning).
// `position`: 1-based index of this lesson within its module's lessons
// array, to cross-check the (currently display-only) `order` field.
export function validateLesson(lesson, { path, moduleId, dictionaryIds, position } = {}) {

    const lessonPath = path ?? lesson?.id ?? "lesson";

    if (!lesson || typeof lesson !== "object") {
        return [error("lesson", lessonPath, "Lição inválida (não é um objeto).")];
    }

    const issues = [];

    REQUIRED_STRING_FIELDS.forEach(field => {

        if (!isNonEmptyString(lesson[field])) {
            issues.push(error("lesson", lessonPath, `Lição sem "${field}" válido.`));
        }

    });

    if (lesson.level && !CEFR_LEVELS.includes(lesson.level)) {
        issues.push(error("lesson", lessonPath, `Nível "${lesson.level}" inválido. Níveis válidos: ${CEFR_LEVELS.join(", ")}.`));
    }

    if (lesson.language && !SUPPORTED_LANGUAGE_CODES.has(lesson.language)) {
        issues.push(error("lesson", lessonPath, `Idioma "${lesson.language}" não está em SUPPORTED_LANGUAGES.`));
    }

    if (moduleId && isNonEmptyString(lesson.id) && !lesson.id.startsWith(`${moduleId}-`)) {
        issues.push(error("id", lessonPath, `Id da lição "${lesson.id}" deveria começar com "${moduleId}-" (convenção usada por getLanguageFromId).`));
    }

    if (!Array.isArray(lesson.objectives) || lesson.objectives.length === 0) {
        issues.push(error("lesson", lessonPath, `Lição sem objetivos ("objectives").`));
    }

    if (!Array.isArray(lesson.blocks) || lesson.blocks.length === 0) {

        issues.push(error("lesson", lessonPath, "Lição sem blocos de conteúdo."));

    } else {

        const seenBlockIds = new Set();

        lesson.blocks.forEach((block, index) => {

            const blockPath = `${lessonPath}.blocks[${index}]${block?.type ? ` (${block.type})` : ""}`;

            issues.push(...validateBlock(block, blockPath));

            if (block?.id) {

                if (seenBlockIds.has(block.id)) {
                    issues.push(error("id", blockPath, `Id de bloco duplicado dentro da lição: "${block.id}".`));
                }

                seenBlockIds.add(block.id);

            }

        });

    }

    const seenWords = new Set();

    (lesson.vocabulary ?? []).forEach((word, index) => {

        const wordPath = `${lessonPath}.vocabulary[${index}]`;

        if (!isNonEmptyString(word)) {
            issues.push(error("vocabulary", wordPath, "Palavra de vocabulário vazia."));
            return;
        }

        const key = normalizeWord(word);

        if (seenWords.has(key)) {
            issues.push(error("vocabulary", wordPath, `Palavra de vocabulário repetida na lição: "${word}".`));
        }

        seenWords.add(key);

        if (dictionaryIds && !dictionaryIds.has(key)) {
            issues.push(error("vocabulary", wordPath, `Palavra "${word}" não foi encontrada no dicionário de ${lesson.language} - não vai aparecer na lição nem gerar exercícios.`));
        }

    });

    if (lesson.topic && !(lesson.topic in TOPIC_LABELS)) {
        issues.push(warning("lesson", lessonPath, `Tópico "${lesson.topic}" não tem rótulo em TOPIC_LABELS - vai aparecer sem tradução na UI.`));
    }

    if (position != null && lesson.order !== position) {
        issues.push(warning("lesson", lessonPath, `"order" (${lesson.order}) não corresponde à posição real da lição no módulo (${position}).`));
    }

    return issues;

}
