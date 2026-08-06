import { SITE_NAME, DEFAULT_DESCRIPTION } from "./seo";

// Web app manifest, centralized here (not inline in vite.config.js) so it's
// independently testable and reuses the same name/description already
// defined for SEO - same precedent as src/config/seo.js itself.
export const pwaManifest = {

    name: SITE_NAME,

    short_name: SITE_NAME,

    description: DEFAULT_DESCRIPTION,

    // Stable identity across deploys, decoupled from start_url - without
    // this, changing start_url (e.g. adding a tracking query param) would
    // make browsers treat it as a different app and could prompt a
    // reinstall instead of just updating.
    id: "/",

    start_url: "/",

    display: "standalone",

    // The app is used both on phones (portrait) and desktop/tablet
    // (landscape) - locking orientation would fight the OS's own rotation
    // handling for no benefit here.
    orientation: "any",

    theme_color: "#2C3E63",

    background_color: "#EEF1F5",

    lang: "pt-BR",

    categories: ["education", "productivity"],

    icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]

    // No `screenshots` entry: Chrome's richer install UI can show them, but
    // they have to be real captures of the running app - faking placeholder
    // images here would be worse than omitting the field. See the PWA
    // documentation's "future improvements" for how to add them for real.

};
