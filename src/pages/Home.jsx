import { Link } from "react-router-dom"
export function Home({ language }) {
  return (
    <>
      <h1>Welcome to the App</h1>
      <p>Your current language: {language}</p>

      <Link to="/content">Content</Link>
      <Link to="/flashcards">Flashcards</Link>
      <Link to="/study">Study</Link>
      <Link to="/alphabets">Alphabets</Link>
    </>
  )
}