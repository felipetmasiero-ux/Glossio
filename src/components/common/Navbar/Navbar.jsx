import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Icon } from "../Icon/Icon";

import "./Navbar.css";

export function Navbar() {

  const { language } = useContext(LanguageContext);

  const location = useLocation();

  const navLinks = [
    { to: "/lessons", label: "Lições" },
    { to: "/flashcards", label: "Flashcards" },
    { to: "/exercises", label: "Exercícios" },
    { to: "/alphabets", label: "Alfabetos" },
    { to: "/my-flashcards", label: "Coleção" }
  ];

  if (location.pathname === "/") return null;

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/home" className="navbar__logo">
          <span className="navbar__logo-icon">
            <Icon name="book" size={16} />
          </span>
          <span className="navbar__logo-name">Glossio</span>
        </Link>

        <div className="navbar__links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link${location.pathname === link.to ? " navbar__link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {language && (
          <span className="navbar__badge">
            {language === "English" ? "🇺🇸" : language === "French" ? "🇫🇷" : "🇧🇷"} {language}
          </span>
        )}
      </div>
    </nav>
  );
}