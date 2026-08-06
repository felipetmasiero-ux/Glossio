// Shared between scripts/validateContent.js and scripts/contentReport.js so
// both print issues the exact same way.
function formatIssue(issue) {
    const marker = issue.severity === "error" ? "✖" : "⚠";
    return `  ${marker} [${issue.category}] ${issue.path}: ${issue.message}`;
}

export function printIssues(issues) {

    const errors = issues.filter(issue => issue.severity === "error");

    const warnings = issues.filter(issue => issue.severity === "warning");

    if (errors.length > 0) {
        console.log(`\n${errors.length} erro(s):\n`);
        errors.forEach(issue => console.log(formatIssue(issue)));
    }

    if (warnings.length > 0) {
        console.log(`\n${warnings.length} aviso(s):\n`);
        warnings.forEach(issue => console.log(formatIssue(issue)));
    }

    if (issues.length === 0) {
        console.log("\nNenhum problema encontrado. ✔");
    }

    return { errors, warnings };

}
