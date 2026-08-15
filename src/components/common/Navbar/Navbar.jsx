import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useAuth } from "../../../hooks/useAuth";
import { Icon } from "../Icon/Icon";
import { Avatar } from "../Avatar/Avatar";

import "./Navbar.css";

const HIDDEN_PATHS = ["/", "/choose-language", "/onboarding", "/login", "/register"];

// Unlike every other route that ever shows the Navbar, /placement-test is
// reachable while logged out (from the Landing page) - so it only earns the
// full authenticated chrome once there's actually a session to show.
const PUBLIC_PATHS_HIDDEN_WHEN_LOGGED_OUT = ["/placement-test"];

export function Navbar() {

  const { language, setLanguage } = useContext(LanguageContext);
  const { user, isAuthenticated, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/lessons", label: "Cursos" },
    { to: "/explore", label: "Explore" },
    { to: "/flashcards", label: "Flashcards" },
    { to: "/grammar", label: "Gramática" },
    { to: "/goals", label: "Metas" }
  ];

  if (HIDDEN_PATHS.includes(location.pathname)) return null;

  if (!isAuthenticated && PUBLIC_PATHS_HIDDEN_WHEN_LOGGED_OUT.includes(location.pathname)) return null;

  // Public preview mode (see App.jsx: /languages, /lessons/language/:x,
  // /lessons/module/:x, /lessons/:id) is reachable while logged out - a
  // visitor there gets a lightweight nav (logo + sign in/up) instead of the
  // authenticated links below, which all lead to screens they can't use yet.
  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <div className="navbar__inner">
          <Link to="/home" className="navbar__logo">
            <span className="navbar__logo-icon">
              <img src="/logo.png" alt="" className="navbar__logo-image" />
            </span>
            <span className="navbar__logo-name">Glossio</span>
          </Link>

          <div className="navbar__guest-actions">
            <Link to="/login" className="navbar__link">Entrar</Link>
            <Link to="/register" className="navbar__signup-cta">Criar conta grátis</Link>
          </div>
        </div>
      </nav>
    );
  }

  function handleLogout() {
    logout();
    // Reset the shared language state on logout, otherwise it survives in
    // localStorage and leaks into whichever account is registered or logs
    // in next on this same browser (see Register.jsx).
    setLanguage("");
    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/home" className="navbar__logo">
          <span className="navbar__logo-icon">
            <img src="/logo.png" alt="" className="navbar__logo-image" />
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