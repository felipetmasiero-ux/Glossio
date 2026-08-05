// Same in-place-update-or-create rule as upsertMetaTag.js, for <link>
// elements (canonical is the only one that changes per route today).
export function upsertLinkTag(rel, href) {

    if (!href) return;

    const selector = `link[rel="${rel}"]`;
    let tag = document.head.querySelector(selector);

    if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
    }

    tag.setAttribute("href", href);

}
