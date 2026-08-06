import { BLOCK_TYPES } from "../../../constants/lessonBlocks";
import { error, warning } from "./createIssue";

const KNOWN_TYPES = new Set(Object.values(BLOCK_TYPES));

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function validateTextBlock(block, path) {

    const issues = [];

    if (!isNonEmptyString(block.text)) {
        issues.push(error("block", path, `Bloco "${block.type}" precisa de um "text" não vazio.`));
    }

    return issues;

}

function validateTitledTextBlock(block, path) {

    const issues = [];

    if (!isNonEmptyString(block.title)) {
        issues.push(error("block", path, `Bloco "${block.type}" precisa de um "title" não vazio.`));
    }

    if (!isNonEmptyString(block.text)) {
        issues.push(error("block", path, `Bloco "${block.type}" precisa de um "text" não vazio.`));
    }

    return issues;

}

function validateExampleBlock(block, path) {

    const issues = [];

    if (!Array.isArray(block.examples) || block.examples.length === 0) {
        issues.push(error("block", path, `Bloco "example" precisa de ao menos um item em "examples".`));
        return issues;
    }

    block.examples.forEach((example, index) => {

        if (!isNonEmptyString(example.text)) {
            issues.push(error("block", `${path}.examples[${index}]`, `Exemplo sem "text".`));
        }

        if (!isNonEmptyString(example.translation)) {
            issues.push(warning("block", `${path}.examples[${index}]`, `Exemplo sem "translation" - considere adicionar para ajudar o aprendizado.`));
        }

    });

    return issues;

}

function validateDialogueBlock(block, path) {

    const issues = [];

    if (!Array.isArray(block.lines) || block.lines.length === 0) {
        issues.push(error("block", path, `Bloco "dialogue" precisa de ao menos uma linha em "lines".`));
        return issues;
    }

    block.lines.forEach((line, index) => {

        if (!isNonEmptyString(line.speaker)) {
            issues.push(error("block", `${path}.lines[${index}]`, `Linha de diálogo sem "speaker".`));
        }

        if (!isNonEmptyString(line.text)) {
            issues.push(error("block", `${path}.lines[${index}]`, `Linha de diálogo sem "text".`));
        }

    });

    return issues;

}

function validateListBlock(block, path) {

    const issues = [];

    if (!Array.isArray(block.items) || block.items.length === 0) {
        issues.push(error("block", path, `Bloco "list" precisa de ao menos um item em "items".`));
        return issues;
    }

    block.items.forEach((item, index) => {

        if (!isNonEmptyString(item)) {
            issues.push(error("block", `${path}.items[${index}]`, `Item de lista vazio.`));
        }

    });

    return issues;

}

const MAX_QUIZ_OPTIONS = 6;

function validateQuizBlock(block, path) {

    const issues = [];

    if (!isNonEmptyString(block.question)) {
        issues.push(error("block", path, `Bloco "quiz" precisa de uma "question" não vazia.`));
    }

    if (!Array.isArray(block.options) || block.options.length < 2) {
        issues.push(error("block", path, `Bloco "quiz" precisa de ao menos 2 "options".`));
        return issues;
    }

    if (block.options.length > MAX_QUIZ_OPTIONS) {
        issues.push(warning("block", path, `Bloco "quiz" tem ${block.options.length} opções - a UI só rotula até ${MAX_QUIZ_OPTIONS} (A-F).`));
    }

    block.options.forEach((option, index) => {

        if (!isNonEmptyString(option)) {
            issues.push(error("block", `${path}.options[${index}]`, `Opção de quiz vazia.`));
        }

    });

    const normalizedOptions = block.options.map(option => option?.trim().toLowerCase());

    if (new Set(normalizedOptions).size !== normalizedOptions.length) {
        issues.push(error("block", path, `Bloco "quiz" tem opções duplicadas.`));
    }

    if (!Number.isInteger(block.answer) || block.answer < 0 || block.answer >= block.options.length) {
        issues.push(error("block", path, `Bloco "quiz" tem "answer" (${block.answer}) fora do intervalo de "options" (0-${block.options.length - 1}).`));
    }

    if (!isNonEmptyString(block.explanation)) {
        issues.push(warning("block", path, `Bloco "quiz" sem "explanation" - considere explicar a resposta correta.`));
    }

    return issues;

}

function validateStepBlock(block, path) {

    const issues = [];

    if (!isNonEmptyString(block.title)) {
        issues.push(error("block", path, `Bloco "step" precisa de um "title" não vazio.`));
    }

    return issues;

}

const VALIDATORS_BY_TYPE = {

    [BLOCK_TYPES.HEADING]: validateTextBlock,

    [BLOCK_TYPES.PARAGRAPH]: validateTextBlock,

    [BLOCK_TYPES.QUOTE]: validateTextBlock,

    [BLOCK_TYPES.TIP]: validateTitledTextBlock,

    [BLOCK_TYPES.GRAMMAR]: validateTitledTextBlock,

    [BLOCK_TYPES.CULTURE]: validateTitledTextBlock,

    [BLOCK_TYPES.EXAMPLE]: validateExampleBlock,

    [BLOCK_TYPES.DIALOGUE]: validateDialogueBlock,

    [BLOCK_TYPES.LIST]: validateListBlock,

    [BLOCK_TYPES.QUIZ]: validateQuizBlock,

    [BLOCK_TYPES.STEP]: validateStepBlock

};

// `path` is a human-readable "breadcrumb" string built up by the caller
// (validateLesson) - this function doesn't know or care where the block
// lives, only how to check its own shape.
export function validateBlock(block, path) {

    if (!block || typeof block !== "object") {
        return [error("block", path, "Bloco inválido (não é um objeto).")];
    }

    if (!KNOWN_TYPES.has(block.type)) {
        return [error("block", path, `Tipo de bloco inexistente: "${block.type}". Tipos válidos: ${[...KNOWN_TYPES].join(", ")}.`)];
    }

    const validate = VALIDATORS_BY_TYPE[block.type];

    return validate ? validate(block, path) : [];

}
