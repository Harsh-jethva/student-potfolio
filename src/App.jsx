import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Tasks from './components/Tasks.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { getCurrentUser } from './api.js'
import './App.css'

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App