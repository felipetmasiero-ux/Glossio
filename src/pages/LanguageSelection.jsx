import { useNavigate } from "react-router-dom";

export function LanguageSelection({ setLanguage }) {

  const navigate = useNavigate()

  function handleLanguage(language) {

    setLanguage(language)

    navigate("/home")
  }

  return (
    <>
      <h1>Choose your language</h1>

      <button onClick={() => handleLanguage("English")}>
        English
      </button>

      <button onClick={() => handleLanguage("French")}>
        Français
      </button>

      <button onClick={() => handleLanguage("Portuguese")}>
        Português
      </button>
    </>
  );
}
