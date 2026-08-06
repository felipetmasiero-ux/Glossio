// Generates public/sitemap.xml and public/robots.txt before `vite build`
// runs (see the "build" script in package.json) - Vite copies everything
// in public/ into dist/ as-is, so anything written here ends up served
// at the site root.
//
// Only the routes that are actually reachable without a session are
// listed. Every other route in src/App.jsx sits behind <ProtectedRoute>,
// which redirects an unauthenticated visitor - and therefore an
// unauthenticated crawler - straight to /login. Listing those in a
// sitemap would point search engines at login redirects, which search
// engines actively deprioritize sitemaps for.
//
// Languages/modules/lessons are public preview routes (see App.jsx) and
// are enumerated below from the real course data (src/data/courses),
// the same modules/lessons/getCourse pulled in by the app itself - so a
// language, module or lesson added to the data files is picked up here
// automatically, with no separate list to keep in sync.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { getCourse } from "../src/utils/courses/getCourses.js";

export const SITE_URL = "https://www.glossio.pro";

const LANGUAGES = ["english", "french", "portuguese"];

const STATIC_PUBLIC_ROUTES = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/login", changefreq: "yearly", priority: "0.3" },
    { path: "/register", changefreq: "yearly", priority: "0.3" },
    { path: "/placement-test", changefreq: "monthly", priority: "0.5" },
    { path: "/languages", changefreq: "monthly", priority: "0.8" }
];

function buildCourseRoutes() {

    const routes = [];

    for (const language of LANGUAGES) {

        const course = getCourse(language);

        if (!course) {
            continue;
        }

        routes.push({ path: `/lessons/language/${language}`, changefreq: "monthly", priority: "0.7" });

        for (const courseModule of course.modules) {

            routes.push({ path: `/lessons/module/${courseModule.id}`, changefreq: "monthly", priority: "0.6" });

            for (const lesson of courseModule.lessons) {
                routes.push({ path: `/lessons/${lesson.id}`, changefreq: "monthly", priority: "0.5" });
            }

        }

    }

    return routes;

}

export const PUBLIC_ROUTES = [...STATIC_PUBLIC_ROUTES, ...buildCourseRoutes()];

export function buildSitemap() {

    const urls = PUBLIC_ROUTES.map(({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

}

export function buildRobotsTxt() {

    // "/" needs the end-anchor ($, a Google/Bing extension) - "/" alone is
    // a *prefix* match, which would make "Allow: /" and the catch-all
    // "Disallow: /" below collide on literally every URL (both match
    // everything), leaving the outcome for the home page ambiguous between
    // crawlers. "/$" matches only the exact root, so it's unambiguously
    // more specific than "Disallow: /" and always wins for that one URL.
    // This is a second line of defense (ProtectedRoute is the real gate),
    // not the enforcement mechanism itself.
    const allowLines = PUBLIC_ROUTES
        .map(({ path }) => `Allow: ${path === "/" ? "/$" : path}`)
        .join("\n");

    return `User-agent: *
${allowLines}
Disallow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

}

function main() {

    const __dirname = dirname(fileURLToPath(import.meta.url));
    const publicDir = resolve(__dirname, "..", "public");

    writeFileSync(resolve(publicDir, "sitemap.xml"), buildSitemap());
    writeFileSync(resolve(publicDir, "robots.txt"), buildRobotsTxt());

    console.log("[seo] generated public/sitemap.xml and public/robots.txt");

}

// Only run when invoked directly (`node scripts/generateSeoFiles.js`), not
// when imported by generateSeoFiles.test.js.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}
