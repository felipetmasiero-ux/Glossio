// The only genuinely Node-only content check (needs real filesystem
// access, so it can't live in src/utils/content/validation - everything
// there stays pure and portable). Confirms every `cover` path a course or
// lesson declares actually resolves to a file under public/ - the SEO/PWA
// sprints already established that pattern (public/ is copied verbatim
// into dist/, see scripts/generateSeoFiles.js's own comment).
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { warning } from "../../src/utils/content/validation/createIssue.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const publicDir = resolve(__dirname, "..", "..", "public");

function collectCoverRefs(courses) {

    const refs = [];

    Object.values(courses).forEach(course => {

        if (course.cover) {
            refs.push({ path: course.cover, source: course.id });
        }

        (course.modules ?? []).forEach(module => {

            (module.lessons ?? []).forEach(lesson => {

                if (lesson.cover) {
                    refs.push({ path: lesson.cover, source: lesson.id });
                }

            });

        });

    });

    return refs;

}

export function checkAssets(courses) {

    return collectCoverRefs(courses)
        .filter(ref => !existsSync(resolve(publicDir, ref.path.replace(/^\//, ""))))
        .map(ref => warning(
            "asset",
            ref.source,
            `Capa não encontrada: "${ref.path}" não existe em public/ - a imagem não vai carregar (ex: em LessonRecommendationCard).`
        ));

}
