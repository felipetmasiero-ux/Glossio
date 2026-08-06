// npm run validate-content
//
// Dev-time content gate: walks every course/module/lesson/block and every
// language's dictionary (src/utils/content/validation/validateContent.js),
// plus the one filesystem-only check (checkAssets.js), and prints every
// issue found. Exits non-zero when there's at least one error, so it can
// be wired into CI later without any changes here.
import { loadContentData } from "./content/loadContentData.js";
import { checkAssets } from "./content/checkAssets.js";
import { printIssues } from "./content/printIssues.js";
import { validateContent } from "../src/utils/content/validation/validateContent.js";

function main() {

    const { courses, dictionaries } = loadContentData();

    const issues = [
        ...validateContent({ courses, dictionaries }),
        ...checkAssets(courses)
    ];

    console.log("[validate-content] Validando conteúdo do Glossio...");

    const { errors, warnings } = printIssues(issues);

    console.log(`\n[validate-content] ${errors.length} erro(s), ${warnings.length} aviso(s).`);

    if (errors.length > 0) {
        process.exitCode = 1;
    }

}

main();
