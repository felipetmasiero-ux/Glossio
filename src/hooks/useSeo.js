import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { SITE_NAME, SITE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from "../config/seo";
import { upsertMetaTag } from "../utils/seo/upsertMetaTag";
import { upsertLinkTag } from "../utils/seo/upsertLinkTag";
import { upsertJsonLd, removeJsonLd } from "../utils/seo/jsonLdScript";

// The one place every page's <Seo> goes through - never touches
// document.title/meta/link directly from a component. Runs once per route
// (or whenever a passed-in value actually changes), updating the static
// tags index.html ships as a pre-JS/no-JS fallback rather than duplicating
// them - see upsertMetaTag.js/upsertLinkTag.js.
export function useSeo({
    title,
    description = DEFAULT_DESCRIPTION,
    robots = "index, follow",
    image = DEFAULT_OG_IMAGE,
    type = "website",
    path,
    jsonLd
} = {}) {

    const location = useLocation();
    const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : null;

    useEffect(() => {

        const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
        const canonicalUrl = `${SITE_URL}${path ?? location.pathname}`;

        document.title = fullTitle;

        upsertMetaTag("name", "description", description);
        upsertMetaTag("name", "robots", robots);
        upsertLinkTag("canonical", canonicalUrl);

        upsertMetaTag("property", "og:title", fullTitle);
        upsertMetaTag("property", "og:description", description);
        upsertMetaTag("property", "og:type", type);
        upsertMetaTag("property", "og:image", image);
        upsertMetaTag("property", "og:url", canonicalUrl);

        upsertMetaTag("name", "twitter:card", "summary_large_image");
        upsertMetaTag("name", "twitter:title", fullTitle);
        upsertMetaTag("name", "twitter:description", description);

        if (jsonLd) {
            upsertJsonLd(jsonLd);
        } else {
            removeJsonLd();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description, robots, image, type, path, location.pathname, jsonLdKey]);

}
