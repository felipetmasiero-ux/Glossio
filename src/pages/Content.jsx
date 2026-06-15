import "./EmptyState.css";
import { contentData } from "../data/contentData";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export function Content() {

  const { language } = useContext(LanguageContext);

  const filteredContent =
    contentData.filter(
      item => item.language === language
    )

  console.log(language);
  console.log(filteredContent);

  return (
    <div className="page-container">
      <div className="empty-state">
        <div className="empty-state__icon">📖</div>
        <h2 className="empty-state__title">Content Area</h2>
        {filteredContent.map(content => (
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
