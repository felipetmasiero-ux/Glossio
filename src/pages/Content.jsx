import "./EmptyState.css";
import { contentData } from "../data/contentData";
import { Link } from "react-router-dom";

export function Content() {
  return (
    <div className="page-container">
      <div className="empty-state">
        <div className="empty-state__icon">📖</div>
        <h2 className="empty-state__title">Content Area</h2>
        {contentData.map(content => (
          <div key={content.id}>
            <h3>{content.title}</h3>

            <p>
              {content.language} - {content.level}
            </p>

            <Link to={`/content/${content.id}`}>
              Open
            </Link>

          </div>
         ))}
      </div>
    </div>
  );
}
