import React, { useState, useEffect, lazy, Suspense, Profiler } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Skills from './components/Skills.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DelayedFallback from './components/DelayedFallback.jsx'
import { getCurrentUser } from './api.js'
import './App.css'

// ============================================================================
// Practical 8: Route-Based Code Splitting via React.lazy() and Dynamic import()
// ============================================================================
const Projects = lazy(() => import('./components/Projects.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Tasks = lazy(() => import('./components/Tasks.jsx'))
const Login = lazy(() => import('./components/Login.jsx'))
const Register = lazy(() => import('./components/Register.jsx'))

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h2>Welcome to My Portfolio</h2>
        <p>I am a B.Tech IT Student building full-stack web applications with React, Node.js, and Express.</p>
      </section>
      <Skills />
    </div>
  )
}

// React DevTools Profiler callback to document render behavior & unnecessary re-renders
function onRenderProfiler(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[Profiler] Component "${id}" [${phase}] - actualDuration: ${actualDuration.toFixed(2)}ms`);
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (u) setUser(u)
    })
  }, [])

  return (
    <BrowserRouter>
      <div className={`app-root ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} user={user} setUser={setUser} />
        <main className="main-content">
          {/* Suspense wrapper with 300ms delayed fallback to prevent fast-connection UI flicker */}
          <Suspense fallback={<DelayedFallback delay={300} message="Loading page bundle..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
              <Route path="/register" element={<Register onLoginSuccess={setUser} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Profiler id="Footer" onRender={onRenderProfiler}>
          <Footer />
        </Profiler>
      </div>
    </BrowserRouter>
  )
}

export default App