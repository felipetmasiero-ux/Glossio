import { Section } from "../common/Section/Section";
import "./SearchResultsSection.css";

// Empty categories simply don't render - the caller passes 0 results and
// this returns null entirely, so the page never shows an empty "Videos"
// heading with nothing under it.
export function SearchResultsSection({ title, count, children }) {

    if (count === 0) {
        return null;
    }

    return (
        <Section title={`${title} (${count})`}>
            <ul className="search-results-list">
                {children}
            </ul>
        </Section>
    );

}
