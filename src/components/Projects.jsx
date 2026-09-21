import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner.jsx'
import ErrorMessage from './ErrorMessage.jsx'

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [sortBy, setSortBy] = useState('updated')

  const fetchRepos = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://api.github.com/users/Harsh-jethva/repos?sort=updated&per_page=50')

      if (!response.ok) {
        throw new Error('Unable to fetch repositories from GitHub right now.')
      }

      const data = await response.json()
      setRepos(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Something went wrong while loading repositories.')
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  // Filter & Sort Logic
  const filteredAndSortedRepos = useMemo(() => {
    let result = [...repos]

    // 1. Search Query
    const query = search.trim().toLowerCase()
    if (query) {
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          (repo.description && repo.description.toLowerCase().includes(query)) ||
          (repo.language && repo.language.toLowerCase().includes(query))
      )
    }

    // 2. Tag Filter
    if (selectedTag !== 'All') {
      result = result.filter((repo) => {
        const lang = (repo.language || '').toLowerCase()
        const name = repo.name.toLowerCase()
        if (selectedTag === 'JavaScript') return lang === 'javascript' || name.includes('js')
        if (selectedTag === 'React') return name.includes('react') || name.includes('portfolio') || name.includes('pr')
        if (selectedTag === 'HTML/CSS') return lang === 'html' || lang === 'css'
        return true
      })
    }

    // 3. Sorting
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'stars') {
      result.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    } else if (sortBy === 'updated') {
      result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    }

    return result
  }, [repos, search, selectedTag, sortBy])

  // Format date helper
  const formatDate = (isoStr) => {
    if (!isoStr) return ''
    const d = new Date(isoStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="projects-page-container">
      {/* Page Header */}
      <div className="projects-header-section">
        <span className="projects-badge">PORTFOLIO WORK</span>
        <h1 className="projects-headline">Featured Projects & Repositories</h1>
        <p className="projects-description">
          A showcase of full-stack web applications, academic practicals, and open-source GitHub repositories.
        </p>
      </div>

      {/* Featured Core Project Spotlight Card */}
      <div className="featured-project-card">
        <div className="featured-badge-bar">
          <span className="badge-featured">⭐ FEATURED HIGHLIGHT</span>
          <span className="badge-tech-stack">Full-Stack AWD Practical 7 & 8</span>
        </div>
        <div className="featured-content">
          <div className="featured-details">
            <h2 className="featured-title">Task Management & Analytics System</h2>
            <p className="featured-summary">
              A full-stack productivity web app built with React 19, Vite 8, Node.js, Express, and MongoDB.
              Features route-based code splitting, lazy-loaded Chart.js visual analytics, JWT authentication, and
              protected route authorization.
            </p>
            <div className="featured-tags">
              <span className="tag-pill">React 19</span>
              <span className="tag-pill">Lazy Loading</span>
              <span className="tag-pill">Chart.js</span>
              <span className="tag-pill">Express.js</span>
              <span className="tag-pill">MongoDB</span>
              <span className="tag-pill">JWT Auth</span>
            </div>
          </div>
          <div className="featured-actions">
            <Link to="/tasks" className="btn-primary featured-btn">
              Launch App 🚀
            </Link>
            <a
              href="https://github.com/Harsh-jethva/student-potfolio"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary featured-github-btn"
            >
              GitHub Source 💻
            </a>
          </div>
        </div>
      </div>

      {/* Search, Filter & Sort Controls Bar */}
      <div className="projects-controls-card">
        <div className="controls-top-row">
          <div className="search-box-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="projects-search-input"
              type="text"
              placeholder="Search by repo name, description, or language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="btn-clear-search" onClick={() => setSearch('')}>
                ✕
              </button>
            )}
          </div>

          <div className="sort-box-wrapper">
            <label htmlFor="repo-sort" className="sort-label">Sort by:</label>
            <select
              id="repo-sort"
              className="projects-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="updated">Recently Updated</option>
              <option value="name">Name (A-Z)</option>
              <option value="stars">Most Stars</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-row">
          <div className="filter-pills-group">
            {['All', 'JavaScript', 'React', 'HTML/CSS'].map((tag) => (
              <button
                key={tag}
                className={`filter-pill ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <span className="repos-count-badge">
            {filteredAndSortedRepos.length} {filteredAndSortedRepos.length === 1 ? 'project' : 'projects'} found
          </span>
        </div>
      </div>

      {/* Repositories Grid / Loading / Error States */}
      {loading ? (
        <div className="projects-loading-wrapper">
          <Spinner />
          <p className="loading-subtext">Fetching latest public repositories from GitHub...</p>
        </div>
      ) : error ? (
        <div className="projects-error-wrapper">
          <ErrorMessage message={error} onRetry={fetchRepos} />
        </div>
      ) : filteredAndSortedRepos.length === 0 ? (
        <div className="projects-empty-card">
          <div className="empty-icon">📂</div>
          <h3>No repositories match your criteria</h3>
          <p>Try searching for a different keyword or reset the filter tags.</p>
          <button
            className="btn-primary empty-reset-btn"
            onClick={() => {
              setSearch('')
              setSelectedTag('All')
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="projects-modern-grid">
          {filteredAndSortedRepos.map((repo) => (
            <article key={repo.id} className="modern-project-card">
              <div className="card-top-header">
                <div className="repo-type-icon">📦</div>
                <span className="repo-visibility-badge">
                  {repo.private ? 'Private' : 'Public'}
                </span>
              </div>

              <div className="card-main-body">
                <h3 className="modern-project-title" title={repo.name}>
                  {repo.name}
                </h3>
                <p className="modern-project-desc">
                  {repo.description || 'Full-stack course practical & web project implementation.'}
                </p>
              </div>

              <div className="card-meta-tags">
                {repo.language && (
                  <span className="repo-language-badge">
                    <span className="lang-dot"></span>
                    {repo.language}
                  </span>
                )}
                <span className="repo-meta-stat">⭐ {repo.stargazers_count || 0}</span>
                <span className="repo-meta-stat">🍴 {repo.forks_count || 0}</span>
              </div>

              <div className="card-action-footer">
                <span className="card-updated-date">Updated: {formatDate(repo.updated_at)}</span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="modern-view-btn"
                >
                  View Repo ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
