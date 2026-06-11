import { Link } from "react-router-dom";

const features = [
  {
    to: "/content",
    icon: "📖",
    label: "Conteúdo",
    description: "Textos por nível com legendas inteligentes",
    accent: "var(--teal)",
    bg: "var(--teal-light)",
  },
  {
    to: "/flashcards",
    icon: "🃏",
    label: "Flashcards",
    description: "Revisão espaçada estilo Anki",
    accent: "var(--purple)",
    bg: "var(--purple-light)",
  },
  {
    to: "/study",
    icon: "✏️",
    label: "Estudo",
    description: "Exercícios interativos",
    accent: "#D85A30",
    bg: "#FAECE7",
  },
  {
    to: "/alphabets",
    icon: "🔤",
    label: "Alfabetos",
    description: "Aprenda scripts e sistemas de escrita",
    accent: "#BA7517",
    bg: "#FAEEDA",
  },
];

const flagMap = {
  English: "🇺🇸",
  French: "🇫🇷",
  Portuguese: "🇧🇷",
};

export function Home({ language }) {
  return (
    <div className="page-container">
      <div style={{ marginBottom: 40 }}>
        <p style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--teal)",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: 8,
        }}>
          {flagMap[language] || "🌐"} {language}
        </p>
        <h1>Bem-vindo de volta</h1>
        <p style={{ marginTop: 8, fontSize: 15 }}>
          O que você quer praticar hoje?
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 12,
      }}>
        {features.map(f => (
          <Link
            key={f.to}
            to={f.to}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = f.accent;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-sm)",
              background: f.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}>
              {f.icon}
            </div>
            <div>
              <p style={{
                fontWeight: 600,
                fontSize: 15,
                color: "var(--text)",
                margin: "0 0 3px",
              }}>{f.label}</p>
              <p style={{
                fontSize: 13,
                color: "var(--text-muted)",
                margin: 0,
                lineHeight: 1.4,
              }}>{f.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
