import { useNavigate } from "react-router-dom";
import { LanguageCard } from "../components/LanguageCard";

export function LanguageSelection({ setLanguage }) {
  const navigate = useNavigate();

  function handleLanguage(language) {
    setLanguage(language);
    navigate("/home");
  }

  const languages = [
    { key: "English", nativeName: "English", flag: "🇺🇸" },
    { key: "French", nativeName: "Français", flag: "🇫🇷" },
    { key: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  ];

  return (
    <div style={{
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: "var(--teal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          margin: "0 auto 16px",
        }}>🌐</div>
        <h1 style={{ marginBottom: 8 }}>Escolha seu idioma</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
          Selecione o idioma que você quer aprender
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        width: "100%",
        maxWidth: 420,
      }}>
        {languages.map(lang => (
          <LanguageCard
            key={lang.key}
            language={lang.key}
            flag={lang.flag}
            nativeName={lang.nativeName}
            onClick={() => handleLanguage(lang.key)}
          />
        ))}
      </div>
    </div>
  );
}
