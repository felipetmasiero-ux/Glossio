// npm run content-report
//
// Same data as validate-content, but framed as a snapshot: how much
// content exists (per language and in total) and how healthy it is,
// instead of a pass/fail gate. Never exits non-zero - this is a report,
// not a check (use `npm run validate-content` for that).
import { loadContentData } from "./content/loadContentData.js";
import { checkAssets } from "./content/checkAssets.js";
import { printIssues } from "./content/printIssues.js";
import { validateContent } from "../src/utils/content/validation/validateContent.js";
import { collectContentStats } from "../src/utils/content/report/collectContentStats.js";

function printStatsTable(label, stats) {

    console.log(`\n${label}`);
    console.log(`  Cursos:                 ${stats.courseCount}`);
    console.log(`  Módulos:                ${stats.moduleCount}`);
    console.log(`  Lições:                 ${stats.lessonCount}`);
    console.log(`  Blocos de conteúdo:     ${stats.blockCount}`);
    console.log(`  Objetivos:              ${stats.objectiveCount}`);
    console.log(`  Palavras (vocabulário): ${stats.vocabularyWordCount}`);
    console.log(`  Palavras (dicionário):  ${stats.dictionaryWordCount}`);
    console.log(`  Exercícios gerados:     ${stats.exerciseCount}`);
    console.log(`  Referências de áudio:   ${stats.audioReferenceCount}`);

}

function main() {

    const { courses, dictionaries } = loadContentData();

    console.log("=== Relatório de Conteúdo — Glossio ===");

    printStatsTable("Total", collectContentStats({ courses, dictionaries }));

    Object.keys(courses).forEach(language => {

        printStatsTable(
            `— ${language} —`,
            collectContentStats({
                courses: { [language]: courses[language] },
                dictionaries: { [language]: dictionaries[language] }
            })
        );

    });

    const issues = [
        ...validateContent({ courses, dictionaries }),
        ...checkAssets({ courses, dictionaries })
    ];

    console.log("\n=== Problemas encontrados ===");

    const { errors, warnings } = printIssues(issues);

    console.log(`\n[content-report] ${errors.length} erro(s), ${warnings.length} aviso(s).`);

    if (issues.length > 0) {
        console.log(`[content-report] Rode "npm run validate-content" para tratar cada um como um gate de build.`);
    }

}

main();
