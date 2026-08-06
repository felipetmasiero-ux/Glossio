import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'

// Route-level code splitting: each page ships in its own chunk instead of
// one large bundle, loaded on demand as the user navigates to it.
const lazyPage = (loader, name) => lazy(() => loader().then(m => ({ default: m[name] })));

const Landing = lazyPage(() => import("./pages/Landing/Landing"), "Landing");
const Login = lazyPage(() => import("./pages/Login/Login"), "Login");
const Register = lazyPage(() => import("./pages/Register/Register"), "Register");
const Home = lazyPage(() => import("./pages/Home/Home"), "Home");
const LanguageSelection = lazyPage(() => import("./pages/LanguageSelection/LanguageSelection"), "LanguageSelection");
const Exercises = lazyPage(() => import("./pages/Exercises/Exercises"), "Exercises");
const ExploreHub = lazyPage(() => import("./pages/ExploreHub/ExploreHub"), "ExploreHub");
const ExploreVideoPage = lazyPage(() => import("./pages/ExploreVideoPage/ExploreVideoPage"), "ExploreVideoPage");
const ExerciseModuleLessonsPage = lazyPage(() => import("./pages/ExerciseModuleLessonsPage/ExerciseModuleLessonsPage"), "ExerciseModuleLessonsPage");
const ExerciseSessionPage = lazyPage(() => import("./pages/ExerciseSessionPage/ExerciseSessionPage"), "ExerciseSessionPage");
const MyFlashcards = lazyPage(() => import("./pages/MyFlashcards/MyFlashcards"), "MyFlashcards");
const StudyFlashcards = lazyPage(() => import("./pages/StudyFlashcards/StudyFlashcards"), "StudyFlashcards");
const ModulesPage = lazyPage(() => import("./pages/ModulesPage/ModulesPage"), "ModulesPage");
const ModuleLessonsPage = lazyPage(() => import("./pages/ModuleLessonsPage/ModuleLessonsPage"), "ModuleLessonsPage");
const ModuleCompletePage = lazyPage(() => import("./pages/ModuleCompletePage/ModuleCompletePage"), "ModuleCompletePage");
const LessonPage = lazyPage(() => import("./pages/LessonPage/LessonPage"), "LessonPage");
const Alphabets = lazyPage(() => import("./pages/Alphabets"), "Alphabets");
const Profile = lazyPage(() => import("./pages/Profile/Profile"), "Profile");
const About = lazyPage(() => import("./pages/About/About"), "About");
const Roadmap = lazyPage(() => import("./pages/Roadmap/Roadmap"), "Roadmap");
const Statistics = lazyPage(() => import("./pages/Statistics/Statistics"), "Statistics");
const Achievements = lazyPage(() => import("./pages/Achievements/Achievements"), "Achievements");
const Search = lazyPage(() => import("./pages/Search/Search"), "Search");
const Grammar = lazyPage(() => import("./pages/Grammar/Grammar"), "Grammar");
const PlacementTest = lazyPage(() => import("./pages/PlacementTest/PlacementTest"), "PlacementTest");
const Goals = lazyPage(() => import("./pages/Goals/Goals"), "Goals");
const LanguagesIndexPage = lazyPage(() => import("./pages/LanguagesIndexPage/LanguagesIndexPage"), "LanguagesIndexPage");

import { Navbar } from './components/common/Navbar/Navbar'
import { Footer } from './components/common/Footer/Footer'
import { PwaUpdatePrompt } from './components/common/PwaUpdatePrompt/PwaUpdatePrompt'
import { InstallPrompt } from './components/common/InstallPrompt/InstallPrompt'
import { AnalyticsRouteTracker } from './components/common/AnalyticsRouteTracker/AnalyticsRouteTracker'
import { AuthGateBanner } from './components/common/AuthGateBanner/AuthGateBanner'
import { Skeleton } from './components/common/Skeleton/Skeleton'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LanguageContext } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthProvider'
import { AuthGateProvider } from './contexts/AuthGateProvider'
import { EventProvider } from './contexts/EventProvider'
import { FlashcardProvider } from './contexts/FlashcardProvider'
import { DeckProvider } from './contexts/DeckProvider'
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
    <>
    <AnalyticsRouteTracker />
    <AuthProvider>
    <AuthGateProvider>
    <EventProvider>
      <LanguageContext.Provider
        value={{
          language,
          setLanguage,
        }}
      >
        <DeckProvider>
        <FlashcardProvider>
          <div className="app-layout">

            <StudyHistoryProvider>

              <LessonProgressProvider>
                <ExerciseProgressProvider>
                <LastActivityProvider>

                <Navbar />

                <main className="app-layout__main">
                <Suspense fallback={<Skeleton className="page-suspense-fallback" />}>
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

                  <Route
                    path="/placement-test"
                    element={<PlacementTest />}
                  />

                  {/* Public preview mode: reading a lesson/module requires
                  no session - language comes from the id/moduleId itself
                  (getLanguageFromId), not LanguageContext. Anything that
                  writes data (completing a lesson, adding a flashcard from
                  one) is still gated inline via useRequireAuth, not by
                  keeping the route itself behind ProtectedRoute. */}
                  <Route
                    path="/languages"
                    element={<LanguagesIndexPage />}
                  />

                  <Route
                    path="/lessons/language/:language"
                    element={<ModulesPage />}
                  />

                  <Route
                    path="/lessons/module/:moduleId"
                    element={<ModuleLessonsPage />}
                  />

                  <Route
                    path="/lessons/:id"
                    element={<LessonPage />}
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
                      path="/lessons/module/:moduleId/complete"
                      element={<ModuleCompletePage />}
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

                    <Route
                      path="/statistics"
                      element={<Statistics />}
                    />

                    <Route
                      path="/achievements"
                      element={<Achievements />}
                    />

                    <Route
                      path="/search"
                      element={<Search />}
                    />

                    <Route
                      path="/grammar"
                      element={<Grammar />}
                    />

                    <Route
                      path="/goals"
                      element={<Goals />}
                    />

                  </Route>

                </Routes>
                </Suspense>
                </main>

                <Footer />

                <PwaUpdatePrompt />

                <InstallPrompt />

                <AuthGateBanner />

                </LastActivityProvider>
              </ExerciseProgressProvider>
              </LessonProgressProvider>
            </StudyHistoryProvider>
          </div>
        </FlashcardProvider>
        </DeckProvider>
      </LanguageContext.Provider>
    </EventProvider>
    </AuthGateProvider>
    </AuthProvider>
    </>
  )
}

export default App
