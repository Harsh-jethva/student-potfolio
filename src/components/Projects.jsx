import { useEffect, useMemo, useState } from 'react'
import Spinner from './Spinner.jsx'
import ErrorMessage from './ErrorMessage.jsx'

function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchRepos = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://api.github.com/users/Harsh-jethva/repos')

      if (!response.ok) {
        throw new Error('Unable to fetch repositories right now.')
      }

      const data = await response.json()
      setRepos(data)
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

  const filteredRepos = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return repos
    }

    return repos.filter((repo) => repo.name.toLowerCase().includes(query))
  }, [repos, search])

  return (
    <section className="section-copy">
      <p className="eyebrow">Projects</p>
      <h2>Recent Work</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search repositories by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchRepos} />
      ) : (
        <div className="projects-grid">
          {filteredRepos.map((repo) => (
            <article key={repo.id} className="project-card">
              <h3>{repo.name}</h3>
              <p>{repo.description || 'No description provided.'}</p>
              <div className="project-meta">
                <span>⭐ {repo.stargazers_count}</span>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  View repo
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects
