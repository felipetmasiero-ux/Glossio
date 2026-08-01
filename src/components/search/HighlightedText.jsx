import { highlightMatch } from "../../utils/search/highlightMatch";
import "./HighlightedText.css";

export function HighlightedText({ text, query }) {

    const segments = highlightMatch(text, query);

    return segments.map((segment, index) =>

        segment.highlighted
            ? <mark key={index} className="search-highlight">{segment.text}</mark>
            : <span key={index}>{segment.text}</span>

    );

}
