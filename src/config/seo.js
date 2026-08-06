// Central SEO defaults - index.html carries the same values as static
// fallback (for the instant before JS runs, and for crawlers that don't
// execute it); useSeo.js/Seo.jsx overwrite them per route at runtime.
export const SITE_NAME = "Glossio";

export const SITE_URL = "https://www.glossio.pro";

export const DEFAULT_TITLE = "Glossio — Aprenda idiomas de verdade";

export const DEFAULT_DESCRIPTION =
    "Aprenda inglês, francês ou português com lições estruturadas por nível (CEFR), conteúdo autêntico com tradução instantânea, um acervo pessoal de vocabulário e revisão espaçada. Grátis para começar.";

// PNG, not the SVG favicon - social platforms (Facebook/Twitter/LinkedIn
// link previews) generally don't render SVG og:image at all. Reuses the
// existing PWA icon asset rather than shipping a new one.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icons/icon-512.png`;
