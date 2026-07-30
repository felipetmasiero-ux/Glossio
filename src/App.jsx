import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Home } from "./pages/Home/Home";
import { LanguageSelection } from "./pages/LanguageSelection/LanguageSelection";
import { Exercises } from "./pages/Exercises/Exercises";
import { ExploreHub } from "./pages/ExploreHub/ExploreHub";
import { ExploreVideoPage } from "./pages/ExploreVideoPage/ExploreVideoPage";
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
import { About } from './pages/About/About'
import { Roadmap } from './pages/Roadmap/Roadmap'

import { Navbar } from './components/common/Navbar/Navbar'
import { Footer } from './components/common/Footer/Footer'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LanguageContext } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthProvider'
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
    <AuthProvider>
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

                <main className="app-layout__main">
                <Routes>
                  <Route
                    path="/"
                    element={<Landing />}
                  />

                  <Route
                    path="/login"
                    element={<Login />}
                  />

                  <Route
                    path="/register"
                    element={<Register />}
                  />

                  <Route element={<ProtectedRoute />}>

                    <Route
                      path="/choose-language"
                      element={
                        <LanguageSelection
                          setLanguage={setLanguage}
                        />
                      }
                    />

                    <Route
                      path="/about"
                      element={<About />}
                    />

                    <Route
                      path="/roadmap"
                      element={<Roadmap />}
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
                      path="/explore"
                      element={<ExploreHub />}
                    />

                    <Route
                      path="/explore/:videoId"
                      element={<ExploreVideoPage />}
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

                  </Route>

                </Routes>
                </main>

                <Footer />

                </LastActivityProvider>
              </ExerciseProgressProvider>
              </LessonProgressProvider>
            </StudyHistoryProvider>
          </div>
        </FlashcardProvider>
      </LanguageContext.Provider>
    </EventProvider>
    </AuthProvider>
  )
}

export default App
