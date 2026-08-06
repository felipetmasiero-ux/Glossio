import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "../../config/seo";

export function buildWebsiteSchema() {
    return {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL
    };
}

export function buildEducationalOrgSchema() {
    return {
        "@type": "EducationalOrganization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_OG_IMAGE
    };
}

// Not linked from any indexable page yet (course/module pages sit behind
// login - see the SEO plan's sitemap note) - kept ready for the day a
// public course preview exists, since the data (module.title/description)
// already carries everything this needs.
export function buildCourseSchema(module) {
    return {
        "@type": "Course",
        name: module.title,
        description: module.description,
        provider: {
            "@type": "EducationalOrganization",
            name: SITE_NAME,
            url: SITE_URL
        }
    };
}

export function buildFaqSchema(faqs) {
    return {
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
            }
        }))
    };
}

export function buildBreadcrumbSchema(items) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };
}

// The one function every page actually passes to <Seo jsonLd={...}>. Always
// adds "@context" (each buildXSchema() above deliberately omits it, so
// they compose) and uses Google's recommended single @graph block instead
// of multiple <script> tags when a page legitimately carries more than one
// schema (e.g. WebSite + EducationalOrganization on the landing page).
export function combineSchemas(...schemas) {

    if (schemas.length === 1) {
        return { "@context": "https://schema.org", ...schemas[0] };
    }

    return { "@context": "https://schema.org", "@graph": schemas };

}
