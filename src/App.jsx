import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Home } from "./pages/Home/Home";
import { LanguageSelection } from "./pages/LanguageSelection/LanguageSelection";
import { Exercises } from "./pages/Exercises/Exercises";
import { ExerciseModuleLessonsPage } from "./pages/ExerciseModuleLessonsPage/ExerciseModuleLessonsPage";
import { ExerciseSessionPage } from "./pages/ExerciseSessionPage/ExerciseSessionPage";
import { MyFlashcards } from "./pages/MyFlashcards/MyFlashcards";
import { StudyFlashcards } from "./pages/StudyFlashcards/StudyFlashcards";
import { ModulesPage } from "./pages/ModulesPage/ModulesPage";
import { ModuleLessonsPage } from "./pages/ModuleLessonsPage/ModuleLessonsPage";
import { ModuleCompletePage } from "./pages/ModuleCompletePage/ModuleCompletePage";
import { LessonPage } from "./pages/LessonPage/LessonPage";
import { Alphabets } from './pages/Alphabets'
import { Profile } from './pages/Profile/Profile'

import { Navbar } from './components/common/Navbar/Navbar'
import { LanguageContext } from './contexts/LanguageContext'
import { EventProvider } from './contexts/EventProvider'
import { FlashcardProvider } from './contexts/FlashcardProvider'
import { StudyHistoryProvider } from './contexts/StudyHistoryProvider'
import { LessonProgressProvider } from './contexts/LessonProgressProvider'
import { ExerciseProgressProvider } from './contexts/ExerciseProgressProvider'
import { LastActivityProvider } from './contexts/LastActivityProvider'

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || ''
  )

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <EventProvider>
      <LanguageContext.Provider
        value={{
          language,
          setLanguage,
        }}
      >
        <FlashcardProvider>
          <div className="app-layout">

            <StudyHistoryProvider>

              <LessonProgressProvider>
                <ExerciseProgressProvider>
                <LastActivityProvider>

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
                    path="/lessons"
                    element={<ModulesPage />}
                  />

                  <Route
                    path="/lessons/module/:moduleId"
                    element={<ModuleLessonsPage />}
                  />

                  <Route
                    path="/lessons/module/:moduleId/complete"
                    element={<ModuleCompletePage />}
                  />

                  <Route
                    path="/lessons/:id"
                    element={<LessonPage />}
                  />

                  <Route
                    path="/exercises"
                    element={<Exercises />}
                  />

                  <Route
                    path="/exercises/module/:moduleId"
                    element={<ExerciseModuleLessonsPage />}
                  />

                  <Route
                    path="/exercises/:lessonId"
                    element={<ExerciseSessionPage />}
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
                    element={<MyFlashcards />}
                  />

                  <Route
                    path="/profile"
                    element={<Profile />}
                  />

                </Routes>
                </LastActivityProvider>
              </ExerciseProgressProvider>
              </LessonProgressProvider>
            </StudyHistoryProvider>
          </div>
        </FlashcardProvider>
      </LanguageContext.Provider>
    </EventProvider>
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
