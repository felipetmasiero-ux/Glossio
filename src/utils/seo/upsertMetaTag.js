// Updates the existing <meta> tag in place when one already matches
// (index.html ships static name="description"/property="og:*" tags as a
// pre-JS fallback) instead of creating a duplicate - creates one only if
// none exists yet (e.g. name="robots", not present in the static shell).
export function upsertMetaTag(attribute, key, content) {

    if (content == null) return;

    const selector = `meta[${attribute}="${key}"]`;
    let tag = document.head.querySelector(selector);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);

}
