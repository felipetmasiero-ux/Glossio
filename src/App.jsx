import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { LanguageSelection } from './pages/LanguageSelection'
import { Content } from './pages/Content'
import { Exercises } from './pages/Exercises'
import { ContentReader } from './pages/ContentReader'
import { StudyFlashcards } from './pages/StudyFlashcards'
import { Alphabets } from './pages/Alphabets'
import { Home } from './pages/Home'
import { FlashcardsDashboard } from "./pages/FlashcardsDashboard";

import { Navbar } from './components/common/Navbar/Navbar'
import { LanguageContext } from './contexts/LanguageContext'
import { FlashcardProvider } from './contexts/FlashcardProvider'
import { StudyHistoryProvider } from './contexts/StudyHistoryProvider'

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || ''
  )

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      <FlashcardProvider>
        <div className="app-layout">

          <StudyHistoryProvider>

            <Navbar />

            <Routes>
              <Route
                path="/"
                element={
                  <LanguageSelection
                    setLanguage={setLanguage}
                  />
                }
              />

              <Route
                path="/home"
                element={<Home />}
              />

              <Route
                path="/content"
                element={<Content />}
              />

              <Route
                path="/content/:id"
                element={<ContentReader />}
              />

              <Route
                path="/exercises"
                element={<Exercises />}
              />

              <Route
                path="/flashcards"
                element={<StudyFlashcards />}
              />

              <Route
                path="/alphabets"
                element={<Alphabets />}
              />

              <Route
                path="/my-flashcards"
                element={<FlashcardsDashboard />}
              />
            </Routes>
          </StudyHistoryProvider>
        </div>
    </FlashcardProvider>
    </LanguageContext.Provider >
  )
}

export default App

/*
ORGANIZANDO O SITE:
Features:
- Flashcard revisionais tipo anki
- Conteúdo separado por nível de proeficência utlizando legendas com IA que  mostra a traducao/significado das palavras quando clicado
- Exercicios tipo duolingo
- Mecanismo para ensinar o alfabeto de linguagens diferentes, minha ideia inicial é um pouco dessa

PASSO A PASSO:
1- Tela de Login (V2)
2- Escolha de qual língua (Inicialmente: português, inglês e francês)
3- Tela principal que permite o acesso as diferentes features (cada uma com sua "página própria")
  |                     |                 |                         |
  |                     |                 |                         |
Área dos flashcards   Exercícios     Conteúdo por proeficiência    Mecanismo de aprendizagem de alfabetos
                                              |
                                              |
                                        Teste/escolha do nível do usuário
                                              |
                                              |
                                        Conteúdo nivelado com legenda inteligente

ESBOÇO DO BACKEND:
- Guarda os dados usuário na criação da conta e depois no login confere se os dados batem
- Flashcards: coleção de cards com dados pré-estabelcidos no MongoDB, exibí-los em um método de revisão espaçada
- Exercícios: ???
- Conteúdo por proeficência: cada língua têm um conteúdo próprio por nível de experiência, que é entregue ao usuário após seu "teste"
- Mecanismo de alfabetos: ???

Frontend (React)
      │
      ▼
Backend API (Express)
      │
      ▼
    MongoDB
*/
