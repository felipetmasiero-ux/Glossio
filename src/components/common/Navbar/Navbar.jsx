import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useAuth } from "../../../hooks/useAuth";
import { Icon } from "../Icon/Icon";
import { Avatar } from "../Avatar/Avatar";

import "./Navbar.css";

const HIDDEN_PATHS = ["/", "/choose-language", "/login", "/register"];

export function Navbar() {

  const { language } = useContext(LanguageContext);
  const { user, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/lessons", label: "Cursos" },
    { to: "/explore", label: "Explore" },
    { to: "/flashcards", label: "Flashcards" }
  ];

  if (HIDDEN_PATHS.includes(location.pathname)) return null;

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

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
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/search"
          className={`navbar__search${location.pathname === "/search" ? " navbar__search--active" : ""}`}
          aria-label="Buscar"
        >
          <Icon name="search" size={18} />
        </Link>

        {language && (
          <span className="navbar__badge">
            {language === "English" ? "🇺🇸" : language === "French" ? "🇫🇷" : "🇧🇷"} {language}
          </span>
        )}

        <Link to="/profile" className="navbar__avatar-link" aria-label="Perfil">
          <Avatar name={user?.name} avatarUrl={user?.avatarUrl} size={28} />
        </Link>

        <button type="button" className="navbar__logout" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
}