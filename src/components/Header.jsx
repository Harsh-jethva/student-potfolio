import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getToken, removeToken } from '../api'

function Header({ darkMode, setDarkMode, user, setUser }) {
  const navigate = useNavigate()
  const token = getToken()

  const handleLogout = () => {
    removeToken()
    if (setUser) setUser(null)
    navigate('/login')
  }

  return (
    <header className="portfolio-header">
      <div className="header-brand">
        <span className="brand-label">PORTFOLIO</span>
        <h1 className="brand-name">Harsh Jethva</h1>
      </div>
      <nav className="header-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Projects
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Tasks
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Contact
        </NavLink>
      </nav>
      <div className="header-controls">
        <button
          className="btn-toggle-theme"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light mode' : 'Dark mode'}
        </button>

        {token && (
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header