import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

import "./Navbar.css";

export function Navbar() {

  const { language } = useContext(LanguageContext);

  const location = useLocation();

  const navLinks = [
    { to: "/content", label: "Conteúdo" },
    { to: "/flashcards", label: "Flashcards" },
    { to: "/study", label: "Estudo" },
    { to: "/alphabets", label: "Alfabetos" },
    { to: "/my-flashcards", label: "My Flashcards"  }
  ];

  if (location.pathname === "/") return null;

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/home" className="navbar__logo">
          <span className="navbar__logo-icon">🌐</span>
          <span className="navbar__logo-name">Lingua</span>
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
