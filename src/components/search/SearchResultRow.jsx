import { Icon } from "../common/Icon/Icon";
import { HighlightedText } from "./HighlightedText";
import "./SearchResultRow.css";

export function SearchResultRow({ icon, title, query, meta, onClick }) {

    return (

        <li className="search-result-row">

            <button type="button" className="search-result-row__button" onClick={onClick}>

                <span className="search-result-row__icon">
                    <Icon name={icon} size={18} />
                </span>

                <span className="search-result-row__body">

                    <span className="search-result-row__title">
                        <HighlightedText text={title} query={query} />
                    </span>

                    {meta && <span className="search-result-row__meta text-small">{meta}</span>}

                </span>

                <Icon name="chevron-right" size={16} className="search-result-row__chevron" />

            </button>

        </li>

    );

}
