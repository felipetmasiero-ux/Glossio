// The only genuinely Node-only content checks (need real filesystem
// access, so they can't live in src/utils/content/validation - everything
// there stays pure and portable). Confirms every `cover` and every
// audio()'s `file` actually resolves to a file under public/ - the SEO/PWA
// sprints already established that pattern (public/ is copied verbatim
// into dist/, see scripts/generateSeoFiles.js's own comment).
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { warning } from "../../src/utils/content/validation/createIssue.js";
import { BLOCK_TYPES } from "../../src/constants/lessonBlocks.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const publicDir = resolve(__dirname, "..", "..", "public");

const MESSAGE_BY_KIND = {
    cover: path => `Capa não encontrada: "${path}" não existe em public/ - a imagem não vai carregar (ex: em LessonRecommendationCard).`,
    audio: path => `Áudio não encontrado: "${path}" não existe em public/ - o AudioButton vai cair no erro em vez de tocar o arquivo.`
};

function collectCoverRefs(courses) {

    const refs = [];

    Object.values(courses).forEach(course => {

        if (course.cover) {
            refs.push({ kind: "cover", path: course.cover, source: course.id });
        }

        (course.modules ?? []).forEach(module => {

            (module.lessons ?? []).forEach(lesson => {

                if (lesson.cover) {
                    refs.push({ kind: "cover", path: lesson.cover, source: lesson.id });
                }

            });

        });

    });

    return refs;

}

// Every place audio() can attach a `file` (see docs/CONTENT_AUTHORING.md's
// Audio section): directly on a block, on each example/dialogue item, or on
// a quiz feedback field once it's been upgraded from a plain string to
// { text, audio }.
function collectLessonAudioRefs(lesson) {

    const refs = [];

    (lesson.blocks ?? []).forEach((block, index) => {

        const blockSource = `${lesson.id}.blocks[${index}] (${block.type})`;

        if (block.audio?.file) {
            refs.push({ kind: "audio", path: block.audio.file, source: blockSource });
        }

        if (block.type === BLOCK_TYPES.EXAMPLE) {

            (block.examples ?? []).forEach(example => {
                if (example.audio?.file) {
                    refs.push({ kind: "audio", path: example.audio.file, source: blockSource });
                }
            });

        }

        if (block.type === BLOCK_TYPES.DIALOGUE) {

            (block.lines ?? []).forEach(line => {
                if (line.audio?.file) {
                    refs.push({ kind: "audio", path: line.audio.file, source: blockSource });
                }
            });

        }

        if (block.type === BLOCK_TYPES.QUIZ && block.feedback) {

            Object.entries(block.feedback).forEach(([key, value]) => {

                const audio = typeof value === "object" ? value?.audio : null;

                if (audio?.file) {
                    refs.push({ kind: "audio", path: audio.file, source: `${blockSource} feedback.${key}` });
                }

            });

        }

    });

    return refs;

}

function collectDictionaryAudioRefs(dictionaries) {

    const refs = [];

    Object.entries(dictionaries).forEach(([language, entries]) => {

        (entries ?? []).forEach(entry => {

            if (entry.audio?.file) {
                refs.push({ kind: "audio", path: entry.audio.file, source: `dictionary.${language}.${entry.id ?? entry.word}` });
            }

        });

    });

    return refs;

}

// Pure - no filesystem access, so it's the part that's actually unit
// tested (see checkAssets.test.js). checkAssets() itself is a thin wrapper
// that only adds the one impure step (existsSync), kept too small to be
// worth testing separately from a real run against public/.
export function collectAssetRefs({ courses, dictionaries } = {}) {

    const refs = [
        ...collectCoverRefs(courses ?? {}),
        ...collectDictionaryAudioRefs(dictionaries ?? {})
    ];

    Object.values(courses ?? {}).forEach(course => {

        (course.modules ?? []).forEach(module => {

            (module.lessons ?? []).forEach(lesson => {
                refs.push(...collectLessonAudioRefs(lesson));
            });

        });

    });

    return refs;

}

export function checkAssets({ courses, dictionaries } = {}) {

    return collectAssetRefs({ courses, dictionaries })
        .filter(ref => !existsSync(resolve(publicDir, ref.path.replace(/^\//, ""))))
        .map(ref => warning("asset", ref.source, MESSAGE_BY_KIND[ref.kind](ref.path)));

}
