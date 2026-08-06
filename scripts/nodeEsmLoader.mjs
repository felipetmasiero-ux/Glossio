// Node's ESM resolver (unlike Vite's) requires explicit file extensions on
// relative imports. src/data/**/*.js relies on Vite's extensionless-import
// resolution throughout (e.g. `import { greetingsLesson } from "./greetings"`)
// - that's fine for the app bundle, but generateSeoFiles.js needs to import
// that same data directly under plain `node`, to build the sitemap from the
// real course/module/lesson list instead of a hand-maintained duplicate.
// This hook retries a failed extensionless relative import with `.js`
// appended, which is all that data tree needs.
export async function resolve(specifier, context, nextResolve) {

    if (specifier.startsWith(".") && !/\.[a-zA-Z0-9]+$/.test(specifier)) {

        try {
            return await nextResolve(`${specifier}.js`, context);
        } catch {
            // Not a plain "missing extension" case - could be a directory
            // import (e.g. `./builders` meaning `./builders/index.js`).
        }

        try {
            return await nextResolve(`${specifier}/index.js`, context);
        } catch {
            // Neither guess resolved - fall through to the default
            // resolution below, which throws the real error.
        }

    }

    return nextResolve(specifier, context);

}
