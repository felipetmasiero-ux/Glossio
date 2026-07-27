import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Icon } from "../Icon/Icon";

import "./Navbar.css";

export function Navbar() {

  const { language } = useContext(LanguageContext);

  const location = useLocation();

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/lessons", label: "Cursos" },
    { to: "/explore", label: "Explore" },
    { to: "/flashcards", label: "Flashcards" },
    { to: "/profile", label: "Perfil" }
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