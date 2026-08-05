const JSON_LD_ID = "seo-json-ld";

// One JSON-LD block per page, identified by a fixed id - upsertJsonLd
// replaces whatever the previous route left behind; removeJsonLd clears it
// for routes that don't have structured data of their own (otherwise a
// schema from the page you just left would linger on the next one).
export function upsertJsonLd(data) {

    if (!data) {
        removeJsonLd();
        return;
    }

    let script = document.getElementById(JSON_LD_ID);

    if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = JSON_LD_ID;
        document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

}

export function removeJsonLd() {
    document.getElementById(JSON_LD_ID)?.remove();
}
