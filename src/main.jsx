import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./styles/Theme.css";
import "./styles/globals.css";
import App from './App.jsx'
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary'
import { initErrorTracking } from './utils/errorTracking'

// Called before the first render (not from a component effect, unlike
// initAnalytics() - an error can happen before React ever gets to render
// anything) so the global error/unhandledrejection listeners and, in
// production with a DSN, Sentry are already in place from the very start.
initErrorTracking()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)